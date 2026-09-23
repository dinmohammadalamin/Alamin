import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ShieldCheck,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Download,
  Mail,
  Bug,
  Zap,
  Play,
  Github,
  Linkedin,
  Globe,
  Sparkles
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, openCvModal } = usePortfolio();
  const { profile } = data;

  // Dynamic Typing text state
  const roles = profile.typingRoles && profile.typingRoles.length > 0
    ? profile.typingRoles
    : ['SQA Engineer', 'Test Automation Specialist', 'API Tester', 'Bug Hunter'];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Auto-scale measurement refs to guarantee the full typing animation stays in one line and never gets clipped
  const containerRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const [textScale, setTextScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && probeRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const probeWidth = probeRef.current.scrollWidth;
        if (containerWidth > 0 && probeWidth > containerWidth) {
          // Add a small safety margin of 2px
          setTextScale((containerWidth - 4) / probeWidth);
        } else {
          setTextScale(1);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [currentRoleIndex, roles]);

  useEffect(() => {
    const fullText = roles[currentRoleIndex % roles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
        if (displayedText === fullText) {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        // Deleting
        setDisplayedText(fullText.slice(0, displayedText.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex(prev => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Background Grid Pattern & Ambient Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile.freelanceStatus || 'Open for SQA Engineering Roles'}</span>
            </div>

            {/* Main Greeting */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Hello, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {profile.name}
              </span>
            </h1>

            {/* Dynamic Typing Title - Guaranteed single line & never clipped */}
            <div ref={containerRef} className="w-full h-10 sm:h-12 mt-3 flex items-center overflow-visible relative">
              <div
                className="flex items-center flex-nowrap whitespace-nowrap transition-transform duration-150"
                style={{
                  transform: textScale < 1 ? `scale(${textScale})` : undefined,
                  transformOrigin: 'left center',
                  width: 'max-content'
                }}
              >
                <span className="text-sm sm:text-base md:text-lg lg:text-xl font-mono text-slate-300 shrink-0">
                  I build & break tests as a{' '}
                </span>
                <span className="ml-2 text-sm sm:text-base md:text-lg lg:text-xl font-mono font-semibold text-emerald-400 border-r-2 border-emerald-400 pr-1 animate-pulse whitespace-nowrap inline-block min-h-[1.2em]">
                  {displayedText}
                </span>
              </div>

              {/* Invisible calculation probe to determine maximum width of full sentence */}
              <div
                ref={probeRef}
                aria-hidden="true"
                className="pointer-events-none opacity-0 flex items-center flex-nowrap whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl font-mono"
                style={{ position: 'absolute', top: -9999, left: -9999, visibility: 'hidden' }}
              >
                <span className="shrink-0">I build & break tests as a </span>
                <span className="ml-2 font-semibold">{roles[currentRoleIndex % roles.length]}</span>
              </div>
            </div>

            {/* Bio / Value Prop */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {profile.tagline || profile.bio}
            </p>

            {/* SQA Quick Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Playwright / Cypress</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Postman API</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                <Bug className="w-3.5 h-3.5 text-red-400" />
                <span>Jira Defect Mgmt</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero Flaky Gates</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={openCvModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
                title="View & Download Authentic SQA CV"
              >
                <Download className="w-4 h-4" />
                <span>View / Download CV</span>
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 font-semibold text-sm transition-all shadow-md active:scale-95"
              >
                <span>QA Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#test-lab"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-medium text-sm transition-all active:scale-95"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span className="hidden sm:inline">Run Test Lab</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-850 text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 w-full flex items-center gap-4 text-slate-400 text-xs">
              <span className="font-mono text-slate-500 uppercase tracking-wider">Connect:</span>
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors p-1"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors p-1"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-emerald-400 transition-colors font-mono text-xs"
                >
                  {profile.email}
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Visual Tech Card & Avatar */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Outer Glow & Gradient Border */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500/40 via-teal-500/20 to-cyan-500/40 rounded-3xl blur-md opacity-70" />

              <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px]">sqa-runner@din-os</span>
                </div>

                {/* Profile Image & Avatar */}
                <div className="mt-4 relative rounded-xl overflow-hidden aspect-square bg-slate-950 border border-slate-800/80 group">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback placeholder if image fails
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  {/* Overlay Test Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs font-mono flex items-center justify-between text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">CI Test Suite: PASSED</span>
                    </div>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                </div>

                {/* Stats Snippet */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/70">
                    <div className="text-base font-bold text-emerald-400">
                      {data.metrics[0]?.value || '750+'}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">Test Cases</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/70">
                    <div className="text-base font-bold text-teal-400">
                      {data.metrics[2]?.value || '88%'}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">Automation</div>
                  </div>
                </div>

                {/* QA Verification Status */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified QA Profile
                  </span>
                  <span className="text-slate-500">Rajshahi, BD</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
