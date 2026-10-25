"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { featuredProjects, type FeaturedProject } from "@/data/home";

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] =
    useState<FeaturedProject | null>(null);

  useEffect(() => {
    if (!selectedProject) return;
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && setSelectedProject(null);
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="proyek-unggulan" className="scroll-mt-20 px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-brand-600">Pilihan terbaik</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
            Proyek unggulan
          </h2>
          <a
            className="font-semibold text-brand-600 hover:text-brand-700"
            href="#galeri-proyek"
          >
            Lihat semua proyek ↓
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
            >
              <button
                className={`relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent}`}
                onClick={() => setSelectedProject(project)}
                aria-label={`Lihat detail ${project.title}`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`Tampilan dashboard ${project.title}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-5xl font-bold text-white/90 transition group-hover:scale-110">
                    {project.title.charAt(0)}
                  </span>
                )}
              </button>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-brand-600">
                    {project.category}
                  </p>
                  <span className="text-xs font-medium text-slate-400">
                    {project.year}
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-brand-950">
                  {project.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {project.description}
                </p>
                <button
                  className="mt-5 font-semibold text-brand-700 hover:text-brand-600"
                  onClick={() => setSelectedProject(project)}
                >
                  Lihat detail →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-950/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setSelectedProject(null)
          }
        >
          <section
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
          >
            <div className={`relative flex aspect-[16/7] items-center justify-center overflow-hidden bg-gradient-to-br ${selectedProject.accent}`}>
              {selectedProject.image ? (
                <Image
                  src={selectedProject.image}
                  alt={`Tampilan lengkap dashboard ${selectedProject.title}`}
                  fill
                  sizes="672px"
                  className="object-cover object-center"
                />
              ) : (
                <span className="text-7xl font-bold text-white/90">
                  {selectedProject.title.charAt(0)}
                </span>
              )}
              <button
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-brand-950 shadow"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup detail proyek"
              >
                ×
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-semibold text-brand-600">
                {selectedProject.category} · {selectedProject.year}
              </p>
              <h3
                id="project-dialog-title"
                className="mt-2 text-3xl font-bold text-brand-950"
              >
                {selectedProject.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                {selectedProject.detail}
              </p>
              <ul
                className="mt-6 flex flex-wrap gap-2"
                aria-label="Teknologi yang digunakan"
              >
                {selectedProject.technologies.map((technology) => (
                  <li
                    className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700"
                    key={technology}
                  >
                    {technology}
                  </li>
                ))}
              </ul>
              <a
                className="mt-8 inline-flex rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Kunjungi proyek ↗
              </a>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
