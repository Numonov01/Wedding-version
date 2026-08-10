export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Vercel environment variable
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Vercel environment variable

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: "Bot sozlanmagan" });
  }

  const { name, attending, guests, wishes } = req.body;

  if (!name || !attending) {
    return res.status(400).json({ error: "Ism va tashrif ma'lumotlari kerak" });
  }

  const attendingText =
    attending === "yes"
      ? "✅ Ha, albatta boraman"
      : "❌ Ming bor uzr, borolmayman";
  const message = `
🌸 *Yangi RSVP — Olim & Marjona to'yi*

👤 *Ism:* ${name}
📌 *Tashrif:* ${attendingText}
👥 *Kishilar soni:* ${guests || "1 kishi"}
💬 *Tilak:* ${wishes || "—"}

📅 29-avgust, 2026
  `.trim();

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      },
    );

    const data = await tgRes.json();
    if (!data.ok) {
      return res
        .status(500)
        .json({ error: "Telegram xato: " + data.description });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Server xato: " + err.message });
  }
}
