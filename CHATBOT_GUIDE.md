# 🤖 Chatbot Quick Start Guide

## Untuk User/Pengunjung Website

### Cara Menggunakan Chatbot

1. **Buka Chatbot**

   - Klik tombol chat (💬) di pojok kanan bawah
   - Panel chat akan muncul dengan animasi slide-in

2. **Mulai Percakapan**

   - Bot akan menyapa dengan pesan selamat datang
   - Ketik pertanyaan Anda di input box
   - Tekan Enter atau klik tombol kirim (➤)

3. **Contoh Pertanyaan yang Bisa Ditanyakan**

   **Informasi Personal:**

   - "Siapa kamu?"
   - "Tentang Dimas"
   - "Profil lengkap"

   **Skills & Keahlian:**

   - "Apa keahlianmu?"
   - "Skill yang dikuasai"
   - "Teknologi apa saja"

   **Portfolio & Project:**

   - "Tunjukkan project"
   - "Portfolio kamu"
   - "Karya yang sudah dibuat"

   **Kontak:**

   - "Bagaimana cara menghubungi?"
   - "Email kamu"
   - "WhatsApp"

   **Navigasi Cepat:**

   - "Tunjukkan about" → Langsung scroll ke About section
   - "Ke skills" → Scroll ke Skills section
   - "Lihat project" → Scroll ke Projects section
   - "Tunjukkan contact" → Scroll ke Contact section
   - "Home" → Kembali ke atas

   **Bantuan:**

   - "Help"
   - "Apa yang bisa kamu lakukan?"
   - "Bantuan"

4. **Tips Penggunaan**

   - Bot mengerti berbagai variasi kata kunci
   - Tidak perlu mengetik dengan format khusus
   - Gunakan bahasa natural/alami
   - Bot akan memberikan response dalam 0.8 detik

5. **Tutup Chatbot**
   - Klik tombol X di header panel
   - Atau klik tombol chat (💬) lagi

---

## Untuk Developer

### Setup & Kustomisasi

#### 1. File Utama

**ChatBot Component:** `src/components/ChatBot.tsx`

```tsx
import { ChatBot } from "./components/ChatBot";

// Di App.tsx
<ChatBot />;
```

**Data Responses:** `src/data/chatbotData.ts`

#### 2. Menambah Response Baru

Edit `src/data/chatbotData.ts`:

```typescript
{
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  response: 'Response text yang akan ditampilkan',
  action: 'scroll', // optional: 'scroll' | undefined
  target: '#section-id', // optional: target scroll
}
```

**Contoh: Menambah response untuk "hobi"**

```typescript
{
  keywords: ['hobi', 'hobby', 'suka', 'senang'],
  response: '🎮 Saya suka coding, gaming, dan exploring teknologi baru!',
}
```

**Contoh: Response dengan navigasi**

```typescript
{
  keywords: ['blog', 'artikel', 'tulisan'],
  response: '📝 Mengarahkan ke section blog...',
  action: 'scroll',
  target: '#blog',
}
```

#### 3. Mengubah Welcome Message

```typescript
export const welcomeMessage = "Selamat datang! Ada yang bisa saya bantu?";
```

#### 4. Mengubah Default Response

```typescript
export const defaultResponse =
  "Maaf, saya tidak mengerti. Bisa dijelaskan lebih detail?";
```

#### 5. Styling Kustomisasi

**Warna & Gradient:**

```tsx
// Di ChatBot.tsx
className = "bg-gradient-to-r from-secondary to-accent-teal";
```

**Ukuran Panel:**

```tsx
className = "w-[380px] h-[500px]";
// Ubah sesuai kebutuhan
```

**Posisi Button:**

```tsx
className = "fixed bottom-6 right-6";
// Ubah bottom/right sesuai preferensi
```

#### 6. Advanced: Integrasi AI (Optional)

Untuk response yang lebih dinamis, tambahkan API integration:

```typescript
const callAI = async (userMessage: string) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  return data.reply;
};

// Gunakan di handleSendMessage
const aiResponse = await callAI(inputValue);
addBotMessage(aiResponse);
```

### Testing

```bash
# Run development server
npm run dev

# Test chatbot di browser
# 1. Klik chat button
# 2. Test berbagai keyword
# 3. Test navigation commands
# 4. Test di mobile view (responsive)
```

### Debugging

**Chat tidak muncul?**

```typescript
// Check import di App.tsx
import { ChatBot } from "./components/ChatBot";

// Check render
<ChatBot />;
```

**Response tidak match?**

```typescript
// Debug keyword matching
console.log("User input:", userInput.toLowerCase());
console.log("Checking keywords:", response.keywords);
```

**Scroll tidak bekerja?**

```typescript
// Pastikan ID section benar
<section id="about"> // ✅
<section id="About"> // ❌ Case-sensitive!

// Check scroll function
const element = document.querySelector(target);
console.log('Found element:', element);
```

### Performance Tips

1. **Lazy Loading** (untuk large chat history)

   ```typescript
   const [messages, setMessages] = useState<ChatMessage[]>(() =>
     JSON.parse(sessionStorage.getItem("chatHistory") || "[]")
   );
   ```

2. **Debounce Input** (untuk typing optimization)

   ```typescript
   import { debounce } from "lodash";
   const debouncedSend = debounce(handleSendMessage, 300);
   ```

3. **Clear History** (saat close)
   ```typescript
   const handleClose = () => {
     setMessages([]);
     setIsOpen(false);
   };
   ```

### Deployment Checklist

- ✅ Test semua keyword responses
- ✅ Test navigation commands
- ✅ Test di berbagai browser
- ✅ Test responsive mobile/tablet
- ✅ Verify scroll targets exist
- ✅ Check accessibility (aria-labels)
- ✅ Build tanpa error (`npm run build`)

---

## FAQ

**Q: Apakah chatbot menggunakan AI sungguhan?**
A: Saat ini menggunakan keyword-based matching. Bisa di-upgrade dengan API AI.

**Q: Apakah chat history disimpan?**
A: Chat history hanya tersimpan selama session (di component state).

**Q: Bisakah bot menjawab dalam bahasa Inggris?**
A: Ya! Tinggal tambahkan keyword bahasa Inggris di `chatbotData.ts`.

**Q: Bagaimana menambah animasi custom?**
A: Edit Framer Motion props di komponen ChatBot.tsx.

**Q: Apakah bisa multi-language?**
A: Ya, bisa implementasi i18n untuk responses multi-bahasa.

---

**Need Help?**

- 📖 Baca: `CHATBOT.md` untuk dokumentasi lengkap
- 🐛 Report issues di GitHub
- 💬 Atau... tanya chatbot-nya! 😄

Happy Coding! 🚀
