export type SkillCategory = 'automation' | 'api-performance' | 'manual-qa' | 'dev-tools' | 'languages';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0 to 100
  iconName?: string;
  badge?: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Automation' | 'API Testing' | 'Performance' | 'Web & PWA' | 'Bug Case Study' | string;
  description: string;
  qaHighlights: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  reportUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  type?: 'work' | 'internship' | 'creative';
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  grade?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
  deliverables: string[];
}

export interface BookItem {
  id: string;
  title: string;
  bengaliTitle?: string;
  subtitle?: string;
  publisher: string;
  publishedYear: string;
  bookFair?: string;
  coverImage: string;
  description: string;
  excerpt?: string;
  genre: string;
  pages?: string;
  isbn?: string;
  price?: string;
  language?: string;
  orderUrl?: string;
  featured?: boolean;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  type?: 'article' | 'vlog' | 'external' | 'tutorial';
  platform?: 'Dev.to' | 'Medium' | 'LinkedIn' | 'YouTube' | 'Personal' | string;
  link?: string;
  externalUrl?: string;
  videoUrl?: string;
  tags?: string[];
  isBook?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Book Fair' | 'Tech & Work' | 'Robotics & Campus' | 'Events & Life' | string;
  imageUrl: string;
  date: string;
  location?: string;
  caption?: string;
  featured?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ProfileData {
  name: string;
  tagline: string;
  typingRoles: string[];
  bio: string;
  aboutLong: string;
  birthday: string;
  age: string;
  website: string;
  email: string;
  phone: string;
  city: string;
  freelanceStatus: string;
  resumeUrl: string;
  avatarUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  yearsOfExperience: string;
  address?: string;
  philosophy?: string;
  languages?: string[];
  courses?: string[];
  additionalClubs?: string[];
  reference?: {
    name: string;
    title: string;
    phone: string;
    email: string;
    address: string;
  };
}

export interface TestScenarioDemo {
  id: string;
  name: string;
  type: 'E2E' | 'API' | 'Performance' | 'Security';
  steps: string[];
  status: 'passed' | 'running' | 'idle';
  duration: string;
  assertions: number;
}

export interface PortfolioData {
  profile: ProfileData;
  metrics: MetricItem[];
  skills: SkillItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  books: BookItem[];
  articles: ArticleItem[];
  gallery: GalleryItem[];
  messages: ContactMessage[];
  adminPin: string;
  adminPassword?: string;
}
