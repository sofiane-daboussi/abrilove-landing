// ============================================================
// ABRILOVE MONITOR WORKER
// Cron : toutes les 5 minutes
// Vérifie que tous les services critiques tournent
// Alerte par email Brevo si quelque chose faillit
// Secrets: BREVO_API_KEY, ALERT_EMAIL
// ============================================================

const CHECKS = [
  // Site et apps
  { name: 'abrilove.fr',     url: 'https://abrilove.fr',     method: 'GET', expectStatus: 200 },
  { name: 'ia.abrilove.fr',  url: 'https://ia.abrilove.fr',  method: 'GET', expectStatus: 200 },

  // Workers — on vérifie juste qu'ils répondent (pas de vrai appel métier)
  { name: 'worker-checkout',     url: 'https://abrilove-checkout.sofiane-daboussi.workers.dev/',     method: 'OPTIONS', expectStatus: [204, 200, 404] },
  { name: 'worker-webhook',      url: 'https://abrilove-webhook.sofiane-daboussi.workers.dev/',      method: 'GET',     expectStatus: [200, 404] },
  { name: 'worker-chat',         url: 'https://abrilove-chat.sofiane-daboussi.workers.dev/',         method: 'OPTIONS', expectStatus: [204, 200, 404] },
  { name: 'worker-quiz-submit',  url: 'https://abrilove-quiz-submit.sofiane-daboussi.workers.dev/',  method: 'OPTIONS', expectStatus: [204, 200, 404] },
  { name: 'worker-oto',          url: 'https://abrilove-oto-worker.sofiane-daboussi.workers.dev/',   method: 'OPTIONS', expectStatus: [204, 200, 404] },
  { name: 'worker-newsletter',   url: 'https://abrilove-newsletter.sofiane-daboussi.workers.dev/',    method: 'OPTIONS', expectStatus: [204, 200, 404] },

  // APIs externes
  { name: 'stripe-api',  url: 'https://api.stripe.com/',      method: 'GET', expectStatus: [200, 401, 404] },
  { name: 'brevo-api',   url: 'https://api.brevo.com/v3/account', method: 'GET', expectStatus: [200, 401, 403] },
]

async function runCheck(check) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(check.url, {
      method: check.method,
      body: check.body || undefined,
      headers: check.body ? { 'Content-Type': 'application/json' } : {},
      signal: controller.signal,
    })
    clearTimeout(timeout)
    const expected = Array.isArray(check.expectStatus) ? check.expectStatus : [check.expectStatus]
    const ok = expected.includes(res.status)
    return { name: check.name, ok, status: res.status }
  } catch (e) {
    return { name: check.name, ok: false, status: 'timeout/erreur réseau' }
  }
}

async function sendAlert(env, failures) {
  const lines = failures.map(f => `❌ <strong>${f.name}</strong> — réponse reçue : ${f.status}`).join('<br>')
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;padding:24px;">
      <h2 style="color:#660A43;">⚠️ Alerte Abrilove Monitor</h2>
      <p>Les services suivants ne répondent pas correctement :</p>
      <p>${lines}</p>
      <p style="color:#999;font-size:12px;">Vérifié le ${new Date().toLocaleString('fr-FR')} UTC</p>
    </div>
  `
  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': env.BREVO_API_KEY },
    body: JSON.stringify({
      sender: { name: 'Abrilove Monitor', email: 'bonjour@abrilove.fr' },
      to: [{ email: env.ALERT_EMAIL || 'sofiane.daboussi@gmail.com' }],
      subject: `⚠️ ${failures.length} service(s) Abrilove en erreur`,
      htmlContent: html,
    }),
  })
}

export default {
  async scheduled(event, env, ctx) {
    const results = await Promise.all(CHECKS.map(runCheck))
    const failures = results.filter(r => !r.ok)
    if (failures.length > 0) {
      await sendAlert(env, failures)
    }
  },

  // Pour tester manuellement : GET /run
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/run') {
      const results = await Promise.all(CHECKS.map(runCheck))
      const failures = results.filter(r => !r.ok)
      if (failures.length > 0) await sendAlert(env, failures)
      return new Response(JSON.stringify({ results, failures }, null, 2), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response('Abrilove Monitor — GET /run pour tester', { status: 200 })
  },
}
