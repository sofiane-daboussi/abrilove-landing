// ============================================================
// ABRILOVE NEWSLETTER WORKER
// Route:
//   POST /send → crée et envoie (ou programme) une campagne Brevo
// Secrets: BREVO_API_KEY, WORKER_SECRET
// Usage:
//   curl -X POST https://<worker>.workers.dev/send \
//     -H "Authorization: Bearer <WORKER_SECRET>" \
//     -H "Content-Type: application/json" \
//     -d '{
//       "subject": "Mon objet",
//       "html": "<p>Mon contenu</p>",
//       "segmentIds": [12],          // OU listIds
//       "listIds": [],
//       "senderName": "Abrilove",    // optionnel
//       "senderEmail": "bonjour@abrilove.fr",  // optionnel
//       "scheduledAt": "2026-05-10T10:00:00Z"  // optionnel, sinon envoi immédiat
//     }'
// ============================================================

const DEFAULT_SENDER_NAME  = 'Abrilove';
const DEFAULT_SENDER_EMAIL = 'bonjour@abrilove.fr';

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function errorResponse(message, status = 400) {
  return jsonResponse({ error: message }, status);
}

async function brevoRequest(path, method, body, apiKey) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { ok: res.ok, status: res.status, body: json };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // ── Auth ──────────────────────────────────────────────────
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!env.WORKER_SECRET || token !== env.WORKER_SECRET) {
      return errorResponse('Unauthorized', 401);
    }

    // ── POST /send ────────────────────────────────────────────
    if (request.method === 'POST' && url.pathname === '/send') {
      let body;
      try { body = await request.json(); } catch {
        return errorResponse('Corps JSON invalide');
      }

      const {
        subject,
        html,
        segmentIds,
        listIds,
        testEmails,
        senderName  = DEFAULT_SENDER_NAME,
        senderEmail = DEFAULT_SENDER_EMAIL,
        scheduledAt,
        campaignName,
      } = body;

      if (!subject || typeof subject !== 'string') return errorResponse('subject requis');
      if (!html    || typeof html    !== 'string') return errorResponse('html requis');

      const isTest      = Array.isArray(testEmails) && testEmails.length > 0;
      const hasSegments = Array.isArray(segmentIds) && segmentIds.length > 0;
      const hasLists    = Array.isArray(listIds)    && listIds.length > 0;
      if (!isTest && !hasSegments && !hasLists) return errorResponse('testEmails, segmentIds ou listIds requis');

      // Nom de campagne auto si pas fourni
      const name = campaignName || `[AUTO] ${subject} – ${new Date().toISOString().slice(0, 10)}`;

      // Pour un test, les destinataires réels n'ont pas d'importance — Brevo demande quand même une liste valide
      const recipients = {};
      if (hasSegments)   recipients.segmentIds = segmentIds;
      else if (hasLists) recipients.listIds    = listIds;
      else               recipients.listIds    = [1]; // liste factice pour le mode test

      const campaignPayload = {
        name,
        subject,
        htmlContent: html,
        sender: { name: senderName, email: senderEmail },
        recipients,
      };
      if (scheduledAt && !isTest) campaignPayload.scheduledAt = scheduledAt;

      // 1. Créer la campagne
      const created = await brevoRequest('/emailCampaigns', 'POST', campaignPayload, env.BREVO_API_KEY);
      if (!created.ok) {
        return jsonResponse({ error: 'Échec création campagne Brevo', details: created.body }, 502);
      }

      const campaignId = created.body.id;

      // 2a. Mode test → sendTest (envoie uniquement aux adresses testEmails)
      if (isTest) {
        const sent = await brevoRequest(`/emailCampaigns/${campaignId}/sendTest`, 'POST', { emailTo: testEmails }, env.BREVO_API_KEY);
        if (!sent.ok) {
          return jsonResponse({ error: 'Campagne créée mais test échoué', campaignId, details: sent.body }, 502);
        }
        return jsonResponse({ success: true, campaignId, status: 'test_sent', sentTo: testEmails });
      }

      // 2b. Envoi réel immédiat
      if (!scheduledAt) {
        const sent = await brevoRequest(`/emailCampaigns/${campaignId}/sendNow`, 'POST', null, env.BREVO_API_KEY);
        if (!sent.ok) {
          return jsonResponse({ error: 'Campagne créée mais envoi échoué', campaignId, details: sent.body }, 502);
        }
        return jsonResponse({ success: true, campaignId, status: 'sent' });
      }

      return jsonResponse({ success: true, campaignId, status: 'scheduled', scheduledAt });
    }

    return errorResponse('Not found', 404);
  },
};
