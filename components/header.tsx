"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { UiIcon } from "@/components/ui-icon";

const navigation = [
  { label: "Beranda", id: "beranda", route: "/" },
  { label: "Tentang", id: "tentang", route: "/about" },
  { label: "Proyek", id: "proyek", route: "/projects" },
  { label: "Skill", id: "skill", route: "/skills" },
  { label: "Kontak", id: "kontak", route: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setIsScrolled(window.scrollY > 24);
        if (pathname !== "/") return;
        let current = "beranda";
        for (const item of navigation) {
          const section = document.getElementById(item.id);
          if (section && section.getBoundingClientRect().top <= 160) current = item.id;
        }
        if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) current = "kontak";
        setActiveSection(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!mobileMenuRef.current?.contains(event.target as Node)) mobileMenuRef.current?.removeAttribute("open");
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuRef.current?.open) {
        mobileMenuRef.current.removeAttribute("open");
        mobileMenuRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const isActive = (item: typeof navigation[number]) => pathname === "/" ? item.id === activeSection : pathname === item.route;
  const menu = navigation.map((item) => (
    <li key={item.id}>
      <a className={isActive(item) ? "nav-link is-active" : "nav-link"} href={"/#" + item.id}
        aria-current={isActive(item) ? (pathname === "/" ? "location" : "page") : undefined}
        onClick={() => { mobileMenuRef.current?.removeAttribute("open"); }}>
        {item.label}
      </a>
    </li>
  ));

  return (
    <header className={"site-header" + (isScrolled ? " is-scrolled" : "")}>
      <nav className="nav-shell" aria-label="Navigasi utama">
        <a className="wordmark" href="/#beranda" aria-label="Zaast.ID — kembali ke beranda">
          <span className="brand-symbol" aria-hidden="true">z.</span> Zaast<span className="brand-dot">.ID</span>
        </a>
        <ul className="desktop-menu">{menu}</ul>
        <details ref={mobileMenuRef} className="mobile-menu">
          <summary>Menu <UiIcon name="plus" className="menu-toggle" /></summary>
          <ul className="mobile-menu-panel">{menu}</ul>
        </details>
      </nav>
    </header>
  );
}
