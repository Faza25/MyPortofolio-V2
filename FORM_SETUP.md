# Konfigurasi formulir kontak

Form kontak menggunakan Formspree. Buat form di dashboard Formspree, lalu tambahkan
environment variable berikut pada pengaturan deploy Netlify:

```text
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/ID_FORM_ANDA
```

Endpoint sengaja tidak ditulis langsung ke source code agar dapat diganti tanpa
perubahan komponen.
