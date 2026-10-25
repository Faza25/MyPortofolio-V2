import { ContactForm } from "@/components/contact-form";
import { SocialIcon } from "@/components/social-icon";
import { profile } from "@/data/home";
import { UiIcon } from "@/components/ui-icon";

export function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="kontak" className="section-block contact-section" aria-labelledby="contact-title">
      <div className="page-container contact-grid">
        <div className="contact-copy"><Heading id="contact-title">Ide yang baik<br />dimulai dari<br /><span>percakapan.</span></Heading><p>Punya ide, pertanyaan, atau kesempatan untuk bekerja bersama? Saya senang mendengarnya.</p>
          <a className="contact-email" href={"mailto:" + profile.contact.email}>{profile.contact.email}<UiIcon name="arrow-up-right" /></a>
          <div className="contact-details"><div><span>LOKASI</span><p>{profile.location}</p></div><div><span>TELEPON</span><a href={"tel:" + profile.contact.phone.replace(/[^+\d]/g, "")}>{profile.contact.phone}</a></div></div>
          <ul className="contact-socials" aria-label="Sosial media">{profile.socialLinks.map((social) => <li key={social.platform}><a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={"Buka " + social.platform + " di tab baru"}><SocialIcon platform={social.platform} /><span>{social.platform}</span><UiIcon name="arrow-up-right" /></a></li>)}</ul>
        </div>
        <div className="contact-form-panel"><h3>Ceritakan idemu.</h3><p>Isi formulir berikut untuk mengirim pesan.</p><ContactForm /></div>
      </div>
    </section>
  );
}
