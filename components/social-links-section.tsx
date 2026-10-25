import profileData from "@/data/profile.json";
import { SocialIcon } from "@/components/social-icon";

const socialLinks = profileData.socialLinks;

export function SocialLinksSection() {
  return (
    <section className="bg-brand-50/60 px-5 py-16 sm:py-20" aria-labelledby="social-links-title">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-semibold text-brand-600">Tetap terhubung</p>
          <h2 id="social-links-title" className="mt-2 text-3xl font-bold text-brand-950">Temukan saya di dunia digital</h2>
          <p className="mt-4 leading-7 text-slate-600">Ikuti proses belajar, proyek terbaru, dan catatan kecil yang saya bagikan di platform berikut.</p>
        </div>
        <ul className="mt-9 grid gap-4 sm:grid-cols-3">
          {socialLinks.map((social) => (
            <li key={social.platform}>
              <a className="group flex items-center gap-4 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-600 hover:shadow-lg hover:shadow-blue-100" href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Buka profil ${social.platform} di tab baru`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white"><SocialIcon platform={social.platform} className="h-6 w-6" /></span>
                <span><span className="block font-bold text-brand-950">{social.platform}</span><span className="mt-1 block text-sm text-slate-500">{social.description} <span aria-hidden="true">↗</span></span></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
