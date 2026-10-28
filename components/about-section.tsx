import { education, experiences, personalInfo } from "@/data/about";

export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      id="tentang"
      className="section-block about-section"
      aria-labelledby="about-title"
    >
      <div className="page-container">
        <div className="section-heading">
          <div>
            <Heading id="about-title">
              Rasa ingin tahu.
              <br />
              <span>Langkah yang nyata.</span>
            </Heading>
          </div>
          <p>
            Di balik setiap proyek, ada proses belajar, eksplorasi, dan
            keinginan untuk membuat sesuatu yang bermanfaat.
          </p>
        </div>
        <div className="about-intro">
          <div className="about-story">
            {personalInfo.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <dl className="profile-facts">
              {personalInfo.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="career-panel">
            <h3>Teknologi yang punya dampak.</h3>
            <p>{personalInfo.goal}</p>
            <div className="career-interests">
              {personalInfo.interests.map((interest) => (
                <span key={interest}>{interest}</span>
              ))}
            </div>
          </aside>
        </div>
        <div className="journey-grid">
          <div>
            <div className="subsection-heading">
              <h3>Pendidikan</h3>
              <span className="muted">Fondasi perjalanan</span>
            </div>
            <ol className="education-list">
              {education.map((item) => (
                <li key={item.institution}>
                  <span className="timeline-dot" />
                  <p className="period">{item.period}</p>
                  <h4>{item.institution}</h4>
                  <p className="degree">{item.degree}</p>
                  <p className="entry-description">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="subsection-heading">
              <h3>Pengalaman</h3>
              <span className="muted">Belajar lewat praktik</span>
            </div>
            <div className="experience-list">
              {experiences.map((item) => (
                <article key={item.organization + item.role}>
                  <div className="experience-meta">
                    <span className="tag">{item.type}</span>
                    <span className="period">{item.period}</span>
                  </div>
                  <h4>{item.role}</h4>
                  <p className="degree">{item.organization}</p>
                  <ul>
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
