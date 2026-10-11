import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  PortfolioData,
  ProfileData,
  AboutSectionData,
  ContactSectionData,
  MetricItem,
  SkillItem,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  ServiceItem,
  ArticleItem,
  BookItem,
  GalleryItem,
  ContactMessage
} from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';
import {
  insertMessageToSupabase,
  fetchDataFromSupabase,
  syncDataToSupabase,
  fetchMessagesFromSupabase,
  isSupabaseConfigured
} from '../utils/supabaseClient';

const STORAGE_KEY = 'din_portfolio_data_v2';
const THEME_KEY = 'din_portfolio_theme_v1';
const AUTH_SESSION_KEY = 'din_portfolio_admin_auth_v1';

// Safe storage wrapper that never throws SecurityError in restricted iframes
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      // Ignored for iframe sandbox
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      // Ignored for iframe sandbox
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      // Ignored for iframe sandbox
    }
  }
};

interface PortfolioContextType {
  data: PortfolioData;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isCvModalOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
  isAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  
  // Updates
  updateProfile: (profile: ProfileData) => void;
  updateAbout: (about: Partial<AboutSectionData>) => Promise<{ success: boolean; message: string }>;
  updateContact: (contact: Partial<ContactSectionData>) => Promise<{ success: boolean; message: string }>;
  updateMetrics: (metrics: MetricItem[]) => void;
  
  // Skills
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  
  // Projects
  addProject: (project: Omit<ProjectItem, 'id'>) => Promise<{ success: boolean; message: string }>;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<{ success: boolean; message: string }>;
  deleteProject: (id: string) => Promise<{ success: boolean; message: string }>;
  
  // Experience
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  
  // Education
  addEducation: (edu: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  
  // Services
  addService: (srv: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, srv: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  
  // Books
  addBook: (book: Omit<BookItem, 'id'>) => void;
  updateBook: (id: string, book: Partial<BookItem>) => void;
  deleteBook: (id: string) => void;

  // Articles & Vlogs
  addArticle: (art: Omit<ArticleItem, 'id'>) => void;
  updateArticle: (id: string, art: Partial<ArticleItem>) => void;
  deleteArticle: (id: string) => void;

  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Messages
  sendMessage: (msg: { name: string; email: string; subject: string; message: string }) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  
  // Admin & System
  adminPassword: string;
  updateAdminPassword: (newPassword: string) => void;
  updateAdminPin: (newPin: string) => void;
  resetToDefault: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => { success: boolean; error?: string };

  // Supabase Cloud Sync Telemetry
  cloudSyncStatus: 'idle' | 'syncing' | 'synced' | 'error' | 'not_configured';
  cloudSyncError: string | null;
  lastCloudSyncTime: string | null;
  syncNow: (overrideData?: PortfolioData) => Promise<{ success: boolean; message: string }>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure structure compatibility and guarantee arrays exist
        const mergedProfile = { ...INITIAL_PORTFOLIO_DATA.profile, ...(parsed?.profile || {}) };
        if (mergedProfile.email === 'dinmohammadalamin123@gmail.com') {
          mergedProfile.email = 'dmaa357@gmail.com';
        }

        return {
          ...INITIAL_PORTFOLIO_DATA,
          ...parsed,
          profile: mergedProfile,
          about: parsed?.about ? { ...INITIAL_PORTFOLIO_DATA.about, ...parsed.about } : INITIAL_PORTFOLIO_DATA.about,
          contact: parsed?.contact ? { ...INITIAL_PORTFOLIO_DATA.contact, ...parsed.contact } : INITIAL_PORTFOLIO_DATA.contact,
          metrics: Array.isArray(parsed?.metrics) ? parsed.metrics : INITIAL_PORTFOLIO_DATA.metrics,
          skills: Array.isArray(parsed?.skills) ? parsed.skills : INITIAL_PORTFOLIO_DATA.skills,
          services: Array.isArray(parsed?.services) ? parsed.services : INITIAL_PORTFOLIO_DATA.services,
          projects: Array.isArray(parsed?.projects) ? parsed.projects : INITIAL_PORTFOLIO_DATA.projects,
          experience: Array.isArray(parsed?.experience) ? parsed.experience : INITIAL_PORTFOLIO_DATA.experience,
          education: Array.isArray(parsed?.education) ? parsed.education : INITIAL_PORTFOLIO_DATA.education,
          books: Array.isArray(parsed?.books) ? parsed.books : INITIAL_PORTFOLIO_DATA.books,
          articles: Array.isArray(parsed?.articles)
            ? parsed.articles.filter((a: any) => !a.isBook)
            : INITIAL_PORTFOLIO_DATA.articles,
          gallery: Array.isArray(parsed?.gallery) ? parsed.gallery : INITIAL_PORTFOLIO_DATA.gallery,
          messages: Array.isArray(parsed?.messages) ? parsed.messages : [],
          adminPin: parsed?.adminPassword || parsed?.adminPin || INITIAL_PORTFOLIO_DATA.adminPin || '1234',
          adminPassword: parsed?.adminPassword || parsed?.adminPin || INITIAL_PORTFOLIO_DATA.adminPassword || '1234',
        };
      }
    } catch (e) {
      console.error('Failed to parse portfolio data from storage', e);
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  // Reference always containing the latest data to avoid stale closures in async handlers
  const dataRef = useRef<PortfolioData>(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = safeStorage.getItem(THEME_KEY) as 'dark' | 'light' | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // ignore
    }
    return 'dark';
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return safeStorage.getItem(AUTH_SESSION_KEY) === 'true';
  });

  // Supabase Cloud Sync Telemetry State
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error' | 'not_configured'>(() => {
    return isSupabaseConfigured() ? 'idle' : 'not_configured';
  });
  const [cloudSyncError, setCloudSyncError] = useState<string | null>(null);
  const [lastCloudSyncTime, setLastCloudSyncTime] = useState<string | null>(null);

  const syncNow = async (overrideData?: PortfolioData): Promise<{ success: boolean; message: string }> => {
    const dataToSync = overrideData || dataRef.current;
    if (!isSupabaseConfigured()) {
      setCloudSyncStatus('not_configured');
      const msg = 'Supabase is not configured yet in this browser. Please configure credentials in Supabase tab.';
      setCloudSyncError(msg);
      return { success: false, message: msg };
    }
    setCloudSyncStatus('syncing');
    setCloudSyncError(null);
    try {
      const res = await syncDataToSupabase(dataToSync);
      if (res.success) {
        setCloudSyncStatus('synced');
        setLastCloudSyncTime(new Date().toLocaleTimeString());
        setCloudSyncError(null);
      } else {
        setCloudSyncStatus('error');
        setCloudSyncError(res.message);
      }
      return res;
    } catch (e: any) {
      const msg = e?.message || 'Sync failed';
      setCloudSyncStatus('error');
      setCloudSyncError(msg);
      return { success: false, message: msg };
    }
  };

  const openCvModal = () => setIsCvModalOpen(true);
  const closeCvModal = () => setIsCvModalOpen(false);

  // Check URL hash or hotkey for secret admin opening or CV modal
  useEffect(() => {
    const checkAdminHash = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.toLowerCase();
        const search = window.location.search.toLowerCase();
        if (hash === '#admin' || search.includes('admin=true')) {
          setIsAdminOpen(true);
        }
        if (hash === '#cv' || search.includes('cv=true')) {
          setIsCvModalOpen(true);
        }
      }
    };

    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);

    // Secret shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize theme
  useEffect(() => {
    const savedTheme = safeStorage.getItem(THEME_KEY) as 'dark' | 'light' | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    safeStorage.setItem(THEME_KEY, theme);
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      if (body) {
        body.classList.add('dark');
        body.classList.remove('light');
      }
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      if (body) {
        body.classList.remove('dark');
        body.classList.add('light');
      }
    }
  }, [theme]);

  // Persist data whenever it changes locally
  useEffect(() => {
    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to storage', e);
    }
  }, [data]);

  // Load initial data from Supabase if configured so site is dynamically updated globally for all visitors
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let isMounted = true;
    fetchDataFromSupabase()
      .then(res => {
        if (isMounted && res.success && res.data) {
          setData(prev => {
            const cloud = res.data!;
            return {
              ...prev,
              ...cloud,
              profile: { ...prev.profile, ...(cloud.profile || {}) },
              about: cloud.about ? { ...(prev.about || INITIAL_PORTFOLIO_DATA.about), ...cloud.about } : (prev.about || INITIAL_PORTFOLIO_DATA.about),
              contact: cloud.contact ? { ...(prev.contact || INITIAL_PORTFOLIO_DATA.contact), ...cloud.contact } : (prev.contact || INITIAL_PORTFOLIO_DATA.contact),
              metrics: Array.isArray(cloud.metrics) ? cloud.metrics : prev.metrics,
              skills: Array.isArray(cloud.skills) ? cloud.skills : prev.skills,
              projects: Array.isArray(cloud.projects) && cloud.projects.length > 0 ? cloud.projects : (prev.projects && prev.projects.length > 0 ? prev.projects : INITIAL_PORTFOLIO_DATA.projects),
              experience: Array.isArray(cloud.experience) ? cloud.experience : prev.experience,
              education: Array.isArray(cloud.education) ? cloud.education : prev.education,
              articles: Array.isArray(cloud.articles) ? cloud.articles : prev.articles,
              books: Array.isArray(cloud.books) ? cloud.books : prev.books,
              gallery: Array.isArray(cloud.gallery) ? cloud.gallery : prev.gallery,
            };
          });
        }
      })
      .catch(err => {
        console.warn('Could not load data from Supabase:', err);
      });

    // Also fetch any incoming contact messages from Supabase
    fetchMessagesFromSupabase()
      .then(cloudMsgs => {
        if (isMounted && cloudMsgs && cloudMsgs.length > 0) {
          setData(prev => {
            const existingIds = new Set(prev.messages.map(m => m.id));
            const newMsgs = cloudMsgs.filter(m => !existingIds.has(m.id));
            if (newMsgs.length > 0) {
              return {
                ...prev,
                messages: [...newMsgs, ...prev.messages]
              };
            }
            return prev;
          });
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // When admin makes changes, automatically sync to Supabase in background
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setCloudSyncStatus('not_configured');
      return;
    }

    if (isAuthenticated) {
      setCloudSyncStatus('syncing');
      const timer = setTimeout(() => {
        syncDataToSupabase(dataRef.current)
          .then(res => {
            if (res.success) {
              setCloudSyncStatus('synced');
              setLastCloudSyncTime(new Date().toLocaleTimeString());
              setCloudSyncError(null);
            } else {
              setCloudSyncStatus('error');
              setCloudSyncError(res.message);
            }
          })
          .catch(err => {
            setCloudSyncStatus('error');
            setCloudSyncError(err?.message || 'Sync failed');
          });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data, isAuthenticated]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loginAdmin = (passwordInput: string): boolean => {
    const activePassword = (data.adminPassword || data.adminPin || '1234').trim();
    if (passwordInput.trim() === activePassword) {
      setIsAuthenticated(true);
      safeStorage.setItem(AUTH_SESSION_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    safeStorage.removeItem(AUTH_SESSION_KEY);
    setIsAdminOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {
        // Ignored
      }
    }
  };

  // Helper to persist locally and sync to Supabase immediately
  const persistAndSync = async (nextData: PortfolioData): Promise<{ success: boolean; message: string }> => {
    dataRef.current = nextData;
    setData(nextData);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
    if (isSupabaseConfigured()) {
      return await syncNow(nextData);
    }
    return { success: true, message: 'Saved locally' };
  };

  const updateProfile = (profile: ProfileData) => {
    const nextData = { ...dataRef.current, profile };
    persistAndSync(nextData);
  };

  const updateAbout = async (aboutUpdate: Partial<AboutSectionData>): Promise<{ success: boolean; message: string }> => {
    const currentAbout = dataRef.current.about || INITIAL_PORTFOLIO_DATA.about!;
    const nextData: PortfolioData = {
      ...dataRef.current,
      about: {
        ...currentAbout,
        ...aboutUpdate
      }
    };
    return await persistAndSync(nextData);
  };

  const updateContact = async (contactUpdate: Partial<ContactSectionData>): Promise<{ success: boolean; message: string }> => {
    const currentContact = dataRef.current.contact || INITIAL_PORTFOLIO_DATA.contact!;
    const nextContact: ContactSectionData = {
      ...currentContact,
      ...contactUpdate
    };

    // Keep profile fields synchronized with contact changes
    const updatedProfile = {
      ...dataRef.current.profile,
      ...(contactUpdate.phone ? { phone: contactUpdate.phone } : {}),
      ...(contactUpdate.email ? { email: contactUpdate.email } : {}),
      ...(contactUpdate.location ? { city: contactUpdate.location } : {}),
      ...(contactUpdate.website ? { website: contactUpdate.website } : {}),
      ...(contactUpdate.availabilityNote ? { freelanceStatus: contactUpdate.availabilityNote } : {}),
    };

    const nextData: PortfolioData = {
      ...dataRef.current,
      profile: updatedProfile,
      contact: nextContact
    };
    return await persistAndSync(nextData);
  };

  const updateMetrics = (metrics: MetricItem[]) => {
    const nextData = { ...dataRef.current, metrics };
    persistAndSync(nextData);
  };

  // Skills
  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = { ...skill, id: `sk-${Date.now()}` };
    const nextData = { ...dataRef.current, skills: [...dataRef.current.skills, newSkill] };
    return persistAndSync(nextData);
  };

  const updateSkill = (id: string, updated: Partial<SkillItem>) => {
    const targetId = String(id).trim();
    const nextData = {
      ...dataRef.current,
      skills: dataRef.current.skills.map(s => (String(s.id).trim() === targetId ? { ...s, ...updated } : s))
    };
    return persistAndSync(nextData);
  };

  const deleteSkill = (id: string) => {
    const targetId = String(id).trim();
    const nextData = {
      ...dataRef.current,
      skills: dataRef.current.skills.filter(s => String(s.id).trim() !== targetId)
    };
    return persistAndSync(nextData);
  };

  // Projects
  const addProject = async (proj: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = { ...proj, id: `proj-${Date.now()}` };
    const nextData = { ...dataRef.current, projects: [newProj, ...dataRef.current.projects] };
    return await persistAndSync(nextData);
  };

  const updateProject = async (id: string, updated: Partial<ProjectItem>) => {
    const targetId = String(id).trim();
    const nextData = {
      ...dataRef.current,
      projects: dataRef.current.projects.map(p => (String(p.id).trim() === targetId ? { ...p, ...updated } : p))
    };
    return await persistAndSync(nextData);
  };

  const deleteProject = async (id: string) => {
    const targetId = String(id).trim();
    const nextData = {
      ...dataRef.current,
      projects: dataRef.current.projects.filter(p => String(p.id).trim() !== targetId)
    };
    return await persistAndSync(nextData);
  };

  // Experience
  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = { ...exp, id: `exp-${Date.now()}` };
    const nextData = { ...data, experience: [newExp, ...data.experience] };
    return persistAndSync(nextData);
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    const nextData = {
      ...data,
      experience: data.experience.map(e => (e.id === id ? { ...e, ...updated } : e))
    };
    return persistAndSync(nextData);
  };

  const deleteExperience = (id: string) => {
    const nextData = {
      ...data,
      experience: data.experience.filter(e => e.id !== id)
    };
    return persistAndSync(nextData);
  };

  // Education
  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = { ...edu, id: `edu-${Date.now()}` };
    const nextData = { ...data, education: [...data.education, newEdu] };
    return persistAndSync(nextData);
  };

  const updateEducation = (id: string, updated: Partial<EducationItem>) => {
    const nextData = {
      ...data,
      education: data.education.map(e => (e.id === id ? { ...e, ...updated } : e))
    };
    return persistAndSync(nextData);
  };

  const deleteEducation = (id: string) => {
    const nextData = {
      ...data,
      education: data.education.filter(e => e.id !== id)
    };
    return persistAndSync(nextData);
  };

  // Services
  const addService = (srv: Omit<ServiceItem, 'id'>) => {
    const newSrv: ServiceItem = { ...srv, id: `srv-${Date.now()}` };
    const nextData = { ...data, services: [...data.services, newSrv] };
    return persistAndSync(nextData);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    const nextData = {
      ...data,
      services: data.services.map(s => (s.id === id ? { ...s, ...updated } : s))
    };
    return persistAndSync(nextData);
  };

  const deleteService = (id: string) => {
    const nextData = {
      ...data,
      services: data.services.filter(s => s.id !== id)
    };
    return persistAndSync(nextData);
  };

  // Articles
  const addArticle = (art: Omit<ArticleItem, 'id'>) => {
    const newArt: ArticleItem = { ...art, id: `art-${Date.now()}` };
    const nextData = { ...data, articles: [newArt, ...data.articles] };
    return persistAndSync(nextData);
  };

  const updateArticle = (id: string, updated: Partial<ArticleItem>) => {
    const nextData = {
      ...data,
      articles: data.articles.map(a => (a.id === id ? { ...a, ...updated } : a))
    };
    return persistAndSync(nextData);
  };

  const deleteArticle = (id: string) => {
    const nextData = {
      ...data,
      articles: data.articles.filter(a => a.id !== id)
    };
    return persistAndSync(nextData);
  };

  // Books
  const addBook = (book: Omit<BookItem, 'id'>) => {
    const newBook: BookItem = {
      ...book,
      id: `book-${Date.now()}`
    };
    const nextData = { ...data, books: [newBook, ...(data.books || [])] };
    return persistAndSync(nextData);
  };

  const updateBook = (id: string, updated: Partial<BookItem>) => {
    const nextData = {
      ...data,
      books: (data.books || []).map(b => (b.id === id ? { ...b, ...updated } : b))
    };
    return persistAndSync(nextData);
  };

  const deleteBook = (id: string) => {
    const nextData = {
      ...data,
      books: (data.books || []).filter(b => b.id !== id)
    };
    return persistAndSync(nextData);
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    const nextData = { ...data, gallery: [newItem, ...(data.gallery || [])] };
    return persistAndSync(nextData);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    const nextData = {
      ...data,
      gallery: (data.gallery || []).map(g => (g.id === id ? { ...g, ...updated } : g))
    };
    return persistAndSync(nextData);
  };

  const deleteGalleryItem = (id: string) => {
    const nextData = {
      ...data,
      gallery: (data.gallery || []).filter(g => g.id !== id)
    };
    return persistAndSync(nextData);
  };

  // Messages
  const sendMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0] + ' ' + now.toTimeString().slice(0, 5);
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      createdAt: dateStr,
      read: false
    };
    setData(prev => ({ ...prev, messages: [newMsg, ...prev.messages] }));
    // Asynchronously insert into Supabase if configured
    insertMessageToSupabase(newMsg).catch(() => {});
  };

  const markMessageRead = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => (m.id === id ? { ...m, read: true } : m))
    }));
  };

  const deleteMessage = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.filter(m => m.id !== id)
    }));
  };

  // Admin Password & System
  const updateAdminPassword = (newPassword: string) => {
    const trimmed = newPassword.trim();
    setData(prev => ({
      ...prev,
      adminPassword: trimmed,
      adminPin: trimmed
    }));
  };

  const updateAdminPin = (newPin: string) => {
    updateAdminPassword(newPin);
  };

  const resetToDefault = () => {
    setData(INITIAL_PORTFOLIO_DATA);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PORTFOLIO_DATA));
  };

  const exportJSON = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.profile || !parsed.skills || !parsed.projects) {
        return { success: false, error: 'Invalid portfolio JSON structure.' };
      }
      setData(parsed);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Invalid JSON syntax' };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        toggleTheme,
        isAdminOpen,
        setIsAdminOpen,
        isCvModalOpen,
        openCvModal,
        closeCvModal,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        updateProfile,
        updateAbout,
        updateContact,
        updateMetrics,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addService,
        updateService,
        deleteService,
        addArticle,
        updateArticle,
        deleteArticle,
        addBook,
        updateBook,
        deleteBook,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        sendMessage,
        markMessageRead,
        deleteMessage,
        adminPassword: data.adminPassword || data.adminPin || '1234',
        updateAdminPassword,
        updateAdminPin,
        resetToDefault,
        exportJSON,
        importJSON,
        cloudSyncStatus,
        cloudSyncError,
        lastCloudSyncTime,
        syncNow,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
