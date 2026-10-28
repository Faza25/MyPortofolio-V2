import Image from "next/image";
import { profile } from "@/data/home";
import { UiIcon } from "@/components/ui-icon";
import { ProfileTitles } from "@/components/profile-titles";

export function ProfileHero() {
  return (
    <section id="beranda" className="hero-section" aria-labelledby="hero-title">
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <p className="availability-badge"><span className="status-dot" />{profile.availability}</p>
          <p className="hero-greeting">Halo, saya Faza. <svg aria-hidden="true" viewBox="0 0 32 32"><path d="m16 2 3.5 10.5L30 16l-10.5 3.5L16 30l-3.5-10.5L2 16l10.5-3.5Z" /></svg></p>
          <h1 id="hero-title">Muhammad Faza<br /><span>Qowamudin.</span></h1>
          <ProfileTitles titles={profile.titles} />
          <p className="hero-tagline">Mengubah ide menjadi pengalaman digital.</p>
          <p className="hero-description">{profile.introduction}</p>
          <div className="button-row">
            <a className="button button-primary" href="/#proyek">Jelajahi proyek <UiIcon name="arrow-up-right" /></a>
            <a className="button button-secondary" href="/#kontak">Mari terhubung <UiIcon name="arrow-right" /></a>
          </div>
          <div className="hero-caption"><span>{profile.status}</span><span>{profile.location}</span></div>
          <a className="hero-email" href={"mailto:" + profile.contact.email}>{profile.contact.email}<UiIcon name="arrow-up-right" /></a>
        </div>
        <div className="hero-visual">
          <svg className="hero-sticker star-sticker" aria-hidden="true" viewBox="0 0 100 100"><path d="m50 5 12 29 31-8-17 27 20 25-33-3-13 26-12-29-31 8 17-27L4 28l33 3Z" /></svg>
          <svg className="hero-sticker sparkle-sticker" aria-hidden="true" viewBox="0 0 64 64"><path d="m32 3 7 22 22 7-22 7-7 22-7-22L3 32l22-7Z" /></svg>
          <article className="identity-card" aria-label={"Kartu profil " + profile.name}>
            <div className="identity-top"><span className="identity-brand">Zaast.ID</span><span>PERSONAL PROFILE</span></div>
            <div className="identity-photo">
              <Image src={profile.photo} alt={"Foto " + profile.name} fill priority sizes="(max-width: 600px) 85vw, 360px" className="profile-photo" />
              <span className="photo-caption">{profile.location}</span>
            </div>
            <div className="identity-info"><h2>{profile.name}</h2></div>
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
