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
              <br />
              <span>Tentang Saya</span>
            </Heading>
          </div>
          <p>
            Di balik setiap proyek, ada proses belajar, eksplorasi, dan
            keinginan untuk membuat sesuatu yang bermanfaat.
          </p>
        </div>
        <div className="about-intro">
          <article className="about-story" aria-labelledby="story-title">
            <h3 id="story-title">Cerita saya</h3>
            <div className="about-story-copy">
              {personalInfo.story.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? "story-lead" : undefined}>{paragraph}</p>
              ))}
            </div>
            <dl className="profile-facts">
              {personalInfo.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </article>
          <aside className="career-panel">
            <h3>Motivasi</h3>
            <p>Terus belajar dan mengeksplorasi teknologi, memperkuat keterampilan, serta mendalami pemrograman untuk membuat sesuatu yang bermanfaat.</p>
            <div className="career-interest-group">
              <h4>Bidang yang diminati</h4>
              <ul className="career-interests">
                {personalInfo.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>
            <div className="motivation-decoration" aria-hidden="true">
              <svg viewBox="0 0 320 120" fill="none">
                <path d="M16 106h288" stroke="#b9a775" strokeWidth="1.5" />
                <path d="M42 106V84h64v22" fill="#ffdbd6" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
                <path d="M106 106V60h64v46" fill="#e8efff" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
                <path d="M170 106V36h64v70" fill="#4778e7" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
                <path d="m256 8 6 17 17 6-17 6-6 17-6-17-17-6 17-6Z" fill="#fff" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="61" cy="49" r="5" fill="#bd4848" />
                <path d="M107 23v12m-6-6h12" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </aside>
        </div>
        <div className="journey-grid">
          <div className="education-card">
            <div className="subsection-heading">
              <h3>Pendidikan</h3>
              <span className="muted">Fondasi perjalanan</span>
            </div>
            <ol className="education-list">
              {education.map((item) => (
                <li key={item.institution}>
                  <span className="timeline-line" aria-hidden="true" />
                  <span className="timeline-dot" aria-hidden="true" />
                  <p className="period">{item.period}</p>
                  <h4>{item.institution}</h4>
                  <p className="degree">{item.degree}</p>
                  <p className="entry-description">{item.description}</p>
                </li>
              ))}
            </ol>
            <div className="education-decoration" aria-hidden="true">
              <svg className="education-book" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M32 17C24 11 14 10 5 13v35c9-3 19-2 27 4 8-6 18-7 27-4V13c-9-3-19-2-27 4Z" />
                <path d="M32 17v35M12 22c5-1 9 0 13 2M12 30c5-1 9 0 13 2M39 24c4-2 8-3 13-2M39 32c4-2 8-3 13-2" />
              </svg>
              <p>Belajar.<br />Membuat.<br /><span>Bertumbuh.</span></p>
              <svg className="education-spark" viewBox="0 0 40 40" fill="currentColor"><path d="m20 2 5 13 13 5-13 5-5 13-5-13L2 20l13-5Z" /></svg>
            </div>
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
