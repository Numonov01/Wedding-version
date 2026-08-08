# Olim & Marjona — To'y Taklifnomasi

## Fayl tuzilmasi

```
wedding/
├── index.html          ← Asosiy sahifa
├── api/
│   └── rsvp.js         ← Telegram bot serverless function
├── vercel.json         ← Vercel konfiguratsiya
└── README.md
```

---

## Vercel'ga yuklash

### 1. Vercel account oching

→ https://vercel.com — GitHub bilan kiring

### 2. GitHub'ga yuklang

```bash
git init
git add .
git commit -m "Wedding invitation"
git branch -M main
git remote add origin https://github.com/SIZNING_USERNAME/wedding.git
git push -u origin main
```

### 3. Vercel'da project import qiling

- vercel.com → "Add New Project"
- GitHub repo'ingizni tanlang
- "Deploy" bosing

### 4. Environment Variables qo'shing

Vercel dashboard → Project → Settings → Environment Variables:

| Name                 | Value                                  |
| -------------------- | -------------------------------------- |
| `TELEGRAM_BOT_TOKEN` | `123456789:ABCdef...` (bot tokeningiz) |
| `TELEGRAM_CHAT_ID`   | `-1001234567890` (chat yoki kanal ID)  |

### 5. Redeploy

Settings'dan keyin: Deployments → "Redeploy"

---

## Telegram bot sozlash

### Bot yaratish:

1. Telegram'da @BotFather ga yozing
2. `/newbot` buyrug'ini yuboring
3. Bot nomi va username bering
4. Token olinadi → Vercel'ga kiriting

### Chat ID olish:

- **Shaxsiy chat:** @userinfobot ga yozing → ID olinadi
- **Guruh:** Botni guruhga qo'shing → `https://api.telegram.org/botTOKEN/getUpdates` → `chat.id`

---

## Manzil va xarita qo'shish (keyinroq)

`index.html` da quyidagi joylarni to'ldiring:

**Nahorgi osh:**

```html
<!-- "Manzil kiritiladi" ni o'zgartiring -->
<span>MANZIL_NOMI</span>

<!-- Xarita iframe qo'shing -->
<iframe src="YANDEX_YOKI_GOOGLE_MAPS_EMBED_LINK" ...></iframe>

<!-- Kartada ko'rsatish linkini to'ldiring -->
<a href="MAPS_LINK" ...></a>
```

**Nikoh to'yi uchun ham xuddi shunday.**

---

## Lokal test qilish

```bash
npm i -g vercel
vercel dev
```

Keyin: http://localhost:3000
