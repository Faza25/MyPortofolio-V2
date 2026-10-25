"use client";

import { FormEvent, useRef, useState } from "react";
import { UiIcon } from "@/components/ui-icon";

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending) return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: FormErrors = {};
    if (name.length < 2) nextErrors.name = "Masukkan nama minimal 2 karakter.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Masukkan alamat email yang valid.";
    if (message.length < 10) nextErrors.message = "Tuliskan pesan minimal 10 karakter.";
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length) {
      formElement.querySelector<HTMLInputElement | HTMLTextAreaElement>('[name="' + Object.keys(nextErrors)[0] + '"]')?.focus();
      return;
    }
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setSubmitError("Pengiriman melalui formulir belum tersedia. Silakan hubungi saya melalui tautan email di bagian kontak.");
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch(endpoint, { method: "POST", body: form, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Gagal mengirim.");
      formElement.reset();
      setIsSent(true);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setSubmitError("Pesan belum terkirim. Coba lagi atau hubungi saya melalui email.");
    } finally {
      setIsSending(false);
    }
  }

  if (isSent) return <div className="form-success" role="status" tabIndex={-1} ref={resultRef}><span className="success-icon"><UiIcon name="check" /></span><h3>Pesan berhasil dikirim.</h3><p>Terima kasih sudah menghubungi saya. Saya akan membalas melalui email.</p><button className="button button-secondary" type="button" onClick={() => setIsSent(false)}>Tulis pesan baru</button></div>;

  return <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={isSending}>
    <div className="form-field"><label htmlFor="contact-name">Nama lengkap <span>*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="Nama kamu" required maxLength={120} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div>
    <div className="form-field"><label htmlFor="contact-email">Alamat email <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="kamu@email.com" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <p className="field-error" id="email-error">{errors.email}</p>}</div>
    <div className="form-field"><label htmlFor="contact-message">Pesan <span>*</span></label><textarea id="contact-message" name="message" rows={5} placeholder="Ceritakan ide atau hal yang ingin kamu diskusikan…" required maxLength={5000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
    {submitError && <p className="form-alert" role="alert">{submitError}</p>}
    <button className="button button-primary submit-button" disabled={isSending} type="submit">{isSending ? "Mengirim pesan…" : "Kirim pesan"}<UiIcon name="arrow-up-right" /></button>
    <p className="form-note">Pesanmu akan diteruskan langsung ke email saya.</p>
  </form>;
}
