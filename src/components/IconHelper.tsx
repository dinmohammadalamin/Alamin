import React from 'react';
import {
  ClipboardCheck,
  Bug,
  Zap,
  ShieldCheck,
  Cpu,
  Server,
  Search,
  Activity,
  GitMerge,
  BookOpen,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Globe,
  Terminal,
  Code2,
  FileCode,
  CheckCircle2,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface IconHelperProps {
  name: string;
  className?: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'ClipboardCheck':
      return <ClipboardCheck className={className} />;
    case 'Bug':
      return <Bug className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'SearchCheck':
      return <Search className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'GitMerge':
      return <GitMerge className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Mail':
      return <Mail className={className} />;
    case 'Phone':
      return <Phone className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Terminal':
      return <Terminal className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    case 'FileCode':
      return <FileCode className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};
