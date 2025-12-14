import React from 'react'
import HeroSection from './heroSection/HeroSection'
import AboutSection from './aboutSection/AboutSection'
import SkillSection from '@/components/portfolio/skillSection/SkillSection';
import EducationSection from './educationSection/EducationSection';
import ProjectSection from './projectSection/ProjectSection';
import AchievementSection from '@/components/portfolio/achievementSection/AchievementSection';
import ServiceSection from '@/components/portfolio/serviceSection/ServiceSection';
import BlogSection from '@/components/portfolio/blogSection/BlogSection';
import ContactSection from './contactSection/ContactSection';
import CertificationSection from "@/components/portfolio/certificationSection/CertificationSection";
import ExperienceSection from "./experienceSection/ExperienceSection";

export default  function PortfolioContent() {
  return (
		<>
			<HeroSection />
			<AboutSection />
			<SkillSection />
            <ExperienceSection />
			<EducationSection />
			<ProjectSection />
			<CertificationSection />
			<AchievementSection />
            <ServiceSection />
            <BlogSection />
			<ContactSection />
		</>
	);
}
