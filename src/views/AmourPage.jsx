'use client'
import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Link from 'next/link'

const EBOOKS = [
  {
    id: 'reperes',
    listId: 21,
    cover: '/images/ebook-7-reperes.avif',
    title: '7 repères pour savoir si tu perds ton temps avec lui',
    description: 'Et ne plus jamais te tromper en amour.',
  },
  {
    id: 'premier-rdv',
    listId: 23,
    cover: '/images/ebook-premier-rdv.avif',
    title: 'Le guide ultime pour un premier rendez-vous réussi',
    description: 'Dis stop aux dates qui te font perdre ton temps avec la mauvaise personne.',
  },
  {
    id: 'ghostee',
    listId: 19,
    cover: '/images/ebook-ghostee.avif',
    title: "Tu t'es encore fait ghoster – Partie 1",
    description: "Reprends en main tes relations et ne laisse plus jamais une seule personne te ghoster.",
  },
  {
    id: '7-habitudes',
    listId: 20,
    cover: '/images/ebook-7-habitudes.png',
    title: '7 habitudes qui reconstruisent ta confiance (vraiment)',
    description: "Reprends en main tes relations et ne laisse plus jamais une seule personne te ghoster.",
  },
  {
    id: 'courir',
    listId: 22,
    cover: '/images/ebook-courir.avif',
    title: "Arrête de courir après lui",
    description: "Un guide pour celles qui en ont assez de tout donner pour être choisies. Ce livre t'apprend à cesser de courir après l'amour, et à revenir vers toi.",
  },
]

function EbookCard({ ebook }) {
  const [email, setEmail] = useState('')
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Entre ton adresse email valide.')
      return
    }
    if (!checked) {
      setError('Coche la case pour recevoir ton guide 🩷')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, listId: ebook.listId }),
      })
      const data = await res.json()
      if (data.ok) {
        setDone(true)
      } else {
        setError('Une erreur est survenue, réessaye.')
      }
    } catch {
      setError('Une erreur est survenue, réessaye.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: '0 6px 32px rgba(102,10,67,0.10)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ position: 'relative' }}>
        <img
          src={ebook.cover}
          alt={ebook.title}
          style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: '#660A43', color: '#fff',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', borderRadius: 6,
          padding: '4px 10px',
        }}>Gratuit</div>
      </div>

      <div style={{ padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-playfair,serif)',
          color: '#660A43', fontSize: 17, fontWeight: 700,
          lineHeight: 1.35, marginBottom: 10,
        }}>{ebook.title}</h3>
        <p style={{ color: '#7a4060', fontSize: 14, lineHeight: 1.65, marginBottom: 20, flex: 1 }}>
          {ebook.description}
        </p>

        {done ? (
          <div style={{
            background: 'rgba(102,10,67,0.06)', borderRadius: 12,
            padding: '16px 18px', textAlign: 'center',
          }}>
            <p style={{ fontSize: 22, marginBottom: 6 }}>🎉</p>
            <p style={{ color: '#660A43', fontWeight: 700, fontSize: 15 }}>Vérifie ta boîte mail !</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="email"
              placeholder="ton@email.fr"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid rgba(102,10,67,0.2)',
                fontSize: 16, color: '#660A43', outline: 'none',
                background: '#FFF4F7',
              }}
            />
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                style={{ marginTop: 3, flexShrink: 0, accentColor: '#660A43' }}
              />
              <span style={{ fontSize: 12, color: '#7a4060', lineHeight: 1.5 }}>
                {"J'accepte de recevoir la newsletter d'Abrilove. Je peux me désinscrire à tout moment. "}
                <Link href="/politique-de-confidentialite" style={{ color: '#660A43' }}>Politique</Link>
              </span>
            </label>
            {error && (
              <p style={{ color: '#C0392B', fontSize: 12, margin: 0 }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="amour-btn"
              style={{
                background: '#660A43', color: '#fff',
                border: 'none', borderRadius: 10,
                padding: '13px 20px', fontSize: 14, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Envoi...' : 'Obtenir gratuitement'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function AmourPage() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-fade]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('fade-in'); obs.unobserve(entry.target) }
      })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ margin: '-24px -16px' }}>
      <style>{`
        @keyframes blob1 { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(80px,-60px) scale(1.15); } 66% { transform:translate(-50px,40px) scale(0.88); } }
        @keyframes blob2 { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(-70px,50px) scale(1.12); } 66% { transform:translate(60px,-40px) scale(0.9); } }
        @keyframes blob3 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(60px,-70px) scale(1.1); } }
        @media (max-width: 720px) {
          .amour-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 721px) and (max-width: 1080px) {
          .amour-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @keyframes coaching-pulse { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
        .coaching-cta { display:inline-flex; align-items:center; text-decoration:none; padding:16px 28px; border-radius:999px; font-weight:700; font-size:15px; font-family:var(--font-dm-sans,sans-serif); transition:transform 0.2s, box-shadow 0.2s; animation:coaching-pulse 2.5s ease-in-out infinite; will-change:transform; }
        .coaching-cta:hover { transform:translateY(-3px) !important; animation:none; }
        .coaching-cta-light { background:#FFF1E7; color:#660A43; box-shadow:0 8px 24px rgba(0,0,0,0.25); border:1.5px solid rgba(232,99,122,0.55); }
        .coaching-cta-light:hover { box-shadow:0 12px 30px rgba(0,0,0,0.3); }
        .coaching-cta-dark { background:#660A43; color:#fff; box-shadow:0 6px 20px rgba(102,10,67,0.3); }
        .coaching-cta-dark:hover { box-shadow:0 10px 28px rgba(102,10,67,0.5); }
        .amour-btn { transition: transform 0.2s, box-shadow 0.2s; animation: coaching-pulse 2.5s ease-in-out infinite; will-change: transform; }
        .amour-btn:hover:not(:disabled) { transform: translateY(-3px) !important; animation: none; box-shadow: 0 10px 28px rgba(102,10,67,0.4); }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section style={{
        paddingTop: 'clamp(130px,14vw,190px)',
        paddingLeft: 'clamp(32px,5vw,80px)',
        paddingRight: 'clamp(32px,5vw,80px)',
        paddingBottom: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #660A43 0%, #8a1258 50%, #660A43 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,25,105,0.6) 0%, transparent 65%)', top: '20%', right: '-10%', filter: 'blur(50px)', animation: 'blob1 6s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,15,85,0.55) 0%, transparent 65%)', bottom: '0%', left: '-10%', filter: 'blur(45px)', animation: 'blob2 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(210,40,120,0.5) 0%, transparent 65%)', top: '50%', left: '20%', filter: 'blur(50px)', animation: 'blob3 7s ease-in-out infinite' }} />
        </div>
        <div data-fade style={{ maxWidth: 680, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,241,231,0.55)', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>Abrilove</p>
          <h1 style={{ fontFamily: 'var(--font-playfair,serif)', color: '#FFF1E7', fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 20 }}>
            La bibliothèque
          </h1>
          <p style={{ color: 'rgba(255,241,231,0.8)', fontSize: 'clamp(15px,1.6vw,17px)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            Des guides gratuits pour mieux comprendre tes relations, te reconnecter à toi-même et avancer avec clarté.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', lineHeight: 0, zIndex: 2 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
            <path d="M0,35 Q720,58 1440,35 L1440,80 L0,80 Z" fill="#FFF4F7" />
          </svg>
        </div>
      </section>

      {/* ── EBOOKS GRATUITS ── */}
      <section style={{
        background: '#FFF4F7',
        padding: 'clamp(32px,4vw,56px) clamp(32px,5vw,80px) clamp(56px,6vw,80px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div data-fade>
            <p style={{ color: '#660A43', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
              Ressources gratuites
            </p>
            <h2 style={{
              fontFamily: 'var(--font-playfair,serif)',
              color: '#660A43', fontSize: 'clamp(24px,3.5vw,40px)',
              fontWeight: 700, lineHeight: 1.3, marginBottom: 48,
            }}>
              Tes guides offerts
            </h2>
          </div>
          <div
            className="amour-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 28,
            }}
          >
            {EBOOKS.map((ebook, i) => (
              <div key={ebook.id} data-fade className="amour-card" style={{ transitionDelay: `${i * 0.08}s` }}>
                <EbookCard ebook={ebook} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION SOMBRE ── */}
      <section style={{
        background: 'linear-gradient(180deg, #660A43 0%, #8a1258 50%, #660A43 100%)',
        padding: 'calc(clamp(24px,3vw,44px) + 80px) clamp(32px,5vw,80px)',
        position: 'relative',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', top: -1, left: 0, width: '100%', lineHeight: 0, zIndex: 2, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
            <path d="M0,0 L0,45 Q720,22 1440,45 L1440,0 Z" fill="#FFF4F7" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', lineHeight: 0, zIndex: 2, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
            <path d="M0,35 Q720,58 1440,35 L1440,80 L0,80 Z" fill="#FFF4F7" />
          </svg>
        </div>
        <div data-fade style={{ maxWidth: 620, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(255,241,231,0.55)', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>L'Abri IA</p>
          <h2 style={{ fontFamily: 'var(--font-playfair,serif)', color: '#FFF1E7', fontSize: 'clamp(22px,3.5vw,38px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 20 }}>
            Tu veux aller plus loin ?
          </h2>
          <p style={{ color: 'rgba(255,241,231,0.8)', fontSize: 'clamp(15px,1.6vw,17px)', lineHeight: 1.75, marginBottom: 36 }}>
            L'Abri IA t'accompagne à tout moment. Pose tes questions, comprends tes schémas, avance à ton rythme.
          </p>
          <a href="https://ia.abrilove.fr" className="coaching-cta coaching-cta-light">
            Découvrir l'Abri IA
          </a>
        </div>
      </section>

      {/* ── COACHING ── */}
      <section style={{ background: '#FFF4F7', padding: 'clamp(32px,4vw,56px) clamp(32px,5vw,80px) clamp(56px,6vw,80px)' }}>
        <div data-fade style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ color: '#660A43', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Coaching</p>
          <h2 style={{ fontFamily: 'var(--font-playfair,serif)', color: '#660A43', fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>
            Envie d'en parler de vive voix ?
          </h2>
          <p style={{ color: '#5a3040', fontSize: 'clamp(15px,1.6vw,17px)', lineHeight: 1.85, marginBottom: 36 }}>
            Une séance de coaching individuelle en visio avec Sofi. Pendant une heure, tu poses tout, on analyse ta situation, et tu repars avec des repères clairs.
          </p>
          <a href="/coaching" className="coaching-cta coaching-cta-dark">
            Je réserve mon appel
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
