import Image from "next/image";
import { profile } from "@/data/home";
import { UiIcon } from "@/components/ui-icon";
import { ProfileTitles } from "@/components/profile-titles";

export function ProfileHero() {
  return (
    <section id="beranda" className="hero-section" aria-labelledby="hero-title">
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <p className="hero-greeting">Halo, saya Faza.</p>
          <h1 id="hero-title">Mengubah ide menjadi <span>pengalaman digital.</span></h1>
          <p className="hero-description">{profile.introduction}</p>
          <div className="button-row">
            <a className="button button-primary" href="/#proyek">Jelajahi proyek <UiIcon name="arrow-up-right" /></a>
            <a className="button button-secondary" href="/#kontak">Mari terhubung <UiIcon name="arrow-right" /></a>
          </div>
          <div className="hero-caption"><span>{profile.status}</span><span>{profile.location}</span></div>
        </div>
        <div className="hero-visual">
          <article className="identity-card" aria-label={"Kartu profil " + profile.name}>
            <div className="identity-top"><span className="identity-brand">Zaast.ID</span><span>PERSONAL PROFILE</span></div>
            <div className="identity-photo">
              <Image src={profile.photo} alt={"Foto " + profile.name} fill priority sizes="(max-width: 600px) 85vw, 360px" className="profile-photo" />
              <span className="photo-caption">PEKALONGAN, INDONESIA</span>
            </div>
            <div className="identity-info"><h2>{profile.name}</h2><ProfileTitles titles={profile.titles} /></div>
            <div className="identity-bottom"><span className="status-dot" /><span>{profile.availability}</span><span className="identity-code">MFQ / ID</span></div>
          </article>
        </div>
      </div>
      <div className="page-container hero-bottom">
        <div className="hero-principle"><UiIcon name="code" /><span>Teknologi bertemu kreativitas.</span></div>
        <div className="hero-learning"><strong>Belajar. Membuat. Bertumbuh.</strong><span>Selalu ada hal baru untuk dijelajahi.</span></div>
        <a href="/#tentang">Kenali saya lebih dekat <UiIcon name="arrow-down" /></a>
      </div>
    </section>
  );
}
