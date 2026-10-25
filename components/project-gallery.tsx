"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { UiIcon } from "@/components/ui-icon";

const categories = ["Semua", "Web", "Mobile", "Desain"] as const;

export function ProjectGallery({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const [category, setCategory] = useState<typeof categories[number]>("Semua");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleProjects = projects.filter((project) => category === "Semua" || project.category === category);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <section id="proyek" className="section-block projects-section" aria-labelledby="projects-title">
      <div className="page-container">
        <div className="section-heading"><div><Heading id="projects-title">Dari ide.<br /><span>Menjadi karya.</span></Heading></div><p>Eksplorasi dan proyek yang menggambarkan cara saya menyelesaikan masalah melalui teknologi.</p></div>
        <div className="project-toolbar"><div className="filter-group" aria-label="Filter kategori proyek">{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} className={"filter-button" + (category === item ? " is-active" : "")} onClick={() => setCategory(item)}>{item}</button>)}</div><p className="project-count" aria-live="polite">{visibleProjects.length} proyek ditampilkan</p></div>
        <div className="project-grid">
          {visibleProjects.map((project) => {
            const comingSoon = project.image.includes("comingsoon");
            return <article className={"project-card" + (comingSoon ? " project-pending" : " project-showcase")} key={project.id}>
              <button className="project-preview" type="button" onClick={() => setSelected(project)} aria-label={"Lihat detail " + project.title}>
                <Image src={project.image} alt={comingSoon ? project.title + " — segera hadir" : "Dashboard " + project.title} fill sizes={comingSoon ? "(min-width: 760px) 560px, 90vw" : "(min-width: 760px) 720px, 90vw"} className={comingSoon ? "project-image coming-soon-image" : "project-image"} />
                <span className="project-open"><UiIcon name="arrow-up-right" /></span>
              </button>
              <div className="project-card-body"><div className="project-meta"><span>{project.category} / {project.year}</span><span className="project-status">{comingSoon ? "Dalam pengembangan" : "Web application"}</span></div><h3><button type="button" className="project-title" onClick={() => setSelected(project)}>{project.title}<UiIcon name="arrow-up-right" /></button></h3><p>{project.description}</p><ul className="technology-list" aria-label={"Teknologi " + project.title}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul><button type="button" className="project-detail-link" onClick={() => setSelected(project)}>Lihat detail <UiIcon name="arrow-right" /></button></div>
            </article>;
          })}
        </div>
        {visibleProjects.length === 0 && <div className="empty-state"><h3>Belum ada proyek di kategori ini.</h3><p>Karya baru akan ditambahkan di sini.</p><button className="button button-secondary" onClick={() => setCategory("Semua")}>Lihat semua proyek</button></div>}
      </div>
      <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onClose={() => setSelected(null)} onCancel={() => setSelected(null)} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) setSelected(null);
      }}>
        {selected && <><div className="dialog-image"><Image src={selected.image} alt={"Pratinjau " + selected.title} width={1920} height={1080} sizes="(max-width: 800px) 95vw, 780px" /><button className="dialog-close" type="button" onClick={() => setSelected(null)} aria-label="Tutup detail proyek" autoFocus><UiIcon name="close" /></button></div><div className="dialog-body"><h2 id="project-dialog-title">{selected.title}</h2><p className="dialog-meta">{selected.category} / {selected.year}</p><p>{selected.detail === "#" ? "Detail proyek akan tersedia setelah pengembangan selesai." : selected.detail}</p><ul className="technology-list">{selected.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul><a className="button button-primary" href={selected.link} target="_blank" rel="noopener noreferrer">Kunjungi proyek <UiIcon name="arrow-up-right" /></a></div></>}
      </dialog>
    </section>
  );
}
