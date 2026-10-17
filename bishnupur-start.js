"use strict";

// Load .env
try { require("dotenv").config(); } catch {}

// ── Start WhatsApp bot inline (same process as Next.js) ───────────────────────
const { start: startBot, client: waClient } = require("./whatsapp-bot");

globalThis.__waInline = true;
globalThis.__waClient = waClient;

startBot().catch(e => console.error("[wa-bot] start error:", e.message));

// ── Start Next.js custom server ───────────────────────────────────────────────
const { createServer } = require("http");
const { parse }        = require("url");
const next             = require("next");

const PORT = parseInt(process.env.PORT || "2000", 10);
const app    = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    await handle(req, res, parse(req.url, true));
  }).listen(PORT, () => console.log(`[bishnupur] ready on :${PORT}`));
}).catch(e => {
  console.error("[bishnupur] failed to start:", e.message);
  process.exit(1);
});
