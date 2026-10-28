import { profile } from "@/data/home";
import { UiIcon } from "@/components/ui-icon";
import { PageMotion } from "@/components/page-motion";

export function SiteFooter() {
  return <footer className="site-footer"><div className="page-container footer-inner"><a className="wordmark" href="/#beranda">Zaast<span className="brand-dot">.ID</span></a><p>© {new Date().getFullYear()} {profile.name}.</p><PageMotion /><a className="back-to-top" href="/#beranda">Kembali ke atas <UiIcon name="arrow-up" /></a></div></footer>;
}
