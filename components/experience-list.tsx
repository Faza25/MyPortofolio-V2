import { experiences } from "@/data/about";

export function ExperienceList() {
  return (
    <section className="px-5 py-16 sm:py-24" aria-labelledby="experience-title">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-brand-600">Di luar kelas</p>
        <h2 id="experience-title" className="mt-2 text-3xl font-bold text-brand-950">Pengalaman</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {experiences.map((experience) => (
            <article className="flex flex-col rounded-3xl border border-blue-100 bg-white p-6 shadow-sm" key={`${experience.organization}-${experience.role}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{experience.type}</span>
                <span className="text-xs font-semibold text-slate-400">{experience.period}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-brand-950">{experience.role}</h3>
              <p className="mt-1 font-semibold text-brand-600">{experience.organization}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                {experience.highlights.map((highlight) => <li className="flex gap-3" key={highlight}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />{highlight}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
