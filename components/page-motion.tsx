"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { UiIcon } from "@/components/ui-icon";

/** Progressive enhancement: server-rendered content is always visible. */
export function PageMotion() {
  const pathname = usePathname();
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const seen = useRef(new WeakSet<Element>());

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || paused || !("IntersectionObserver" in window)) return;
    const animations = new Set<Animation>();
    const hero = document.querySelector<HTMLElement>(".hero-visual");
    let heroVisible = false;
    const style = getComputedStyle(document.documentElement);
    const duration = parseFloat(style.getPropertyValue("--motion-entrance")) || 560;
    const stagger = parseFloat(style.getPropertyValue("--motion-stagger")) || 90;
    const easing = style.getPropertyValue("--ease").trim();
    const reveal = (element: Element, delay = 0) => {
      if (seen.current.has(element) || !element.animate) return;
      seen.current.add(element);
      const animation = element.animate([
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration, delay, easing, fill: "backwards" });
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
    };
    // Only the identity introduction is staggered; the photograph stays anchored.
    const introduction = document.querySelector(".hero-copy");
    if (introduction && introduction.getBoundingClientRect().bottom > 0 && introduction.getBoundingClientRect().top < innerHeight) {
      introduction.querySelectorAll(".hero-greeting, h1, .profile-titles, .hero-tagline, .hero-description, .button-row").forEach((element, index) => reveal(element, index * stagger));
    }
    const sections = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        sections.unobserve(entry.target);
      }
    }, { threshold: 0.06 });
    document.querySelectorAll(".section-block > .page-container").forEach((element) => sections.observe(element));
    const updateVisibility = () => {
      if (hero) hero.dataset.motion = heroVisible && !document.hidden ? "running" : "paused";
      if (document.hidden) animations.forEach((animation) => animation.finish());
    };
    const stickers = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updateVisibility();
    });
    if (hero) stickers.observe(hero);
    const revealFocus = () => animations.forEach((animation) => animation.finish());
    document.addEventListener("visibilitychange", updateVisibility);
    document.addEventListener("focusin", revealFocus);
    return () => {
      sections.disconnect();
      stickers.disconnect();
      animations.forEach((animation) => animation.cancel());
      if (hero) delete hero.dataset.motion;
      document.removeEventListener("visibilitychange", updateVisibility);
      document.removeEventListener("focusin", revealFocus);
    };
  }, [pathname, paused, reduced]);

  return <button className="motion-control" type="button" disabled={reduced} aria-pressed={paused}
    onClick={() => setPaused((value) => !value)}
    title="Mengatur gerakan stiker dan kemunculan konten. Animasi teks memiliki kontrol tersendiri.">
    <UiIcon name={paused || reduced ? "play" : "pause"} />
    {reduced ? "Gerakan dikurangi" : paused ? "Lanjutkan gerakan" : "Jeda gerakan"}
  </button>;
}
