import { Header } from "@/components/header";
import { ProfileHero } from "@/components/profile-hero";
import { ProjectGallery } from "@/components/project-gallery";
import { AboutSection } from "@/components/about-section";
import { SkillList } from "@/components/skill-list";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return <><Header /><main id="main-content"><ProfileHero /><AboutSection /><ProjectGallery /><SkillList /><ContactSection /></main><SiteFooter /></>;
}
