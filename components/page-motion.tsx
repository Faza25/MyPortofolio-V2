"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
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
    const animations = new Set<gsap.core.Animation>();
    const context = gsap.context(() => {});
    const floats: gsap.core.Tween[] = [];
    const hero = document.querySelector<HTMLElement>(".hero-visual");
    let heroVisible = false;
    const style = getComputedStyle(document.documentElement);
    const duration = parseFloat(style.getPropertyValue("--motion-entrance")) || 560;
    const stagger = parseFloat(style.getPropertyValue("--motion-stagger")) || 90;
    context.add(() => {
      document.querySelectorAll(".hero-sticker").forEach((sticker) => {
        const isStar = sticker.classList.contains("star-sticker");
        floats.push(gsap.to(sticker, isStar ? {
          rotation: "+=360", transformOrigin: "50% 50%",
          duration: 16, repeat: -1, ease: "none", paused: true,
        } : {
          y: -4, rotation: 5,
          duration: 1.9, repeat: -1, yoyo: true,
          ease: "sine.inOut", paused: true,
        }));
      });
    });
    const reveal = (element: Element, delay = 0) => {
      if (seen.current.has(element)) return;
      seen.current.add(element);
      context.add(() => {
        const animation = gsap.fromTo(element,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: duration / 1000, delay: delay / 1000,
            ease: "expo.out", clearProps: "opacity,transform",
            onComplete: () => { animations.delete(animation); },
          });
        animations.add(animation);
      });
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
    document.querySelectorAll(".section-block > .page-container").forEach((element) => {
      // Avoid animating a parent and its skill/timeline children simultaneously.
      if (!element.querySelector(".skill-meter, .education-list")) sections.observe(element);
    });
    const details = new IntersectionObserver((entries) => {
      let educationIndex = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting || document.hidden) continue;
        details.unobserve(entry.target);
        if (seen.current.has(entry.target)) continue;
        seen.current.add(entry.target);
        context.add(() => {
          const sequence = gsap.timeline({
            onComplete: () => { animations.delete(sequence); },
          });
          animations.add(sequence);
          if (entry.target.matches(".skill-meter")) {
            sequence.fromTo(entry.target.querySelector("span"),
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: 0.85, ease: "power3.out", clearProps: "transform,transformOrigin" });
          } else {
            sequence.delay(Math.min(educationIndex++ * 0.12, 0.36));
            sequence.fromTo(entry.target.querySelector(".timeline-line"),
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, duration: 0.65, ease: "power2.out", clearProps: "transform,transformOrigin" });
            sequence.fromTo(entry.target.querySelectorAll("p, h4"),
              { opacity: 0, x: 10 },
              { opacity: 1, x: 0, duration: 0.45, stagger: 0.06, ease: "power3.out", clearProps: "opacity,transform" }, 0.1);
            sequence.fromTo(entry.target.querySelector(".timeline-dot"),
              { scale: 0.5 },
              { scale: 1, duration: 0.3, ease: "power2.out", clearProps: "transform" }, 0);
          }
        });
      }
    }, { threshold: 0.15 });
    document.querySelectorAll(".skill-meter, .education-list > li").forEach((element) => details.observe(element));
    const updateVisibility = () => {
      floats.forEach((animation) => {
        if (heroVisible && !document.hidden) animation.resume();
        else animation.pause();
      });
      if (document.hidden) animations.forEach((animation) => animation.progress(1));
      else document.querySelectorAll(".skill-meter, .education-list > li").forEach((element) => {
        if (!seen.current.has(element)) {
          details.unobserve(element);
          details.observe(element);
        }
      });
    };
    const stickers = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updateVisibility();
    });
    if (hero) stickers.observe(hero);
    const revealFocus = () => animations.forEach((animation) => animation.progress(1));
    document.addEventListener("visibilitychange", updateVisibility);
    document.addEventListener("focusin", revealFocus);
    return () => {
      sections.disconnect();
      details.disconnect();
      stickers.disconnect();
      context.revert();
      if (hero) delete hero.dataset.motion;
      document.removeEventListener("visibilitychange", updateVisibility);
      document.removeEventListener("focusin", revealFocus);
    };
  }, [pathname, paused, reduced]);

  return <button className="motion-control" type="button" disabled={reduced} aria-pressed={paused}
    onClick={() => setPaused((value) => !value)}
    title="Mengatur animasi stiker, konten, progres skill, dan timeline pendidikan.">
    <UiIcon name={paused || reduced ? "play" : "pause"} />
    {reduced ? "Gerakan dikurangi" : paused ? "Lanjutkan gerakan" : "Jeda gerakan"}
  </button>;
}
