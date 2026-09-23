import { jsPDF } from 'jspdf';
import { PortfolioData, ExperienceItem, ProjectItem, EducationItem } from '../types';

export const generatePdfCv = (data: PortfolioData): boolean => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
    const pageHeight = doc.internal.pageSize.getHeight(); // 841.89 pt
    const margin = 36;
    const contentWidth = pageWidth - margin * 2; // ~523 pt
    let y = 36;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    const drawSectionHeader = (title: string) => {
      checkPageBreak(35);
      y += 8;
      
      // Teal accent bar
      doc.setFillColor(13, 148, 136); // #0d9488
      doc.rect(margin, y - 2, 4, 14, 'F');

      // Title Text
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42); // #0f172a
      doc.text(title.toUpperCase(), margin + 10, y + 9);

      // Thin divider line
      doc.setDrawColor(226, 232, 240); // #e2e8f0
      doc.setLineWidth(0.75);
      doc.line(margin + 10 + doc.getTextWidth(title.toUpperCase()) + 10, y + 6, margin + contentWidth, y + 6);

      y += 18;
    };

    // ================= HEADER =================
    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text(data.profile.name || 'Din Mohammad Al Amin', margin, y + 16);
    y += 24;

    // Subtitle / Designation
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(13, 148, 136);
    doc.text(data.profile.tagline || 'Software QA Automation Engineer | Test Automation Specialist', margin, y + 6);
    y += 16;

    // Contact info bar
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);

    const phone = data.profile.phone || '+880 1860-220042';
    const email = data.profile.email || 'dmaa357@gmail.com';
    const location = data.profile.address || data.profile.city || 'Rajshahi, Bangladesh';
    const contactLine = `${phone}   |   ${email}   |   ${location}`;
    doc.text(contactLine, margin, y + 4);
    y += 13;

    // Links line
    const linkedin = data.profile.linkedinUrl || 'https://www.linkedin.com/in/din-mohammad-al-amin';
    const github = data.profile.githubUrl || 'https://github.com/dinmohammadalamin';
    const linksLine = `LinkedIn: ${linkedin}   |   GitHub: ${github}`;
    doc.text(linksLine, margin, y + 4);
    y += 14;

    // Top Divider
    doc.setDrawColor(13, 148, 136);
    doc.setLineWidth(1.5);
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;

    // ================= PROFESSIONAL SUMMARY =================
    drawSectionHeader('Professional Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const summaryText = data.profile.bio || 
      'Passionate and detail-oriented Software Quality Assurance Engineer with hands-on expertise in automated testing (Playwright, Selenium) and comprehensive manual testing across web, mobile, and API ecosystems. Proven track record in developing robust test suites, API contracts, cross-browser validation, and collaborating with cross-functional agile teams to deliver zero-defect software releases.';
    
    const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
    checkPageBreak(summaryLines.length * 12);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 12 + 6;

    // ================= KEY SKILLS & COMPETENCIES =================
    drawSectionHeader('Technical Skills & QA Competencies');

    const skillGroups = [
      {
        category: 'Test Automation:',
        items: 'Playwright, TypeScript, Selenium WebDriver, Cypress, Appium, Cucumber BDD, PyTest'
      },
      {
        category: 'API & Performance:',
        items: 'Postman, Newman, REST APIs, JSON/XML Payload Validation, Apache JMeter, k6'
      },
      {
        category: 'Manual & Methodologies:',
        items: 'Test Case Design, Bug Life Cycle, SDLC/STLC, Agile Scrum, Regression, Smoke & Sanity Testing'
      },
      {
        category: 'Tools & DevOps:',
        items: 'JIRA, Trello, Git, GitHub Actions, CI/CD Pipelines, Docker, VS Code, Chrome DevTools'
      },
      {
        category: 'Programming & Web:',
        items: 'JavaScript, TypeScript, Python, HTML5, CSS3, SQL (PostgreSQL, MySQL)'
      }
    ];

    skillGroups.forEach(group => {
      checkPageBreak(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(group.category, margin, y);

      const catWidth = doc.getTextWidth(group.category) + 8;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const itemsLines = doc.splitTextToSize(group.items, contentWidth - catWidth);
      doc.text(itemsLines, margin + catWidth, y);
      y += itemsLines.length * 11 + 3;
    });

    y += 4;

    // ================= PROFESSIONAL EXPERIENCE =================
    if (data.experience && data.experience.length > 0) {
      drawSectionHeader('Professional Experience');

      data.experience.forEach((exp: ExperienceItem) => {
        checkPageBreak(40);
        
        // Role & Company
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        doc.text(exp.role, margin, y);

        // Period on the right
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(exp.period, margin + contentWidth, y, { align: 'right' });
        y += 12;

        // Company & Location
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(13, 148, 136);
        doc.text(`${exp.company}  •  ${exp.location}`, margin, y);
        y += 12;

        // Description
        if (exp.description) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(51, 65, 85);
          const descLines = doc.splitTextToSize(exp.description, contentWidth);
          checkPageBreak(descLines.length * 11);
          doc.text(descLines, margin, y);
          y += descLines.length * 11 + 4;
        }

        // Bullet achievements
        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach((ach: string) => {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(51, 65, 85);
            const bulletLines = doc.splitTextToSize(`•  ${ach}`, contentWidth - 8);
            checkPageBreak(bulletLines.length * 11);
            doc.text(bulletLines, margin + 6, y);
            y += bulletLines.length * 11 + 2;
          });
        }
        y += 6;
      });
    }

    // ================= FEATURED PROJECTS / SQA AUDITS =================
    if (data.projects && data.projects.length > 0) {
      drawSectionHeader('Key Projects & SQA Testing Works');

      data.projects.slice(0, 7).forEach((proj: ProjectItem, idx: number) => {
        checkPageBreak(35);

        // Project Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        const pTitle = `${idx + 1}. ${proj.title}`;
        doc.text(pTitle, margin, y);

        // Category / liveUrl
        if (proj.liveUrl) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(13, 148, 136);
          doc.text(proj.liveUrl, margin + contentWidth, y, { align: 'right' });
        }
        y += 11;

        // Tech stack tag line
        if (proj.techStack && proj.techStack.length > 0) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);
          doc.text(`Tech & Tools: ${proj.techStack.join(', ')}`, margin, y);
          y += 10;
        }

        // Description
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        const pDescLines = doc.splitTextToSize(proj.description, contentWidth);
        checkPageBreak(pDescLines.length * 10);
        doc.text(pDescLines, margin, y);
        y += pDescLines.length * 10 + 2;

        // QA Highlights
        if (proj.qaHighlights && proj.qaHighlights.length > 0) {
          proj.qaHighlights.slice(0, 2).forEach((hl: string) => {
            const hlLines = doc.splitTextToSize(`- ${hl}`, contentWidth - 10);
            checkPageBreak(hlLines.length * 10);
            doc.text(hlLines, margin + 6, y);
            y += hlLines.length * 10 + 1;
          });
        }

        y += 4;
      });
    }

    // ================= EDUCATION =================
    if (data.education && data.education.length > 0) {
      drawSectionHeader('Education');

      data.education.forEach((edu: EducationItem) => {
        checkPageBreak(25);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(`${edu.degree}  —  ${edu.institution}`, margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(edu.period, margin + contentWidth, y, { align: 'right' });
        y += 11;

        if (edu.grade || edu.description) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(51, 65, 85);
          const eduDetail = edu.grade ? `${edu.grade}  |  ${edu.description}` : edu.description;
          doc.text(eduDetail, margin, y);
          y += 11;
        }
        y += 3;
      });
    }

    // ================= ADDITIONAL CREDENTIALS & INFO =================
    drawSectionHeader('Credentials, Publications & Activities');
    
    const addInfo = [
      '•  Published Author: "Ononto Parapar" by Din Mohammad (Omor Ekushe Book Fair 2025)',
      '•  Certification: SQA Placement Manual Testing Course — Code Factory',
      '•  Certification: SQA Professional Course — Software Testing Academy',
      '•  Robotics Society of Varendra University — Executive Member (03/2022)',
      '•  Programming Club of Varendra University — Executive Member (03/2021)',
      '•  Languages: English (Professional Working), Bangla (Native)'
    ];

    addInfo.forEach(item => {
      checkPageBreak(12);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      doc.text(item, margin, y);
      y += 12;
    });

    // ================= REFERENCES =================
    drawSectionHeader('References');
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text("S M Alamgir Jamil — Assistant Professor, Mental Hygiene Govt. Teachers' Training College, Rajshahi", margin, y);
    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text("Phone: 01711066541   |   Email: russel.ru.psy@gmail.com   |   Rajshahi, Bangladesh", margin, y);
    y += 16;

    // Footer page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184); // #94a3b8
      doc.text(
        `Din Mohammad Al Amin — Software QA Automation Engineer CV  |  Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 18,
        { align: 'center' }
      );
    }

    // ================= SAVE / DOWNLOAD =================
    const fileName = 'Din_Mohammad_Al_Amin_CV.pdf';

    try {
      // jsPDF built-in save handles cross-browser downloads cleanly
      doc.save(fileName);
    } catch (saveErr) {
      console.warn('doc.save fallback to manual blob anchor:', saveErr);
      const pdfBlob = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    }

    return true;
  } catch (err) {
    console.error('Vector PDF generation error:', err);
    return false;
  }
};
