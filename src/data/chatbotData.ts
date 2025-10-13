export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatResponse {
  keywords: string[];
  response: string;
  action?: "scroll" | "link";
  target?: string;
}

export const chatbotResponses: ChatResponse[] = [
  // Greetings
  {
    keywords: ["hai", "halo", "hello", "hi", "hey"],
    response:
      "👋 Halo! Saya adalah asisten virtual Dimas. Saya bisa membantu Anda mengetahui lebih lanjut tentang skills, project, atau cara menghubungi Dimas. Ada yang bisa saya bantu?",
  },

  // About
  {
    keywords: [
      "siapa",
      "tentang",
      "about",
      "profil",
      "kamu",
      "you",
      "dimas",
      "nurzaky",
    ],
    response:
      '🙋‍♂️ Saya adalah M Dimas Nurzaky (Kuwuk), seorang Web Developer dan ML Enthusiast. Saya passionate dalam membuat aplikasi web modern dengan React, Three.js, dan teknologi terkini. Ingin tahu lebih detail? Ketik "tunjukkan about" untuk melihat profil lengkap!',
    action: "scroll",
    target: "#about",
  },

  // Skills
  {
    keywords: [
      "skill",
      "keahlian",
      "kemampuan",
      "bisa",
      "teknologi",
      "tech stack",
    ],
    response:
      '💻 Saya menguasai berbagai teknologi seperti React, TypeScript, Three.js, Tailwind CSS, Node.js, Python, dan masih banyak lagi! Ketik "tunjukkan skills" untuk melihat visualisasi lengkap kemampuan saya.',
    action: "scroll",
    target: "#skills",
  },

  // Projects
  {
    keywords: ["project", "portfolio", "karya", "hasil", "proyek", "kerja"],
    response:
      '🚀 Saya telah mengerjakan berbagai project menarik seperti E-Commerce Platform, Task Management App, Weather Dashboard, dan masih banyak lagi! Mau lihat portfolio lengkap? Ketik "tunjukkan project".',
    action: "scroll",
    target: "#projects",
  },

  // Contact
  {
    keywords: ["kontak", "hubungi", "contact", "email", "whatsapp", "wa"],
    response:
      '📧 Ingin berdiskusi atau bekerja sama? Anda bisa menghubungi saya melalui email di dimas@example.com atau WhatsApp. Ketik "tunjukkan contact" untuk melihat form kontak dan informasi lengkap!',
    action: "scroll",
    target: "#contact",
  },

  // Navigation Commands
  {
    keywords: ["tunjukkan about", "ke about", "lihat about", "show about"],
    response: "✨ Mengarahkan Anda ke About section...",
    action: "scroll",
    target: "#about",
  },
  {
    keywords: ["tunjukkan skills", "ke skills", "lihat skills", "show skills"],
    response: "✨ Mengarahkan Anda ke Skills section...",
    action: "scroll",
    target: "#skills",
  },
  {
    keywords: [
      "tunjukkan project",
      "ke project",
      "lihat project",
      "show project",
      "portfolio",
    ],
    response: "✨ Mengarahkan Anda ke Projects section...",
    action: "scroll",
    target: "#projects",
  },
  {
    keywords: [
      "tunjukkan contact",
      "ke contact",
      "lihat contact",
      "show contact",
      "hubungi",
    ],
    response: "✨ Mengarahkan Anda ke Contact section...",
    action: "scroll",
    target: "#contact",
  },
  {
    keywords: ["home", "awal", "atas", "top"],
    response: "✨ Kembali ke atas...",
    action: "scroll",
    target: "#home",
  },

  // Experience
  {
    keywords: ["pengalaman", "experience", "kerja", "magang", "internship"],
    response:
      "💼 Saya memiliki pengalaman dalam web development dengan fokus pada frontend dan 3D graphics. Untuk detail lebih lanjut tentang pengalaman saya, silakan lihat section About atau hubungi saya langsung!",
  },

  // CV/Resume
  {
    keywords: ["cv", "resume", "download", "unduh"],
    response:
      '📄 Anda bisa download CV saya di section About. Scroll ke bagian About dan klik tombol "Download CV"!',
    action: "scroll",
    target: "#about",
  },

  // Social Media
  {
    keywords: ["github", "linkedin", "instagram", "social", "sosial media"],
    response:
      "🔗 Anda bisa menemukan saya di:\n• GitHub: github.com/kuwuk\n• LinkedIn: linkedin.com/in/kuwuk\n• Instagram: @kuwuk\n\nSemua link ada di footer website!",
  },

  // Help
  {
    keywords: ["help", "bantuan", "bisa apa", "apa yang bisa"],
    response:
      '🤖 Saya bisa membantu Anda dengan:\n\n✅ Informasi tentang Dimas (skills, project, kontak)\n✅ Navigasi cepat ke section tertentu\n✅ Menjawab pertanyaan umum\n\nContoh pertanyaan:\n• "Apa keahlianmu?"\n• "Tunjukkan project"\n• "Bagaimana cara menghubungimu?"',
  },

  // Thank you
  {
    keywords: ["terima kasih", "thanks", "thank you", "makasih"],
    response: "😊 Sama-sama! Senang bisa membantu. Ada pertanyaan lain?",
  },

  // Goodbye
  {
    keywords: ["bye", "goodbye", "sampai jumpa", "dadah", "selesai"],
    response:
      "👋 Sampai jumpa! Jangan ragu untuk kembali jika ada pertanyaan. Have a great day!",
  },
];

export const defaultResponse =
  '🤔 Maaf, saya kurang mengerti pertanyaan Anda. Coba tanyakan tentang:\n\n• Skills & keahlian\n• Project portfolio\n• Cara menghubungi\n• Navigasi website\n\nAtau ketik "help" untuk melihat apa yang bisa saya bantu!';

export const welcomeMessage =
  "👋 Halo! Saya asisten virtual Dimas. Ada yang bisa saya bantu? Tanyakan tentang skills, project, atau cara menghubungi!";
