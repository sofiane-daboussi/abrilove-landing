var ALLOWED_ORIGINS = ["https://abrilove.fr"];
var PRICE_ID = "price_1TSDvsI8ilInoMaXm9G97LG5";

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

async function stripePost(path, params, stripeKey) {
  const body = new URLSearchParams(params).toString();
  const res = await fetch(`https://api.stripe.com${path}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });
  return res.json();
}

async function verifyStripeWebhook(payload, sig, secret) {
  const encoder = new TextEncoder();
  const parts = sig.split(",");
  const timestamp = parts.find((p) => p.startsWith("t=")).split("=")[1];
  const v1 = parts.find((p) => p.startsWith("v1=")).split("=")[1];
  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const expected = Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, "0")).join("");
  if (expected !== v1) throw new Error("Signature invalide");
  return JSON.parse(payload);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/create-payment-intent") {
      try {
        const { email } = await request.json();
        const priceRes = await fetch(`https://api.stripe.com/v1/prices/${PRICE_ID}`, {
          headers: { "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}` }
        });
        const price = await priceRes.json();
        const params = {
          amount: price.unit_amount,
          currency: price.currency,
          "automatic_payment_methods[enabled]": "true",
          "metadata[profil]": "abrimail",
          "metadata[price_id]": PRICE_ID
        };
        if (email) params.receipt_email = email;
        const intent = await stripePost("/v1/payment_intents", params, env.STRIPE_SECRET_KEY);
        if (intent.error) {
          return new Response(JSON.stringify({ error: intent.error.message }), {
            status: 400,
            headers: { ...headers, "Content-Type": "application/json" }
          });
        }
        return new Response(JSON.stringify({ clientSecret: intent.client_secret }), {
          status: 200,
          headers: { ...headers, "Content-Type": "application/json" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { ...headers, "Content-Type": "application/json" }
        });
      }
    }

    if (request.method === "POST" && url.pathname === "/stripe-webhook") {
      try {
        const body = await request.text();
        const sig = request.headers.get("stripe-signature");
        const event = await verifyStripeWebhook(body, sig, env.STRIPE_WEBHOOK_SECRET);
        if (event.type === "payment_intent.succeeded") {
          const intent = event.data.object;
          const email = intent.receipt_email;
          if (email) {
            await fetch("https://api.brevo.com/v3/contacts", {
              method: "POST",
              headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": env.BREVO_API_KEY
              },
              body: JSON.stringify({
                email,
                listIds: [40, 7],
                updateEnabled: true
              })
            });
            await fetch("https://api.brevo.com/v3/smtp/email", {
              method: "POST",
              headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": env.BREVO_API_KEY
              },
              body: JSON.stringify({
                sender: { email: "bonjour@abrilove.fr", name: "Sofi & Oli" },
                to: [{ email }],
                subject: "💌 Merci pour ta confiance, envoie-moi ton histoire",
                htmlContent: `<p>Coucou,</p><p>Merci beaucoup pour ta confiance 🤍</p><p>Pour que je puisse te répondre de la manière la plus juste possible, tu peux m'envoyer ton message (ou ta situation) directement ici, en réponse à ce mail.</p><p>Dis-moi ce que tu vis, ce que tu ressens, et sur quoi tu aimerais que je t'apporte de la clarté.</p><p>Je te répondrai personnellement 🤍</p><p>À très vite,<br>Sofi & Oli 🌸</p>`
              })
            });
          }
        }
        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { ...headers, "Content-Type": "application/json" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" }
        });
      }
    }

    return new Response("Not found", { status: 404, headers });
  }
};
