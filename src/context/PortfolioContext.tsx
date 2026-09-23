import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  ProfileData,
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
  updateMetrics: (metrics: MetricItem[]) => void;
  
  // Skills
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  
  // Projects
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  
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
          metrics: Array.isArray(parsed?.metrics) && parsed.metrics.length > 0 ? parsed.metrics : INITIAL_PORTFOLIO_DATA.metrics,
          skills: Array.isArray(parsed?.skills) && parsed.skills.length > 0 ? parsed.skills : INITIAL_PORTFOLIO_DATA.skills,
          services: Array.isArray(parsed?.services) && parsed.services.length > 0 ? parsed.services : INITIAL_PORTFOLIO_DATA.services,
          projects: Array.isArray(parsed?.projects) && parsed.projects.length > 0 ? parsed.projects : INITIAL_PORTFOLIO_DATA.projects,
          experience: Array.isArray(parsed?.experience) && parsed.experience.length > 0 ? parsed.experience : INITIAL_PORTFOLIO_DATA.experience,
          education: Array.isArray(parsed?.education) && parsed.education.length > 0 ? parsed.education : INITIAL_PORTFOLIO_DATA.education,
          books: Array.isArray(parsed?.books) && parsed.books.length > 0 ? parsed.books : INITIAL_PORTFOLIO_DATA.books,
          articles: Array.isArray(parsed?.articles) && parsed.articles.length > 0
            ? parsed.articles.filter((a: any) => !a.isBook)
            : INITIAL_PORTFOLIO_DATA.articles,
          gallery: Array.isArray(parsed?.gallery) && parsed.gallery.length > 0 ? parsed.gallery : INITIAL_PORTFOLIO_DATA.gallery,
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

  // Persist data whenever it changes
  useEffect(() => {
    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to storage', e);
    }
  }, [data]);

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

  const updateProfile = (profile: ProfileData) => {
    setData(prev => ({ ...prev, profile }));
  };

  const updateMetrics = (metrics: MetricItem[]) => {
    setData(prev => ({ ...prev, metrics }));
  };

  // Skills
  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = { ...skill, id: `sk-${Date.now()}` };
    setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id: string, updated: Partial<SkillItem>) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === id ? { ...s, ...updated } : s))
    }));
  };

  const deleteSkill = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Projects
  const addProject = (proj: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = { ...proj, id: `proj-${Date.now()}` };
    setData(prev => ({ ...prev, projects: [newProj, ...prev.projects] }));
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Experience
  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = { ...exp, id: `exp-${Date.now()}` };
    setData(prev => ({ ...prev, experience: [newExp, ...prev.experience] }));
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => (e.id === id ? { ...e, ...updated } : e))
    }));
  };

  const deleteExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  // Education
  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = { ...edu, id: `edu-${Date.now()}` };
    setData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, updated: Partial<EducationItem>) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...e, ...updated } : e))
    }));
  };

  const deleteEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  // Services
  const addService = (srv: Omit<ServiceItem, 'id'>) => {
    const newSrv: ServiceItem = { ...srv, id: `srv-${Date.now()}` };
    setData(prev => ({ ...prev, services: [...prev.services, newSrv] }));
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => (s.id === id ? { ...s, ...updated } : s))
    }));
  };

  const deleteService = (id: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  // Articles
  const addArticle = (art: Omit<ArticleItem, 'id'>) => {
    const newArt: ArticleItem = { ...art, id: `art-${Date.now()}` };
    setData(prev => ({ ...prev, articles: [newArt, ...prev.articles] }));
  };

  const updateArticle = (id: string, updated: Partial<ArticleItem>) => {
    setData(prev => ({
      ...prev,
      articles: prev.articles.map(a => (a.id === id ? { ...a, ...updated } : a))
    }));
  };

  const deleteArticle = (id: string) => {
    setData(prev => ({
      ...prev,
      articles: prev.articles.filter(a => a.id !== id)
    }));
  };

  // Books
  const addBook = (book: Omit<BookItem, 'id'>) => {
    const newBook: BookItem = {
      ...book,
      id: `book-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      books: [newBook, ...(prev.books || [])]
    }));
  };

  const updateBook = (id: string, updated: Partial<BookItem>) => {
    setData(prev => ({
      ...prev,
      books: (prev.books || []).map(b => (b.id === id ? { ...b, ...updated } : b))
    }));
  };

  const deleteBook = (id: string) => {
    setData(prev => ({
      ...prev,
      books: (prev.books || []).filter(b => b.id !== id)
    }));
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      gallery: [newItem, ...(prev.gallery || [])]
    }));
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).map(g => (g.id === id ? { ...g, ...updated } : g))
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter(g => g.id !== id)
    }));
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
