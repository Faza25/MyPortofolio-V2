import { personalInfo } from "@/data/about";

export function PersonalInfo() {
  return (
    <section id="tentang" className="scroll-mt-20 px-5 py-16 sm:py-24" aria-labelledby="personal-info-title">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="font-semibold text-brand-600">Cerita singkat</p>
          <h2 id="personal-info-title" className="mt-2 text-3xl font-bold text-brand-950">Mengenal saya lebih dekat</h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-slate-600 sm:text-lg">
            {personalInfo.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <h3 className="mt-9 text-lg font-bold text-brand-950">Hal yang saya minati</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {personalInfo.interests.map((interest) => <li className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700" key={interest}>{interest}</li>)}
          </ul>
        </div>

        <aside className="rounded-3xl bg-brand-950 p-7 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">Tujuan profesional</p>
          <p className="mt-4 text-xl font-semibold leading-8">{personalInfo.goal}</p>
          <dl className="mt-8 divide-y divide-white/10 border-t border-white/10">
            {personalInfo.facts.map((fact) => (
              <div className="grid grid-cols-[.7fr_1.3fr] gap-3 py-4 text-sm" key={fact.label}>
                <dt className="text-blue-200">{fact.label}</dt><dd className="font-semibold text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
