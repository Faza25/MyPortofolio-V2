import { education } from "@/data/about";

export function EducationTimeline() {
  return (
    <section className="border-y border-blue-100/70 bg-white/45 px-5 py-16 sm:py-24" aria-labelledby="education-title">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-brand-600">Perjalanan akademik</p>
        <h2 id="education-title" className="mt-2 text-3xl font-bold text-brand-950">Riwayat pendidikan</h2>
        <ol className="relative mt-10 space-y-8 border-l-2 border-blue-200 pl-7 sm:pl-10">
          {education.map((item) => (
            <li key={item.institution} className="relative rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">
              <span className="absolute -left-[2.15rem] top-8 h-4 w-4 rounded-full border-4 border-white bg-brand-600 ring-2 ring-blue-200 sm:-left-[2.75rem]" aria-hidden="true" />
              <p className="text-sm font-bold text-brand-600">{item.period}</p>
              <h3 className="mt-2 text-xl font-bold text-brand-950">{item.degree}</h3>
              <p className="mt-1 font-semibold text-slate-500">{item.institution}</p>
              <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
