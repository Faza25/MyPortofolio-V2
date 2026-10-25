import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Kontak | Zaast.ID", description: "Hubungi Muhammad Faza Qowamudin untuk berdiskusi dan berkolaborasi." };

export default function Page() {
  return <><Header /><main id="main-content"><ContactSection standalone /></main><SiteFooter /></>;
}
