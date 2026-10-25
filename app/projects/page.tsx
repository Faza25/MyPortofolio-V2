import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ProjectGallery } from "@/components/project-gallery";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Proyek | Zaast.ID", description: "Kumpulan proyek dan eksplorasi Muhammad Faza Qowamudin." };

export default function Page() {
  return <><Header /><main id="main-content"><ProjectGallery standalone /></main><SiteFooter /></>;
}
