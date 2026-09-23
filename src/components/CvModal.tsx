import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { generatePdfCv } from '../utils/generatePdfCv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  X,
  Printer,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Github,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileText,
  Share2,
  Loader2,
  Check
} from 'lucide-react';

export const CvModal: React.FC = () => {
  const { isCvModalOpen, closeCvModal, data } = usePortfolio();
  const { profile, projects, experience, education, skills } = data;
  const modalRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCvModalOpen) {
        closeCvModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCvModalOpen, closeCvModal]);

  // Lock body scroll when CV modal is open
  useEffect(() => {
    if (isCvModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCvModalOpen]);

  if (!isCvModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTextCV = () => {
    const textContent = `=====================================================
DIN MOHAMMAD AL AMIN
Writer | SQA Engineer
Phone: +8801869309950
Email: dinmohammadalamin123@gmail.com
GitHub: https://github.com/dinmohammadalamin
Address: Horirumpur-6240, Durgapur, Rajshahi
=====================================================

SUMMARY
Detail-oriented SQA Engineer with hands-on 1years+ experience in manual and automation testing. Skilled in writing and executing test cases, building automation scripts with Playwright, performing API and regression testing, reporting and tracking bugs, and collaborating closely with development teams throughout the sprint cycle to deliver high-quality software.

EXPERIENCE
-----------------------------------------------------
DevxHub Private Ltd. (11/2025 - Present)
SQA Engineer (L-1)
- Write and execute detailed manual test cases covering functional, regression, and UAT scenarios.
- Design and maintain automation test scripts using Playwright for web application testing.
- Perform API testing to validate backend functionality, data integrity, and response accuracy.
- Conduct regression testing across releases to ensure new changes do not break existing functionality.
- Identify, log, and track bugs, working closely with developers to verify fixes.
- Participate in sprint planning, stand-ups, and retrospectives, ensuring QA coverage within Agile delivery cycles.
- Performed manual and automation testing on an ERP (Enterprise Resource Planning) system, along with several other confidential client/company projects.

Durbin Publication (06/2024 - Present)
Writer

Jubayer Math (02/2025 - 06/2025)
Digital Learning Resource Developer

Headman English Academy (12/2024 - 05/2025)
Teacher

SKILLS
-----------------------------------------------------
Manual Testing • Automation Testing • Playwright • Appium • API Testing • Postman • Jira • SQL • C / C++ • JavaScript • Python (Basic)

PROJECTS (DEVXHUB PRIVATE LTD.)
-----------------------------------------------------
1. Proofsell — E-commerce Marketplace (Grocery) | https://proofsell.com
- Executed end-to-end manual, UI, and API testing across core modules, including user onboarding, product listings, cart management, checkout, and order processing.
- Validated payment gateway flows and verified backend API responses for order accuracy and data consistency.

2. Tohobill — Inventory, Accounting & HR SaaS | https://tohobill.com
- Performed manual, UI, API testing, and developed automated test scripts using Playwright for billing, accounting, inventory, and HR/payroll workflows.
- Conducted functional and regression testing to ensure accurate financial calculations and smooth payroll processing.

3. RecurringOps — Multi-tenant SaaS Platform | https://recurringops.net
- Conducted comprehensive UI, API, and Playwright test automation for multi-tenant platform features.
- Tested and verified complex Role-Based Access Control (RBAC) across Super Admin, Admin, and User permission levels.

4. Muslim Times Pro — Islamic Prayer & Quran App | https://muslimtimespro.com
- Performed manual, API, and UI testing for key features, including prayer time algorithms, Quran audio/text modules, Qibla direction finder, and location-based mosque locator.
- Ensured data accuracy of API endpoints providing location and timing metrics.

5. Belltex — E-commerce Platform (Clothing) | https://belltexbd.com
- Tested product catalog responsiveness, cross-browser UI rendering, cart functionality, and secure checkout workflows.
- Verified RESTful APIs to ensure seamless frontend-backend integration during product filtering and order submission.

6. 247eSIM — eSIM Selling Platform & App | https://247esim.com
- Executed manual, API, and UI testing across mobile and web interfaces.
- Validated access controls and workflows across multiple user hierarchy roles: Admin, Agent, Sub-agent, and User.

7. Jaachai — Online Fraud Order Tracking Platform | https://jaachai.com
- Conducted API and UI testing to validate order tracking algorithms and fraud-detection logic.
- Ensured proper error handling, input validation, and reliable reporting mechanisms.

8. Artca — Online Art Gallery Platform | https://artca-online.netlify.app
- Performed staging environment UI testing, cross-device layout verification, and API functional testing.
- Identified and logged edge-case bugs related to media uploads, gallery rendering, and responsive design.

9. Online Job Bid Website
- Tested user workflows for job posting, bidding mechanisms, profile management, and notification services.
- Validated API endpoints for data accuracy and edge-case handling on input fields.

10. AI Agent Platform
- Performed API, manual, and UI testing to evaluate AI response formatting, prompt input validation, and system integration.
- Verified backend payload delivery and conversational workflow stability under various user inputs.

EDUCATION
-----------------------------------------------------
CSE || University of Rajshahi
Masters in Eng | CGPA: 3.15 / 4.00 (2024 - 2025)

CSE || Varendra University
Bachelor of Science | CGPA: 3.30 / 4.00 (2020 - 2024)

Science || Agrani School And College
HSC | GPA: 4.17 / 5.00 (2016 - 2018)

LANGUAGES
-----------------------------------------------------
English — Native  |  Bangla — Native

ADDITIONAL INFO
-----------------------------------------------------
Robotics Society of Varendra University (03/2022)
Executive Member — A student-driven hub for learning robotics, automation, and innovation.

Programming Club of Varendra University (03/2021)
Executive Member — A collaborative space where students enhance their coding skills, solve real-world problems, and explore algorithms.

COURSES
-----------------------------------------------------
SQA (Placement Manual Testing) Course — Code Factory
SQA Course — Software Testing Academy

BOOKS
-----------------------------------------------------
"Ononto Parapar" by Din Mohammad (Published at Omor Ekushe Book Fair 2025)

ENTHUSIAST
-----------------------------------------------------
Traveling | Reading Books | Content Creation | Exploring Science

REFERENCES
-----------------------------------------------------
S M Alamgir Jamil — Assistant Professor, Mental Hygiene Govt. Teachers' Training College, Rajshahi
Phone: 01711066541 | Email: russel.ru.psy@gmail.com | Upashahar, A/254, P.O-Sopura, P.S-Boalia, Dist-Rajshahi

MY LIFE PHILOSOPHY
-----------------------------------------------------
“To behold the Creator’s creation with open eyes, and to gift life a beautiful death.” — Din Mohammad Al Amin
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Din_Mohammad_Al_Amin_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPdf(true);

      // Primary approach: Pure vector PDF generation via jsPDF
      // Instant, zero-CORS issues, ATS-compliant, works in sandboxed iframes
      const generated = generatePdfCv(data);
      if (generated) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3500);
        return;
      }

      // Secondary fallback: Canvas snapshot if vector generation reports error
      const element = document.getElementById('cv-printable-area');
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 1.5,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
        pdf.save('Din_Mohammad_Al_Amin_CV.pdf');

        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3500);
      }
    } catch (error) {
      console.error('PDF export failed, falling back to formatted document:', error);
      handleDownloadTextCV();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div
      id="cv-modal-backdrop"
      onClick={() => closeCvModal()}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 md:p-6 print:p-0 print:bg-white print:static cursor-zoom-out"
    >
      {/* Container Dialog */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 relative print:border-none print:shadow-none print:rounded-none print:bg-white print:my-0 cursor-default"
      >
        {/* Sticky Action Toolbar (Hidden during browser print) */}
        <div className="no-print sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-950/95 border-b border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-none">
                Curriculum Vitae (CV)
              </h2>
              <p className="text-[11px] font-mono text-emerald-400 mt-0.5">
                Din Mohammad Al Amin • SQA Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Primary Action: Download PDF */}
            <button
              type="button"
              id="cv-download-pdf-top-btn"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md ${
                downloadSuccess
                  ? 'bg-emerald-400 text-slate-950 shadow-emerald-400/30 ring-2 ring-emerald-300'
                  : 'bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 shadow-emerald-500/20'
              }`}
              title="Download official CV as PDF"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Print / Save as PDF via Browser */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all active:scale-95 cursor-pointer"
              title="Print directly or use browser print dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {profile.resumeUrl && profile.resumeUrl !== '#' && profile.resumeUrl !== '#cv' && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-teal-400 border border-teal-500/30 transition-all"
                title="Open external link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">External Link</span>
              </a>
            )}

            <button
              type="button"
              onClick={closeCvModal}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
              aria-label="Close CV preview"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Paper Body */}
        <div
          id="cv-printable-area"
          className="p-6 sm:p-10 md:p-12 bg-white text-slate-900 font-sans leading-relaxed selection:bg-emerald-200 selection:text-slate-900 print:p-0 print:text-black"
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          {/* HEADER */}
          <div className="text-center pb-6 border-b-2 border-slate-300">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
              DIN MOHAMMAD AL AMIN
            </h1>
            <p className="text-base sm:text-lg font-semibold text-slate-700 mt-1">
              Writer | SQA Engineer
            </p>

            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <a href="tel:+8801869309950" className="hover:text-emerald-700 transition-colors">
                +8801869309950
              </a>
              <span>|</span>
              <a href="mailto:dinmohammadalamin123@gmail.com" className="hover:text-emerald-700 transition-colors">
                dinmohammadalamin123@gmail.com
              </a>
              <span>|</span>
              <a
                href="https://github.com/dinmohammadalamin"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-700 transition-colors"
              >
                github.com/dinmohammadalamin
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Horirumpur-6240, Durgapur, Rajshahi
            </p>
          </div>

          {/* SUMMARY */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2.5">
              SUMMARY
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed text-justify">
              Detail-oriented SQA Engineer with hands-on 1years+ experience in manual and automation testing. Skilled in writing and executing test cases, building automation scripts with Playwright, performing API and regression testing, reporting and tracking bugs, and collaborating closely with development teams throughout the sprint cycle to deliver high-quality software.
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3">
              EXPERIENCE
            </h2>

            <div className="space-y-4">
              {/* DevxHub */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      DevxHub Private Ltd.
                    </h3>
                    <p className="text-xs italic text-slate-700 font-medium">
                      SQA Engineer (L-1)
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    11/2025 – Present
                  </span>
                </div>
                <ul className="mt-2 list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
                  <li>Write and execute detailed manual test cases covering functional, regression, and UAT scenarios.</li>
                  <li>Design and maintain automation test scripts using Playwright for web application testing.</li>
                  <li>Perform API testing to validate backend functionality, data integrity, and response accuracy.</li>
                  <li>Conduct regression testing across releases to ensure new changes do not break existing functionality.</li>
                  <li>Identify, log, and track bugs, working closely with developers to verify fixes.</li>
                  <li>Participate in sprint planning, stand-ups, and retrospectives, ensuring QA coverage within Agile delivery cycles.</li>
                  <li>Performed manual and automation testing on an ERP (Enterprise Resource Planning) system, along with several other confidential client/company projects.</li>
                </ul>
              </div>

              {/* Durbin Publication */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      Durbin Publication
                    </h3>
                    <p className="text-xs italic text-slate-700">Writer</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    06/2024 – Present
                  </span>
                </div>
              </div>

              {/* Jubayer Math */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      Jubayer Math
                    </h3>
                    <p className="text-xs italic text-slate-700">Digital Learning Resource Developer</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    02/2025 – 06/2025
                  </span>
                </div>
              </div>

              {/* Headman English Academy */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      Headman English Academy
                    </h3>
                    <p className="text-xs italic text-slate-700">Teacher</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    12/2024 – 05/2025
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2.5">
              SKILLS
            </h2>
            <div className="text-xs text-slate-800 leading-relaxed">
              <span className="font-semibold text-slate-900">Manual Testing</span> • Automation Testing • <span className="font-semibold text-slate-900">Playwright</span> • Appium • <span className="font-semibold text-slate-900">API Testing</span> • <span className="font-semibold text-slate-900">Postman</span> • <span className="font-semibold text-slate-900">Jira</span> • <span className="font-semibold text-slate-900">SQL</span> • C / C++ • JavaScript • Python (Basic)
            </div>
          </div>

          {/* PROJECTS (DEVXHUB PRIVATE LTD.) */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3">
              PROJECTS (DEVXHUB PRIVATE LTD.)
            </h2>

            <div className="space-y-3.5 text-xs text-slate-800">
              {/* 1. Proofsell */}
              <div>
                <p className="font-bold text-slate-900">
                  1. Proofsell — E-commerce Marketplace (Grocery) |{' '}
                  <a
                    href="https://proofsell.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline font-semibold"
                  >
                    proofsell.com
                  </a>
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Executed end-to-end manual, UI, and API testing across core modules, including user onboarding, product listings, cart management, checkout, and order processing.</li>
                  <li>Validated payment gateway flows and verified backend API responses for order accuracy and data consistency.</li>
                </ul>
              </div>

              {/* 2. Tohobill */}
              <div>
                <p className="font-bold text-slate-900">
                  2. Tohobill — Inventory, Accounting & HR SaaS |{' '}
                  <a
                    href="https://tohobill.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline font-semibold"
                  >
                    tohobill.com
                  </a>
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Performed manual, UI, API testing, and developed automated test scripts using <span className="font-semibold text-slate-900">Playwright</span> for billing, accounting, inventory, and HR/payroll workflows.</li>
                  <li>Conducted functional and regression testing to ensure accurate financial calculations and smooth payroll processing.</li>
                </ul>
              </div>

              {/* 3. RecurringOps */}
              <div>
                <p className="font-bold text-slate-900">
                  3. RecurringOps — Multi-tenant SaaS Platform |{' '}
                  <a
                    href="https://recurringops.net"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline font-semibold"
                  >
                    recurringops.net
                  </a>
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Conducted comprehensive UI, API, and Playwright test automation for multi-tenant platform features.</li>
                  <li>Tested and verified complex Role-Based Access Control (RBAC) across Super Admin, Admin, and User permission levels.</li>
                </ul>
              </div>

              {/* 4. Muslim Times Pro */}
              <div>
                <p className="font-bold text-slate-900">
                  4. Muslim Times Pro — Islamic Prayer & Quran App |{' '}
                  <a
                    href="https://muslimtimespro.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline font-semibold"
                  >
                    muslimtimespro.com
                  </a>
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Performed manual, API, and UI testing for key features, including prayer time algorithms, Quran audio/text modules, Qibla direction finder, and location-based mosque locator.</li>
                  <li>Ensured data accuracy of API endpoints providing location and timing metrics.</li>
                </ul>
              </div>

              {/* 5. Belltex */}
              <div>
                <p className="font-bold text-slate-900">
                  5. Belltex — E-commerce Platform (Clothing) |{' '}
                  <a
                    href="https://belltexbd.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline font-semibold"
                  >
                    belltexbd.com
                  </a>
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Tested product catalog responsiveness, cross-browser UI rendering, cart functionality, and secure checkout workflows.</li>
                  <li>Verified RESTful APIs to ensure seamless frontend-backend integration during product filtering and order submission.</li>
                </ul>
              </div>

              {/* 6. 247eSIM */}
              <div>
                <p className="font-bold text-slate-900">
                  6. 247eSIM — eSIM Selling Platform & App |{' '}
                  <a
                    href="https://247esim.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline font-semibold"
                  >
                    247esim.com
                  </a>
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Executed manual, API, and UI testing across mobile and web interfaces.</li>
                  <li>Validated access controls and workflows across multiple user hierarchy roles: Admin, Agent, Sub-agent, and User.</li>
                </ul>
              </div>

              {/* 7. Jaachai */}
              <div>
                <p className="font-bold text-slate-900">
                  7. Jaachai — Online Fraud Order Tracking Platform |{' '}
                  <a
                    href="https://jaachai.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline font-semibold"
                  >
                    jaachai.com
                  </a>
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Conducted API and UI testing to validate order tracking algorithms and fraud-detection logic.</li>
                  <li>Ensured proper error handling, input validation, and reliable reporting mechanisms.</li>
                </ul>
              </div>

              {/* 8. Artca */}
              <div>
                <p className="font-bold text-slate-900">
                  8. Artca — Online Art Gallery Platform |{' '}
                  <a
                    href="https://artca-online.netlify.app"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline font-semibold"
                  >
                    artca-online.netlify.app
                  </a>
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Performed staging environment UI testing, cross-device layout verification, and API functional testing.</li>
                  <li>Identified and logged edge-case bugs related to media uploads, gallery rendering, and responsive design.</li>
                </ul>
              </div>

              {/* 9. Online Job Bid Website */}
              <div>
                <p className="font-bold text-slate-900">
                  9. Online Job Bid Website
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Tested user workflows for job posting, bidding mechanisms, profile management, and notification services.</li>
                  <li>Validated API endpoints for data accuracy and edge-case handling on input fields.</li>
                </ul>
              </div>

              {/* 10. AI Agent Platform */}
              <div>
                <p className="font-bold text-slate-900">
                  10. AI Agent Platform
                </p>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 mt-1">
                  <li>Performed API, manual, and UI testing to evaluate AI response formatting, prompt input validation, and system integration.</li>
                  <li>Verified backend payload delivery and conversational workflow stability under various user inputs.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3">
              EDUCATION
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="font-bold text-slate-900">
                    CSE || University of Rajshahi
                  </h3>
                  <p className="text-slate-700 italic">
                    Masters in Eng | <span className="font-semibold text-slate-900">CGPA: 3.15 / 4.00</span>
                  </p>
                </div>
                <span className="font-semibold text-slate-600">2024 – 2025</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-2 border-t border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900">
                    CSE || Varendra University
                  </h3>
                  <p className="text-slate-700 italic">
                    Bachelor of Science | <span className="font-semibold text-slate-900">CGPA: 3.30 / 4.00</span>
                  </p>
                </div>
                <span className="font-semibold text-slate-600">2020 – 2024</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-2 border-t border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Science || Agrani School And College
                  </h3>
                  <p className="text-slate-700 italic">
                    HSC | <span className="font-semibold text-slate-900">GPA: 4.17 / 5.00</span>
                  </p>
                </div>
                <span className="font-semibold text-slate-600">2016 – 2018</span>
              </div>
            </div>
          </div>

          {/* LANGUAGES */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              LANGUAGES
            </h2>
            <p className="text-xs text-slate-800">
              <span className="font-semibold">English</span> — Native &nbsp;&nbsp;|&nbsp;&nbsp; <span className="font-semibold">Bangla</span> — Native
            </p>
          </div>

          {/* ADDITIONAL INFO */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2.5">
              ADDITIONAL INFO
            </h2>
            <div className="space-y-2 text-xs text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <p className="font-bold text-slate-900">Robotics Society of Varendra University</p>
                  <p className="text-slate-700 italic">Executive Member — A student-driven hub for learning robotics, automation, and innovation.</p>
                </div>
                <span className="font-semibold text-slate-600 shrink-0">03/2022</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-1.5 border-t border-slate-100">
                <div>
                  <p className="font-bold text-slate-900">Programming Club of Varendra University</p>
                  <p className="text-slate-700 italic">Executive Member — A collaborative space where students enhance their coding skills, solve real-world problems, and explore the world of algorithms and software development.</p>
                </div>
                <span className="font-semibold text-slate-600 shrink-0">03/2021</span>
              </div>
            </div>
          </div>

          {/* COURSES */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              COURSES
            </h2>
            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
              <li><span className="font-semibold">SQA (Placement Manual Testing) Course</span> — Code Factory</li>
              <li><span className="font-semibold">SQA Course</span> — Software Testing Academy</li>
            </ul>
          </div>

          {/* BOOKS */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              BOOKS
            </h2>
            <div className="text-xs text-slate-800">
              <p className="font-bold text-slate-900">Ononto Parapar</p>
              <p className="text-slate-600 italic">Din Mohammad (Published at Omor Ekushe Book Fair 2025)</p>
            </div>
          </div>

          {/* ENTHUSIAST */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              ENTHUSIAST
            </h2>
            <p className="text-xs text-slate-800 flex items-center gap-4 flex-wrap">
              <span>✈ Traveling</span>
              <span>📖 Reading Books</span>
              <span>🎥 Content Creation</span>
              <span>🧪 Exploring Science</span>
            </p>
          </div>

          {/* REFERENCES */}
          <div className="mt-6">
            <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              REFERENCES
            </h2>
            <div className="text-xs text-slate-800">
              <p className="font-bold text-slate-900">
                S M Alamgir Jamil — <span className="font-normal italic">Assistant Professor, Mental Hygiene Govt. Teachers' Training College, Rajshahi</span>
              </p>
              <p className="text-slate-600 mt-0.5">
                01711066541 | russel.ru.psy@gmail.com | Upashahar, A/254, P.O-Sopura, P.S-Boalia, Dist-Rajshahi
              </p>
            </div>
          </div>

          {/* MY LIFE PHILOSOPHY */}
          <div className="mt-6 pt-4 border-t-2 border-slate-300 text-center">
            <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-1">
              MY LIFE PHILOSOPHY
            </h2>
            <p className="text-xs italic font-medium text-slate-800">
              “To behold the Creator’s creation with open eyes, and to gift life a beautiful death.”
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">— Din Mohammad Al Amin</p>
          </div>
        </div>

        {/* Bottom Bar in Modal (Hidden during print) */}
        <div className="no-print p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Exact replica of Din Mohammad Al Amin's authentic CV</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              id="cv-download-pdf-bottom-btn"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
                downloadSuccess
                  ? 'bg-emerald-400 text-slate-950 shadow-emerald-400/30 ring-2 ring-emerald-300'
                  : 'bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={closeCvModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
