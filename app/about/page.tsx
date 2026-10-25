import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AboutSection } from "@/components/about-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Tentang Saya | Zaast.ID", description: "Profil, pendidikan, dan perjalanan Muhammad Faza Qowamudin." };

export default function Page() {
  return <><Header /><main id="main-content"><AboutSection standalone /></main><SiteFooter /></>;
}
