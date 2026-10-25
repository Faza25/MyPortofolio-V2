import type { Metadata } from "next";
import { Header } from "@/components/header";
import { SkillList } from "@/components/skill-list";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Skill | Zaast.ID", description: "Keahlian dan perangkat kerja Muhammad Faza Qowamudin." };

export default function Page() {
  return <><Header /><main id="main-content"><SkillList standalone /></main><SiteFooter /></>;
}
