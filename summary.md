Judul Project: Personal Portfolio Website – Kuwuk
Tech Stack:

Frontend: React JS

3D Rendering: Three.js

Styling: Tailwind CSS

Deployment: Netlify / Vercel

Version Control: Git + GitHub

🧭 1. Tujuan Project

Membangun website portfolio yang:

Menonjol secara visual dengan efek 3D interaktif (Three.js di Hero Section).

Modern, responsif, dan cepat.

Mampu menampilkan project, skill, dan kontak secara profesional.

Bisa menjadi personal branding dan meningkatkan peluang magang/kerja.

🏗 2. Struktur Halaman & Fitur Utama
🟡 Hero Section (Three.js Interactive)

Canvas 3D dengan efek parallax atau floating object.

Objek 3D bisa berupa:

Logo personal animasi (misalnya inisial “K” berputar).

Particle field (titik-titik interaktif mengikuti mouse).

Geometri futuristik (misalnya sphere atau torus dengan shader gradient).

Text Overlay:

Nama lengkap / alias.

Role / title (misalnya Web Developer | ML Enthusiast).

Tombol CTA → “View My Work” scroll ke project section.

📝 To do:

Setup Three.js scene dengan TS.

Tambahkan camera, light, renderer.

Buat efek animasi loop dan interaksi mouse.

🟢 About Section

Foto profil (bisa dengan efek hover ringan).

Deskripsi singkat (1–2 paragraf).

List skill utama dalam bentuk tag/ikon teknologi.

CTA ke CV (PDF atau Google Drive link).

📝 To do:

Buat komponen AboutCard.

Tambahkan animasi masuk (Framer Motion / GSAP).

Optimasi gambar untuk web.

🔵 Project Section

Grid / carousel modern untuk showcase project.

Tiap kartu project berisi:

Thumbnail / gambar demo

Judul project

Tech stack kecil (tag)

Deskripsi singkat

Tombol “Live” & “GitHub”

Bisa ditambahkan efek hover: tilt, blur, glassmorphism.

📝 To do:

Buat struktur data projects.ts untuk list project.

Mapping ke komponen ProjectCard.

Responsive grid layout (2–3 kolom desktop, 1 mobile).

🟣 Skill Section (Optional - Animasi)

Visualisasi skill menggunakan bar, radial chart, atau icon grid.

Bisa diberi efek animasi saat scroll.

📝 To do:

Buat SkillItem reusable.

Tambahkan scroll reveal animation.

🟠 Contact Section

Form sederhana (nama, email, pesan) → kirim via EmailJS atau webhook.

Atau, CTA button ke WhatsApp / LinkedIn / Email.

Tambahkan efek micro-interaction saat hover.

📝 To do:

Setup EmailJS atau endpoint sederhana.

Validasi form dengan TypeScript.

⚫ Footer

Copyright

Social media icons (GitHub, LinkedIn, Instagram)

Scroll to top button

🧰 3. Komponen Teknis
Komponen Library/Tools Keterangan
Routing (opsional) React Router / Next.js Untuk navigasi smooth antar section
3D Hero Three.js Efek visual interaktif
Animasi Framer Motion / GSAP Transisi halus dan modern
Styling Tailwind CSS / SCSS Utility-first styling
TypeScript TS Menjamin type safety dan struktur project rapi
Dark/Light Mode toggle.
Page transition animasi.

🤖 Chatbot Section (Personal Assistant)
✨ Tujuan Fitur

Memberikan pengalaman interaktif bagi pengunjung website melalui chatbot yang:

Bisa menjawab pertanyaan umum tentang kamu (skills, pengalaman, project, kontak).

Bisa membantu user menavigasi ke bagian tertentu (misalnya “Tunjukkan portofolio” → scroll ke Project section).

Memberi kesan modern & AI-ready.

📌 Fitur-Fitur Chatbot
Fitur Deskripsi
💬 Chat Bubble Floating Tombol kecil (icon chatbot) di pojok kanan bawah. Klik → buka panel chatbot.
📝 Predefined Responses Jawaban otomatis untuk pertanyaan umum (misalnya “Siapa kamu?”, “Apa keahlian kamu?”, dll).
🔗 Smart Navigation Perintah seperti “Tunjukkan project” akan mengarahkan scroll ke section yang diminta.
🧠 Optional AI Bisa di-upgrade dengan model LLM (API seperti OpenAI / Gemini / lokal) untuk jawaban dinamis.
📱 Responsif Chatbot tetap nyaman digunakan di mobile & tablet.
🧰 Teknologi Chatbot
Komponen Tools / Library Keterangan
UI Floating Chat React + Tailwind / Headless UI Panel chat responsif dan animasi buka/tutup.
State & Logic TypeScript + Zustand / Context API Menyimpan chat history & handle alur percakapan.
Optional AI Backend OpenAI / Gemini / self-hosted API Menjawab pertanyaan kompleks (opsional).
Animasi Framer Motion Smooth transition saat panel dibuka/ditutup.
🛠 Rencana Implementasi

1. Chatbot UI

Floating button di pojok kanan bawah (icon 💬).

Klik → muncul panel chat (bottom right), tampil dengan animasi slide-in.

Panel berisi:

Header (nama chatbot, tombol close)

Area pesan (user & bot)

Input bar + tombol kirim

📝 To do:

Buat komponen ChatBot.tsx.

Gunakan framer-motion untuk animasi slide.

Buat style dengan Tailwind (glassmorphism atau minimalis modern).

2. Logika Chatbot (Basic)

Gunakan array berisi daftar pertanyaan umum + jawaban.

Saat user input cocok dengan pertanyaan tertentu → tampilkan jawaban.

Tambahkan keyword navigation seperti:

“ke project” → scroll ke #project

“about kamu” → scroll ke #about

📝 To do:

Buat handler handleUserMessage().

Implementasikan matching keyword sederhana (pakai regex / string includes).

Simpan chat history dalam state (Zustand/Context).

3. Optional: Integrasi AI

Kalau mau chatbot terasa “hidup” banget, kamu bisa hubungkan ke model AI:

Buat API route (Next.js) atau serverless function.

Kirim pertanyaan user ke LLM API (OpenAI, Gemini, Ollama, dll).

Tampilkan responsnya ke UI chatbot.

📝 To do (optional):

Buat endpoint /api/chat.

Integrasi dengan OpenAI SDK (jika pakai GPT).

Gunakan streaming response (supaya terasa real-time).

4. Integrasi ke Portfolio

Pastikan tombol chatbot muncul di semua halaman/section (misalnya taruh di App.tsx).

Tambahkan anchor id (#about, #project, #contact) untuk memudahkan navigasi via chatbot.

Test di mobile & desktop.
