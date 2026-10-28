import { UiIcon } from "@/components/ui-icon";
import skillCategories from "@/data/skills.json";
import proficiencyLevels from "@/data/proficiency.json";

export function SkillList({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="skill" className="section-block skills-section" aria-labelledby="skill-title">
      <div className="page-container">
        <div className="section-heading"><div><Heading id="skill-title">Bekal untuk<br /><span>membangun lebih baik.</span></Heading></div><p>Bahasa, framework, dan perangkat yang saya gunakan dalam proses belajar dan pengembangan proyek.</p></div>
        <div className="skills-grid">{skillCategories.map((category) => <article className="skill-category" key={category.id}><h3><UiIcon name="code" />{category.title}</h3><p className="category-description">{category.description}</p><ul className="skill-rows">{category.skills.map((skill) => <li key={skill.name}><div className="skill-row-top"><strong>{skill.name}</strong><span title={proficiencyLevels[skill.level as keyof typeof proficiencyLevels]?.description}>{skill.level}</span></div><p>{skill.summary}</p><div className="skill-meter" role="progressbar" aria-label={"Kemahiran " + skill.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.proficiency} aria-valuetext={skill.level}><span style={{ width: skill.proficiency + "%" }} /></div></li>)}</ul></article>)}</div>
        <div className="skills-footnote"><span className="status-dot" />Kemahiran berdasarkan penilaian pribadi dan pengalaman proyek. Terus belajar, terus berkembang.</div>
      </div>
    </section>
  );
}
