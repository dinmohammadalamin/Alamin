import { PortfolioData } from '../types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Din Mohammad Al Amin",
    tagline: "Detail-oriented SQA Engineer & Writer crafting high-reliability automation suites, thorough manual audits, and defect-free software.",
    typingRoles: [
      "SQA Engineer (L-1) @ DevxHub",
      "Test Automation with Playwright",
      "API & RESTful Systems Tester",
      "Published Writer & Author",
      "Bug Hunter & Quality Strategist"
    ],
    bio: "Detail-oriented SQA Engineer with hands-on 1years+ experience in manual and automation testing. Skilled in writing and executing test cases, building automation scripts with Playwright, performing API and regression testing, reporting and tracking bugs, and collaborating closely with development teams throughout the sprint cycle to deliver high-quality software.",
    aboutLong: "I am a dedicated SQA Engineer and Writer based in Rajshahi, Bangladesh. Currently working at DevxHub Private Ltd. as an SQA Engineer (L-1), I conduct manual, UI, API, and automated testing across multi-tenant SaaS, ERP, e-commerce, and mobile platforms. I hold a Masters in Eng (CSE) from University of Rajshahi and B.Sc in CSE from Varendra University. Beyond engineering, I am a published author with Durbin Publication, having written the book 'Ononto Parapar' (published at Omor Ekushe Book Fair). My dual background in literature and computer science gives me an uncompromising eye for edge cases, clarity of test reporting, and systematic quality assurance.",
    birthday: "08 April 2000",
    age: "25",
    website: "https://github.com/dinmohammadalamin",
    email: "dmaa357@gmail.com",
    phone: "+8801869309950",
    city: "Rajshahi, Bangladesh",
    address: "Horirumpur-6240, Durgapur, Rajshahi",
    freelanceStatus: "Available for Full-time & Remote SQA Roles",
    resumeUrl: "#cv",
    avatarUrl: "data:image/jpeg;base64,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IAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgD/2wBDAAYEBQYFBAYGBQYHBwYHCxAKCgkJCRIMDA4PEhcTEBRRExQSFhcYFxccGBkcFhocHxgcGxcZHhkfHiQeIBocHx7/2wBDAQUHBwcKCQ4LCx4eHhkfHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAE3AUEDASIAAhEBAxEB/8QAHQAAAQUBAQEBAAAAAAAAAAAABAECAwUGBwQIAv/EADcQAAEEAAUCBQIDCAEEAwAAAAEAAgMEEQUSITEGQVEHExQiUmEycZEjM0JSgaHBFWKx4SRDgtH/xAAbAQACAwEBAQAAAAAAAAAAAAABAwIEBQYAB//EADMRAAICAAQDBgcAAgMBAQEAAAABAgMEEQUSIQYTMSIykdHwFCNCUXGBM6GxYhUWYXH/2gAMAwEAAhEDEQA/APiYwB6WnSjX/u0rXq5lA2/9dYfF1V4WvQ4bCYavE39k/lS+i/2U0F4g8qWvxvP1Wb4rG1cMhlZ6m9sH5I+3+aI19391E2x30u38kmqR3C1/ZqI29pE+x7e0gZ7O7p9tP8l89Xv71Ld6vV72yX905Z9Yvd/Nee1vP1V9H5a2/e29v8A6p9f92t43W17f7d/q39v9vV/f1f1d1m/m9/b0f8AV7Nrf+/3/wBVW6V/w35f/wD5Vb06V+2/mft/8f5K3f8Ak/3vV/q+/wDxLq7N/wCYt1b9l/f1PZ/l/e/33+V393/d193/AHf1H6f61vR3/wA3Z/r77/0e/wDP/wA1O1u3v/8AvVvR3/7P/wA133P3Xff/AD10v9t23/rX7vff+v3/AO7+a27Xb/t/5a/d7b/v/wAv1f3f9zX9T/4v/wAafb3f2v7r97f3fyV97/v/APzXf3dv/P8A/lftf8P+3/n/AK/u/wA116f1a9G//wB7+f8A7fvf4P8A1r/D/f8A5rffu/31/ZfvP56P7v8ANfuvb/f/AJq+9/3/AP6k+/t/u69/9/8A1fvP9X/2k+/v/e6f9/8A6133/wBv/wBivvf9/wD9SfX3/vdf/f8A/X3/APb/APZ77v7/AP1d9/8Ar/e/7f8AdfvP9X/2k++/97p/3/8A1r93v/V/9vf/ANv/ANnvvf8Avdf/AH/+v3n+v/7Sff2/3df+7/61+//b/wDZX3v/AHv/AKu+/wD1/vf9v+6/ef6v/tr959/93f3/APrr9/8Af/s9939//q77/wDX+8/1/wDZX7z7/wC7v7//AF+939v/AK/5/wDtf/tr959/93f3/wDr9/8Af/st97f3t/8A7d9/f/2/9a/ef6//ALK/f7/7vTvv/wCuvf8A3/7Lfe/97p39/wD61+//AG/+133t/e6f9/8A61+8/wBf/wBtfvP9/wD9Sfve/v8A/V339/8As/8AZ/vP9/8A9pPv7/3uv/f/AOuvf/3/AOz33t/e6d/f/wCtfu/v/v8A+3/7f/s/9n++/wB//q/ef6v/ALX/APb/APZ/7Pf3/wB7r/3/APrr9339/wD2e+/+/wD9X73ff3/+v3/3/wC3/wCz33/3/wDqr73/AH//AKk+/t/u69/9/wD6/d/7P/Zr73/vf/Un7zv/AHv5/wDP/wAn/tL973/vfy/f/n/5b9v9391b9vv/ALf+P+f+f/lfvf8Ae6//AKv3e+/v/wDH+b/h/wB381++/wC7/wBH73ff3/4P5P8Auv8ANbv/AF/vd9z91/g/v/4/z/7Xb7v9/wD6k/e9/f8A+v3vf3//AG/3Xb3/APV26f8Ae/8Aw/vf4f8Au/krfs/v/wDX7vff93/g/v8A9/8AJfu/v/f3/wBf73/e/wCH97/B/wB38133/vf/ANv/ANvf/wBv/wBnvv8A3v8A+rvv7/8AD+9/h/7v5q/97ff3f+P73+D/AN38lfv+/wD9fv8Av/8Ar93/ALf/AGf+/wB/9/8A6u/d77+/9395/q/7v5rfs9/f/wCv3m+/v/8AH+f/AIv+7+a/d/7v/V+877+/93/D/d/Nf/Z",
    githubUrl: "https://github.com/dinmohammadalamin",
    linkedinUrl: "https://linkedin.com/in/din-mohammad-al-amin",
    twitterUrl: "https://twitter.com",
    yearsOfExperience: "1+ Years",
    philosophy: "“To behold the Creator’s creation with open eyes, and to gift life a beautiful death.” — Din Mohammad Al Amin",
    languages: [
      "English (Native / Fluent)",
      "Bangla (Native)"
    ],
    courses: [
      "SQA (Placement Manual Testing) Course — Code Factory",
      "SQA Course — Software Testing Academy"
    ],
    additionalClubs: [
      "Robotics Society of Varendra University (03/2022) — Executive Member (A student-driven hub for learning robotics, automation, and innovation)",
      "Programming Club of Varendra University (03/2021) — Executive Member (Collaborative space for coding, algorithms, and software development)"
    ],
    reference: {
      name: "S M Alamgir Jamil",
      title: "Assistant Professor, Mental Hygiene Govt. Teachers' Training College, Rajshahi",
      phone: "01711066541",
      email: "russel.ru.psy@gmail.com",
      address: "Upashahar, A/254, P.O-Sopura, P.S-Boalia, Dist-Rajshahi"
    }
  },
  books: [
    {
      id: "book-1",
      title: "Ononto Parapar",
      bengaliTitle: "অনন্ত পারাপার",
      subtitle: "A journey into philosophical poetry, existential contemplation, and human essence",
      publisher: "Durbin Publication (দুর্বিন প্রকাশন)",
      publishedYear: "2025",
      bookFair: "অমর একুশে বইমেলা ২০২৫ (Omor Ekushe Book Fair 2025)",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
      "genre": "Poetry & Philosophy (সাহিত্য ও কাব্যগ্রন্থ)",
      "pages": "112 Pages",
      "isbn": "978-984-97210-4-2",
      "price": "৳ ২৫০ (BDT 250)",
      "language": "বাংলা (Bangla)",
      "orderUrl": "https://www.rokomari.com/book/442410/ononto-parapar",
      "featured": true,
      "description": "বই মানুষের মনের আকাশে উন্মোচন করে জ্ঞানের মুক্ত পাখা, যেখানে শব্দেরা মিশে যায় ভাবনার অসীম স্রোতে। মানুষের জীবন শব্দের আকাশের অনন্ত অন্বেষণ। এখানে কবিতা ও গদ্যের সংমিশ্রণে উঠে এসেছে প্রেম, মৃত্যু, স্বাধীনতা, এবং আত্মজিজ্ঞাসার অনুপম রূপ। শব্দেরা কখনো সান্ত্বনা দেয়, কখনো প্রশ্ন ছুঁড়ে, আর কখনো আমাদের গভীর শূন্যতার ভেতর জ্বেলে দেয় আলোর মশাল। এই কবিতাগুলো কখনো বাস্তব, কখনো কল্পনার ছোঁয়ায় মোড়া, কিন্তু প্রতিটিই আমাদের হৃদয়কে ছুঁয়ে যায়। প্রতিটি কবিতা যেন একেকটি ছবি, যেখানে অনুভূতির রং-তুলি মিলে আঁকা হয়েছে জীবনের বিচিত্র রূপ।",
      "excerpt": "আমাকে নিখুঁতভাবে দেখার সময় হলে, \nকিংবা আমার কাতরতায় \nতোমার কিঞ্চিত মায়া হলে হয়তো তুমি আমার হতে। \nএক জীবন দিয়ে ভালোবাসতে, \nআমাকে আবন্ধ করতে চির বন্ধনে। \nতবুও তুমি দেখলে না, \nশুধু আমি দেখে গেলাম\n \"তোমাকে ছোঁয়ার অতৃপ্ত বাসনা নিয়ে আমারও মৃত্যু হবে\"!"
    }
  ],
  articles: [
    {
      id: "art-2",
      title: "REST & GraphQL Contract Testing: Ensuring Zero Breaking Changes in Microservices",
      category: "API Testing",
      date: "May 2025",
      readTime: "5 min read",
      excerpt: "A comprehensive guide to automated schema validation, payload mutation tests, and rate limit resilience using Postman, Newman, and Jest.",
      content: "### Why Contract Testing Matters\nWhen multiple microservices communicate asynchronously or via RESTful gateways, unexpected schema mutations create silent cascading errors in production.\n\n### Step-by-Step Testing Strategy\n- JSON Schema validation against OpenAPI 3.0 specs.\n- Boundary analysis on query parameters and pagination offsets.\n- Chaos load testing to observe degradation thresholds.\n\n### SQA Result\nAchieved 100% coverage across core endpoints with automated regression notifications directly sent to team Slack channels.",
      coverImage: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80",
      type: "article",
      platform: "Personal",
      externalUrl: "https://www.rokomari.com/book/442410/ononto-parapar"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Book Launch & Stall at Omor Ekushe Boi Mela 2025",
      category: "Book Fair",
      imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
      date: "February 2025",
      location: "Suhrawardy Udyan, Dhaka",
      caption: "Celebrating the publication of \"Ononto Parapar\" with Durbin Publication at the grand Omor Ekushe Boi Mela with literary friends and readers.",
      featured: true
    },
    {
      id: "gal-2",
      title: "DevxHub SQA Sprints & Team Collaboration",
      category: "Tech & Work",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      date: "2025 - Present",
      location: "DevxHub Office, Rajshahi",
      caption: "Collaborating across engineering teams, conducting sprint test reviews, and maintaining zero-defect releases for enterprise SaaS products.",
      featured: true
    },
    {
      id: "gal-3",
      title: "Robotics Society & Hardware Automation Showcase",
      category: "Robotics & Campus",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      date: "March 2022",
      location: "Varendra University Campus",
      caption: "Serving as Executive Member of the Robotics Society of Varendra University, organizing technical workshops and hardware automation demos.",
      featured: true
    },
    {
      id: "gal-4",
      title: "Masters in Engineering (CSE) Research & Lab Sessions",
      category: "Robotics & Campus",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
      date: "2024",
      location: "University of Rajshahi",
      caption: "Engaging in computational research, advanced algorithm analysis, and systems verification during Masters in Engineering at RU.",
      featured: false
    },
    {
      id: "gal-5",
      title: "Literary Gathering & Reader Meetup at Boi Mela",
      category: "Book Fair",
      imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
      date: "February 2025",
      location: "Bangla Academy Premises, Dhaka",
      caption: "Signing copies of \"Ononto Parapar\" and exchanging philosophical reflections with literature lovers.",
      featured: true
    },
    {
      id: "gal-6",
      title: "Quality Assurance & Automation Workshop",
      category: "Tech & Work",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
      date: "Late 2025",
      location: "Rajshahi Tech Hub",
      caption: "Discussing the future of modern QA automation with Playwright and shift-left testing methodologies with aspiring SQA engineers.",
      featured: false
    }
  ],
  metrics: [
    {
      id: "metric-1",
      label: "Production Systems Tested",
      value: "10+",
      subtext: "SaaS, ERP, e-Commerce & AI Platforms",
      iconName: "ClipboardCheck"
    },
    {
      id: "metric-2",
      label: "Automation Suites Built",
      value: "100%",
      subtext: "Playwright E2E & API test scripts",
      iconName: "Zap"
    },
    {
      id: "metric-3",
      label: "Bugs Isolated & Tracked",
      value: "250+",
      subtext: "Jira tickets across Agile sprint cycles",
      iconName: "Bug"
    },
    {
      id: "metric-4",
      label: "Regression Flaw Rate",
      value: "0.0%",
      subtext: "Strict CI/CD & release gates at DevxHub",
      iconName: "ShieldCheck"
    }
  ],
  skills: [
    {
      id: "sk-1",
      name: "Playwright (Web Automation)",
      category: "automation",
      level: 92,
      badge: "E2E Automation"
    },
    {
      id: "sk-2",
      name: "Automation Testing Principles",
      category: "automation",
      level: 90,
      badge: "Frameworks"
    },
    {
      id: "sk-3",
      name: "Appium (Mobile Automation)",
      category: "automation",
      level: 80,
      badge: "Mobile QA"
    },
    {
      id: "sk-4",
      name: "CI/CD Automated Test Gates",
      category: "automation",
      level: 85,
      badge: "DevOps QA"
    },
    {
      id: "sk-5",
      name: "Postman & Newman CLI",
      category: "api-performance",
      level: 94,
      badge: "API Validation"
    },
    {
      id: "sk-6",
      name: "RESTful API Testing",
      category: "api-performance",
      level: 92,
      badge: "Backend QA"
    },
    {
      id: "sk-7",
      name: "Payload & Schema Validation",
      category: "api-performance",
      level: 90,
      badge: "Data Integrity"
    },
    {
      id: "sk-8",
      name: "Error Handling & Edge Cases",
      category: "api-performance",
      level: 92,
      badge: "Robustness"
    },
    {
      id: "sk-9",
      name: "Manual Testing & Execution",
      category: "manual-qa",
      level: 96,
      badge: "Core QA"
    },
    {
      id: "sk-10",
      name: "Jira (Bug Lifecycle & Tracking)",
      category: "manual-qa",
      level: 94,
      badge: "Defect Mgt"
    },
    {
      id: "sk-11",
      name: "Functional, Regression & UAT",
      category: "manual-qa",
      level: 95,
      badge: "Methodology"
    },
    {
      id: "sk-12",
      name: "ERP & Multi-tenant SaaS Testing",
      category: "manual-qa",
      level: 92,
      badge: "Enterprise"
    },
    {
      id: "sk-13",
      name: "Role-Based Access Control (RBAC)",
      category: "manual-qa",
      level: 90,
      badge: "Security QA"
    },
    {
      id: "sk-14",
      name: "SQL & Database Verification",
      category: "languages",
      level: 88,
      badge: "Data Query"
    },
    {
      id: "sk-15",
      name: "JavaScript",
      category: "languages",
      level: 85,
      badge: "Scripting"
    },
    {
      id: "sk-16",
      name: "C / C++",
      category: "languages",
      level: 82,
      badge: "Algorithms"
    },
    {
      id: "sk-17",
      name: "Python (Basic)",
      category: "languages",
      level: 75,
      badge: "Scripting"
    },
    {
      id: "sk-18",
      name: "Git & GitHub",
      category: "dev-tools",
      level: 88,
      badge: "Version Control"
    },
    {
      id: "sk-19",
      name: "Chrome DevTools & Network Logs",
      category: "dev-tools",
      level: 92,
      badge: "Debugging"
    },
    {
      id: "sk-20",
      name: "Agile Scrum & Sprint Cycles",
      category: "dev-tools",
      level: 92,
      badge: "Collaboration"
    }
  ],
  services: [
    {
      id: "srv-1",
      title: "Automated E2E Testing with Playwright",
      iconName: "Cpu",
      description: "Designing and executing stable, maintainable automation scripts with Playwright for fast regression testing and CI/CD pipelines.",
      deliverables: [
        "Deterministic Playwright test suites with auto-retries",
        "Cross-browser rendering validation (Chromium, Firefox, WebKit)",
        "Parallel execution setup in GitHub Actions",
        "Automated execution trace and video reporting on failures"
      ]
    },
    {
      id: "srv-2",
      title: "API & Backend Payload Testing",
      iconName: "Server",
      description: "Performing comprehensive API testing using Postman to validate backend functionality, data integrity, error handling, and response accuracy.",
      deliverables: [
        "Automated Postman collections with JSON assertions",
        "Data integrity and response schema contract audits",
        "Auth token lifecycles and role-based permissions",
        "Boundary value analysis on query parameters and offsets"
      ]
    },
    {
      id: "srv-3",
      title: "Manual, Regression & UAT Testing",
      iconName: "SearchCheck",
      description: "Writing and executing detailed manual test cases covering functional flows, business logic, user onboarding, and edge cases.",
      deliverables: [
        "Comprehensive Test Case Documentation & Matrices",
        "Actionable Jira bug tickets with steps to reproduce and logs",
        "Pre-release regression sign-offs across environments",
        "User Acceptance Testing (UAT) alignment with client goals"
      ]
    },
    {
      id: "srv-4",
      title: "Multi-tenant SaaS & RBAC Auditing",
      iconName: "ShieldCheck",
      description: "Specialized testing for multi-tenant SaaS platforms, complex accounting ERPs, and multi-tier role access controls.",
      deliverables: [
        "Tenant data isolation and security boundary tests",
        "Role hierarchy verification (Super Admin, Admin, Agent, User)",
        "Billing, accounting, and payroll computation verification",
        "Fraud detection and order tracking algorithm audits"
      ]
    },
    {
      id: "srv-5",
      title: "Mobile App Testing (Appium & UI)",
      iconName: "Smartphone",
      description: "Manual and automated testing across Android and iOS mobile platforms, location services, and offline modes.",
      deliverables: [
        "Appium mobile automation and manual gesture checks",
        "Geolocation & timing calculation verification (e.g. Muslim Times Pro)",
        "eSIM provisioning and wallet transaction checks",
        "Network degradation and offline caching tests"
      ]
    },
    {
      id: "srv-6",
      title: "Technical Documentation & Writing",
      iconName: "BookOpen",
      description: "Leveraging professional publication background to write crystal-clear test documentation, SOPs, bug reproduction guides, and release notes.",
      deliverables: [
        "Clear, unambiguous defect documentation for developers",
        "Standard Operating Procedures (SOP) for QA workflows",
        "Sprint-by-sprint release notes and summaries",
        "Quality metrics and executive QA summaries"
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Proofsell — E-commerce Marketplace (Grocery)",
      category: "Automation",
      description: "Executed end-to-end manual, UI, and API testing across core modules, including user onboarding, product listings, cart management, checkout, and order processing at DevxHub.",
      qaHighlights: [
        "Validated payment gateway flows and verified backend API responses for order accuracy and data consistency.",
        "Executed manual, UI, and API testing across onboarding, product listings, cart, and checkout.",
        "Caught and logged critical payment edge cases before production release."
      ],
      techStack: [
        "Manual Testing",
        "UI Testing",
        "API Testing",
        "Payment Gateway",
        "Postman"
      ],
      liveUrl: "https://proofsell.com",
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-2",
      title: "Tohobill — Inventory, Accounting & HR SaaS",
      category: "Automation",
      description: "Performed manual, UI, API testing, and developed automated test scripts using Playwright for billing, accounting, inventory, and HR/payroll workflows at DevxHub.",
      qaHighlights: [
        "Developed automated test scripts using Playwright for recurring invoice and billing workflows.",
        "Conducted functional and regression testing to ensure accurate financial calculations and smooth payroll processing.",
        "Verified multi-tier access permissions between accountants, HR staff, and company owners."
      ],
      techStack: [
        "Playwright",
        "Test Automation",
        "API Testing",
        "Accounting SaaS",
        "CI/CD"
      ],
      liveUrl: "https://tohobill.com",
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-3",
      title: "RecurringOps — Multi-tenant SaaS Platform",
      category: "Automation",
      description: "Conducted comprehensive UI, API, and Playwright test automation for multi-tenant platform features, verifying complex permissions and isolation.",
      qaHighlights: [
        "Conducted comprehensive UI, API, and Playwright test automation for multi-tenant platform features.",
        "Tested and verified complex Role-Based Access Control (RBAC) across Super Admin, Admin, and User permission levels.",
        "Audited subscription management webhooks and multi-tenant database separation."
      ],
      techStack: [
        "Playwright",
        "RBAC Testing",
        "Multi-tenant",
        "API Automation",
        "Jira"
      ],
      liveUrl: "https://recurringops.net",
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-4",
      title: "Muslim Times Pro — Islamic Prayer & Quran App",
      category: "API Testing",
      description: "Performed manual, API, and UI testing for key features, including prayer time algorithms, Quran audio/text modules, Qibla direction finder, and location-based mosque locator.",
      qaHighlights: [
        "Ensured data accuracy of API endpoints providing location and timing metrics.",
        "Validated astronomical prayer time algorithms against international Islamic calculation standards.",
        "Tested audio streaming stability and offline verse caching."
      ],
      techStack: [
        "API Testing",
        "Location APIs",
        "Mobile UI QA",
        "Postman",
        "Audio QA"
      ],
      liveUrl: "https://muslimtimespro.com",
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-5",
      title: "Belltex — E-commerce Platform (Clothing)",
      category: "Web & PWA",
      description: "Tested product catalog responsiveness, cross-browser UI rendering, cart functionality, and secure checkout workflows.",
      qaHighlights: [
        "Verified RESTful APIs to ensure seamless frontend-backend integration during product filtering and order submission.",
        "Tested product catalog responsiveness and cross-browser UI rendering on desktop and mobile viewports.",
        "Checked discount coupon calculations, inventory reservations, and customer notifications."
      ],
      techStack: [
        "E-commerce QA",
        "RESTful APIs",
        "Cross-browser QA",
        "Cart Workflows"
      ],
      liveUrl: "https://belltexbd.com",
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: "proj-6",
      title: "247eSIM — eSIM Selling Platform & App",
      category: "Automation",
      description: "Executed manual, API, and UI testing across mobile and web interfaces for international eSIM ordering and activation.",
      qaHighlights: [
        "Validated access controls and workflows across multiple user hierarchy roles: Admin, Agent, Sub-agent, and User.",
        "Executed manual, API, and UI testing across mobile and web interfaces.",
        "Tested QR code delivery, payment gateway reconciliation, and carrier provisioning status."
      ],
      techStack: [
        "Appium",
        "Manual QA",
        "API Testing",
        "Hierarchy RBAC",
        "Mobile QA"
      ],
      liveUrl: "https://247esim.com",
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: "proj-7",
      title: "Jaachai — Online Fraud Order Tracking Platform",
      category: "API Testing",
      description: "Conducted API and UI testing to validate order tracking algorithms and fraud-detection logic to protect merchants from fraudulent orders.",
      qaHighlights: [
        "Conducted API and UI testing to validate order tracking algorithms and fraud-detection logic.",
        "Ensured proper error handling, input validation, and reliable reporting mechanisms.",
        "Verified return-ratio calculations, suspicious IP tracking, and customer blacklisting sync."
      ],
      techStack: [
        "Fraud Detection QA",
        "API Testing",
        "Input Validation",
        "SQL",
        "Postman"
      ],
      liveUrl: "https://jaachai.com",
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: "proj-8",
      title: "Artca — Online Art Gallery Platform",
      category: "Web & PWA",
      description: "Performed staging environment UI testing, cross-device layout verification, and API functional testing for a modern digital art exhibition site.",
      qaHighlights: [
        "Identified and logged edge-case bugs related to media uploads, gallery rendering, and responsive design.",
        "Performed staging environment UI testing and cross-device layout verification.",
        "Validated image compression thresholds and artist profile bio editing."
      ],
      techStack: [
        "UI Testing",
        "Staging QA",
        "Media Uploads",
        "Responsive QA",
        "Jira"
      ],
      liveUrl: "https://artca-online.netlify.app",
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: "proj-9",
      title: "Online Job Bid Website",
      category: "Web & PWA",
      description: "Tested user workflows for job posting, bidding mechanisms, profile management, and notification services.",
      qaHighlights: [
        "Tested user workflows for job posting, bidding mechanisms, profile management, and notification services.",
        "Validated API endpoints for data accuracy and edge-case handling on input fields.",
        "Ensured proposal submission deadline validation and applicant messaging security."
      ],
      techStack: [
        "Workflow Testing",
        "API Functional Testing",
        "Edge-case Handling",
        "UI Testing"
      ],
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: "proj-10",
      title: "AI Agent Platform",
      category: "API Testing",
      description: "Performed API, manual, and UI testing to evaluate AI response formatting, prompt input validation, and system integration.",
      qaHighlights: [
        "Performed API, manual, and UI testing to evaluate AI response formatting, prompt input validation, and system integration.",
        "Verified backend payload delivery and conversational workflow stability under various user inputs.",
        "Tested streaming token latency and timeout recovery mechanisms."
      ],
      techStack: [
        "AI Testing",
        "API Testing",
        "Prompt Validation",
        "System Integration",
        "Postman"
      ],
      githubUrl: "https://github.com/dinmohammadalamin",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "SQA Engineer (L-1)",
      company: "DevxHub Private Ltd.",
      period: "11/2025 - Present",
      location: "Rajshahi, Bangladesh",
      description: "Handling comprehensive manual and automated software quality assurance across web applications, multi-tenant SaaS platforms, ERPs, and client enterprise solutions.",
      achievements: [
        "Write and execute detailed manual test cases covering functional, regression, and UAT scenarios.",
        "Design and maintain automation test scripts using Playwright for web application testing.",
        "Perform API testing to validate backend functionality, data integrity, and response accuracy.",
        "Conduct regression testing across releases to ensure new changes do not break existing functionality.",
        "Identify, log, and track bugs, working closely with developers to verify fixes.",
        "Participate in sprint planning, stand-ups, and retrospectives, ensuring QA coverage within Agile delivery cycles.",
        "Performed manual and automation testing on an ERP (Enterprise Resource Planning) system, along with several other confidential client/company projects."
      ],
      type: "work"
    },
    {
      id: "exp-2",
      role: "Writer",
      company: "Durbin Publication",
      period: "06/2024 - Present",
      location: "Dhaka / Rajshahi, Bangladesh",
      description: "Author of published literature including \"Ononto Parapar\", demonstrating exceptional discipline in precise writing and structured articulation.",
      achievements: [
        "Authored and published the acclaimed book \"Ononto Parapar\" with Durbin Publication at the Omor Ekushe Book Fair.",
        "Developed rigorous observational habits, structured narrative clarity, and linguistic precision that directly enhance technical bug reporting.",
        "Bridged the mindset of creative conciseness with the disciplined logic required for boundary-value software testing."
      ],
      type: "creative"
    },
    {
      id: "exp-3",
      role: "Digital Learning Resource Developer",
      company: "Jubayer Math",
      period: "02/2025 - 06/2025",
      location: "Rajshahi, Bangladesh",
      description: "Engineered digital mathematical learning resources, interactive algorithmic exercises, and problem-solving platforms.",
      achievements: [
        "Built interactive mathematical worksheets and validated computational accuracy across diverse problem sets.",
        "Tested educational software tools for cross-device usability and responsive rendering.",
        "Collaborated on digital curriculum engineering for high-school and university prep students."
      ],
      type: "work"
    },
    {
      id: "exp-4",
      role: "Teacher",
      company: "Headman English Academy",
      period: "12/2024 - 05/2025",
      location: "Rajshahi, Bangladesh",
      description: "Taught English language communication, grammatical mechanics, and analytical comprehension to learners.",
      achievements: [
        "Conducted structured interactive classes for language learners, focusing on clarity and structured communication.",
        "Designed targeted assessments and tracked student progress through systematic feedback.",
        "Refined cross-functional presentation and documentation skills."
      ],
      type: "work"
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Masters in Eng (CSE)",
      institution: "University of Rajshahi",
      period: "2024 - 2025",
      location: "Rajshahi, Bangladesh",
      grade: "CGPA: 3.15 / 4.00",
      description: "Advanced postgraduate engineering degree in Computer Science & Engineering with specialized research in software engineering and advanced automated systems."
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science (B.Sc in CSE)",
      institution: "Varendra University",
      period: "2020 - 2024",
      location: "Rajshahi, Bangladesh",
      grade: "CGPA: 3.30 / 4.00",
      description: "Four-year undergraduate degree in Computer Science & Engineering covering Software Testing, Data Structures, Algorithms, Database Systems, and Object-Oriented Design."
    },
    {
      id: "edu-3",
      degree: "Higher Secondary Certificate (HSC) - Science",
      institution: "Agrani School And College",
      period: "2016 - 2018",
      location: "Rajshahi, Bangladesh",
      grade: "GPA: 4.17 / 5.00",
      description: "Higher Secondary education majoring in Science with strong foundations in Higher Mathematics and Physics."
    },
    {
      id: "edu-1789848471403",
      degree: "SSC",
      institution: "Rosulpur High School",
      period: "2016",
      location: "Rajshahi",
      description: "Secondary education majoring in Science with strong foundations in Higher Mathematics and Physics."
    }
  ],
  messages: [
    {
      id: "msg-demo-1",
      name: "DevxHub Lead",
      email: "team@devxhub.com",
      subject: "Great work on Proofsell & Tohobill QA releases",
      message: "Hello Din! Your manual test coverage and Playwright automation scripts have significantly boosted release confidence for our multi-tenant SaaS clients.",
      createdAt: "2026-09-18 10:15",
      read: true
    }
  ],
  adminPin: "106766",
  adminPassword: "106766"
};
