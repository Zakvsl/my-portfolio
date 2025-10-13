# 🚀 Deployment Guide - Portfolio Website

Panduan lengkap untuk deploy portfolio website ke Netlify atau Vercel.

## 📦 Pre-Deployment Checklist

Sebelum deploy, pastikan:

- [ ] Website berjalan dengan baik di local (`npm run dev`)
- [ ] Tidak ada error di console browser
- [ ] Semua gambar dan link sudah di-update
- [ ] Data personal sudah sesuai (nama, email, social media)
- [ ] EmailJS (optional) sudah dikonfigurasi
- [ ] Build berhasil tanpa error (`npm run build`)

## 🌐 Deploy ke Vercel (Recommended)

### Method 1: Vercel CLI

1. **Install Vercel CLI:**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Login ke Vercel:**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy:**
   \`\`\`bash
   vercel
   \`\`\`

4. **Production Deploy:**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Method 2: Vercel Dashboard

1. Push code ke GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

### Environment Variables (Optional)

Jika menggunakan EmailJS atau API keys:

- Go to Project Settings → Environment Variables
- Add:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

## 🔵 Deploy ke Netlify

### Method 1: Netlify CLI

1. **Install Netlify CLI:**
   \`\`\`bash
   npm install -g netlify-cli
   \`\`\`

2. **Login:**
   \`\`\`bash
   netlify login
   \`\`\`

3. **Initialize & Deploy:**
   \`\`\`bash
   netlify init
   \`\`\`

4. **Or quick deploy:**
   \`\`\`bash
   npm run build
   netlify deploy --prod --dir=dist
   \`\`\`

### Method 2: Netlify Drag & Drop

1. **Build project:**
   \`\`\`bash
   npm run build
   \`\`\`

2. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag & drop folder **dist** ke Netlify

### Method 3: Git Integration

1. Push code ke GitHub/GitLab
2. Visit [app.netlify.com](https://app.netlify.com)
3. Click "New site from Git"
4. Choose repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Custom Domain di Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records di domain provider:
   - Type: **CNAME**
   - Name: **www**
   - Value: **your-site-name.netlify.app**

## 🔧 Build Configuration

### package.json scripts

\`\`\`json
{
"scripts": {
"dev": "vite",
"build": "tsc && vite build",
"preview": "vite preview"
}
}
\`\`\`

### vite.config.ts

Sudah dikonfigurasi by default, no changes needed.

## 🌍 Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS:
   - Type: **A Record**
   - Value: `76.76.21.21`
   - Or CNAME: **cname.vercel-dns.com**

### Netlify

1. Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions

## 🔄 Continuous Deployment

Setiap push ke branch `main` akan otomatis trigger deployment baru.

### Git Workflow

\`\`\`bash

# Make changes

git add .
git commit -m "Update portfolio"
git push origin main

# Website akan otomatis di-deploy!

\`\`\`

## 📊 Performance Optimization

### Image Optimization

- Use compressed images (TinyPNG, ImageOptim)
- Use WebP format untuk modern browsers
- Add lazy loading untuk images

### Code Splitting

Vite automatically handles this.

### Lighthouse Score Tips

1. Enable compression (gzip/brotli) - Auto di Vercel/Netlify
2. Add `loading="lazy"` ke images
3. Minify CSS/JS - Auto during build
4. Use CDN - Built-in Vercel/Netlify

## 🐛 Common Deployment Issues

### 1. Build fails: "command not found"

**Fix:** Update package.json engines
\`\`\`json
"engines": {
"node": ">=16.0.0"
}
\`\`\`

### 2. 404 on refresh (SPA routing)

**Fix Netlify:** Create `public/_redirects`
\`\`\`
/\* /index.html 200
\`\`\`

**Fix Vercel:** Create `vercel.json`
\`\`\`json
{
"rewrites": [
{ "source": "/(.*)", "destination": "/" }
]
}
\`\`\`

### 3. Environment variables not working

Pastikan menggunakan prefix `VITE_`:
\`\`\`
VITE_API_KEY=your_key
\`\`\`

Access di code:
\`\`\`ts
const apiKey = import.meta.env.VITE_API_KEY;
\`\`\`

### 4. Tailwind CSS not working

Pastikan `tailwind.config.js` sudah benar dan rebuild:
\`\`\`bash
rm -rf node_modules .cache dist
npm install
npm run build
\`\`\`

## 📈 Analytics (Optional)

### Google Analytics

1. Get tracking ID from [analytics.google.com](https://analytics.google.com)
2. Add to `index.html` before `</head>`:
   \`\`\`html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   \`\`\`

### Vercel Analytics

Otomatis tersedia di Vercel dashboard untuk Pro plan.

### Netlify Analytics

Enable di Site settings → Analytics ($9/month)

## 🔒 Security Headers

### Netlify

Create `netlify.toml`:
\`\`\`toml
[[headers]]
for = "/\*"
[headers.values]
X-Frame-Options = "DENY"
X-XSS-Protection = "1; mode=block"
X-Content-Type-Options = "nosniff"
\`\`\`

### Vercel

Create `vercel.json`:
\`\`\`json
{
"headers": [
{
"source": "/(.\*)",
"headers": [
{ "key": "X-Frame-Options", "value": "DENY" },
{ "key": "X-XSS-Protection", "value": "1; mode=block" }
]
}
]
}
\`\`\`

## ✅ Post-Deployment

After successful deployment:

1. ✅ Test semua links
2. ✅ Test form contact
3. ✅ Test responsive di mobile
4. ✅ Check loading speed (PageSpeed Insights)
5. ✅ Test dark/light mode
6. ✅ Verify analytics working
7. ✅ Share link di social media! 🎉

## 📞 Support

Jika ada masalah deployment:

- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- GitHub Issues: Create issue di repo ini

---

Happy Deploying! 🚀
