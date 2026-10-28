"use client";

import { useEffect, useRef, useState } from "react";
import { UiIcon } from "@/components/ui-icon";

export function ProfileTitles({ titles }: { titles: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ index: 0, length: titles[0]?.length ?? 0, deleting: false });
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  const [paused, setPaused] = useState(false);
  const title = titles[frame.index] ?? "";
  const running = titles.length > 1 && !reducedMotion && visible && tabActive && !paused;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setTabActive(!document.hidden);
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const delay = frame.deleting ? (frame.length === 0 ? 300 : 40) : (frame.length === title.length ? 2200 : 85);
    const timer = window.setTimeout(() => {
      setFrame((current) => {
        if (current.deleting) {
          return current.length === 0
            ? { index: (current.index + 1) % titles.length, length: 0, deleting: false }
            : { ...current, length: current.length - 1 };
        }
        return current.length === title.length
          ? { ...current, deleting: true }
          : { ...current, length: current.length + 1 };
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [frame, running, title, titles.length]);

  return (
    <div className="profile-titles" ref={containerRef}>
      <span className="sr-only">{titles.join(" dan ")}</span>
      <span className="profile-titles-text" aria-hidden="true">
        <span className="profile-titles-reserve">{titles.map((item) => <span key={item}>{item}</span>)}</span>
        <span className="profile-titles-output">
          {reducedMotion || titles.length < 2 ? titles.join(" · ") : title.slice(0, frame.length)}
          {!reducedMotion && titles.length > 1 && <span className="typing-caret" data-running={running} />}
        </span>
      </span>
      {!reducedMotion && titles.length > 1 && <button
        type="button"
        className="typing-toggle"
        aria-label={paused ? "Lanjutkan animasi title" : "Jeda animasi title"}
        title={paused ? "Lanjutkan animasi title" : "Jeda animasi title"}
        onClick={() => setPaused((value) => !value)}
      ><UiIcon name={paused ? "play" : "pause"} /></button>}
    </div>
  );
}
