'use client'
import { useState, useEffect, useRef, memo } from 'react'
import Header from './Header'
import Footer from './Footer'
import Link from 'next/link'

const IPhoneChat = memo(function IPhoneChat() {
  const [op, setOp] = useState({ m1:0, t1:0, m2:0, m3:0, t2:0, m4:0 })
  const msgsRef = useRef(null)
  useEffect(() => {
    const timers = []
    function show(key) { setOp(prev => ({ ...prev, [key]: 1 })); if (msgsRef.current) msgsRef.current.scrollTop = 9999 }
    function hide(key) { setOp(prev => ({ ...prev, [key]: 0 })) }
    function reset() { setOp({ m1:0, t1:0, m2:0, m3:0, t2:0, m4:0 }); if (msgsRef.current) msgsRef.current.scrollTop = 0; timers.push(setTimeout(run, 800)) }
    function run() {
      timers.push(setTimeout(() => show('m1'), 600))
      timers.push(setTimeout(() => show('t1'), 2000))
      timers.push(setTimeout(() => { hide('t1'); show('m2') }, 4500))
      timers.push(setTimeout(() => show('m3'), 7000))
      timers.push(setTimeout(() => show('t2'), 8800))
      timers.push(setTimeout(() => { hide('t2'); show('m4') }, 12000))
      timers.push(setTimeout(reset, 17000))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])
  const row = (key, align, children) => (
    <div style={{ display:'flex', flexDirection:'column', alignItems:align, opacity:op[key], transform:op[key]?'translateY(0)':'translateY(8px)', transition:'opacity 0.4s,transform 0.4s', pointerEvents:'none' }}>{children}</div>
  )
  return (
    <div className="iphone" style={{ width:260, background:'#FFF1E7', borderRadius:44, border:'11px solid #1a0812', boxShadow:'0 0 0 1px #3a1020,0 30px 70px rgba(0,0,0,0.4)', overflow:'hidden', margin:'0 auto', fontFamily:'-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif' }}>
      <div style={{ background:'#FFF1E7', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 22px 8px', fontSize:13, fontWeight:700, color:'#2a0a1a', position:'relative' }}>
        <span>9:41</span>
        <div style={{ position:'absolute', top:6, left:'50%', transform:'translateX(-50%)', width:95, height:30, background:'#1a0812', borderRadius:20 }} />
        <span>●●●</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 14px 10px', borderBottom:'1px solid rgba(102,10,67,0.1)' }}>
        <span style={{ color:'#660A43', fontSize:22, fontWeight:300 }}>‹</span>
        <div style={{ width:34, height:34, borderRadius:'50%', overflow:'hidden', flexShrink:0 }}>
          <img src="/images/hero-avatar.avif" style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="" />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#2a0a1a' }}>Sofi & Oli, Abrilove</div>
          <div style={{ fontSize:10, color:'#4caf50', fontWeight:500 }}>● En ligne</div>
        </div>
      </div>
      <div ref={msgsRef} style={{ padding:12, display:'flex', flexDirection:'column', gap:7, minHeight:340, background:'#FFF1E7', overflow:'hidden' }}>
        {row('m1','flex-end', <div style={{ maxWidth:'80%', padding:'9px 13px', borderRadius:'18px 18px 4px 18px', fontSize:12.5, lineHeight:1.45, background:'#660A43', color:'#fff' }}>Il me laisse en vu depuis 2 jours… 😞</div>)}
        {row('t1','flex-start', <div style={{ display:'flex', gap:4, padding:'10px 14px', background:'rgba(102,10,67,0.1)', borderRadius:'18px 18px 18px 4px' }}><span style={{ width:6,height:6,borderRadius:'50%',background:'#660A43',opacity:0.35,animation:'abri-dot 1.2s infinite',display:'inline-block' }}/><span style={{ width:6,height:6,borderRadius:'50%',background:'#660A43',opacity:0.35,animation:'abri-dot 1.2s 0.2s infinite',display:'inline-block' }}/><span style={{ width:6,height:6,borderRadius:'50%',background:'#660A43',opacity:0.35,animation:'abri-dot 1.2s 0.4s infinite',display:'inline-block' }}/></div>)}
        {row('m2','flex-start', <><div style={{ fontSize:9.5, fontWeight:700, color:'#660A43', marginBottom:3, paddingLeft:2 }}>Sofi & Oli 💛</div><div style={{ maxWidth:'80%', padding:'9px 13px', borderRadius:'18px 18px 18px 4px', fontSize:12.5, lineHeight:1.45, background:'rgba(102,10,67,0.1)', color:'#2a0a1a' }}>C'est nouveau chez lui ou il l'a déjà fait avant ?</div></>)}
        {row('m3','flex-end', <div style={{ maxWidth:'80%', padding:'9px 13px', borderRadius:'18px 18px 4px 18px', fontSize:12.5, lineHeight:1.45, background:'#660A43', color:'#fff' }}>Jamais… 😔</div>)}
        {row('t2','flex-start', <div style={{ display:'flex', gap:4, padding:'10px 14px', background:'rgba(102,10,67,0.1)', borderRadius:'18px 18px 18px 4px' }}><span style={{ width:6,height:6,borderRadius:'50%',background:'#660A43',opacity:0.35,animation:'abri-dot 1.2s infinite',display:'inline-block' }}/><span style={{ width:6,height:6,borderRadius:'50%',background:'#660A43',opacity:0.35,animation:'abri-dot 1.2s 0.2s infinite',display:'inline-block' }}/><span style={{ width:6,height:6,borderRadius:'50%',background:'#660A43',opacity:0.35,animation:'abri-dot 1.2s 0.4s infinite',display:'inline-block' }}/></div>)}
        {row('m4','flex-start', <><div style={{ fontSize:9.5, fontWeight:700, color:'#660A43', marginBottom:3, paddingLeft:2 }}>Sofi & Oli 💛</div><div style={{ maxWidth:'80%', padding:'9px 13px', borderRadius:'18px 18px 18px 4px', fontSize:12.5, lineHeight:1.45, background:'rgba(102,10,67,0.1)', color:'#2a0a1a' }}>Les hommes se retirent rarement par indifférence. Voilà quoi faire 👇</div></>)}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px 18px', background:'#FFF1E7', borderTop:'1px solid rgba(102,10,67,0.08)' }}>
        <div style={{ flex:1, background:'rgba(102,10,67,0.07)', borderRadius:20, padding:'9px 13px', fontSize:12, color:'rgba(42,10,26,0.35)' }}>Écris ta situation…</div>
        <div style={{ width:30, height:30, background:'#660A43', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="#FFF1E7"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
        </div>
      </div>
    </div>
  )
})

const COURS = [
  {
    id: 'abri-de-soi',
    cover: '/images/cours-abri-de-soi.png',
    title: "L'Abri de soi",
    description: "Le programme dans lequel tu cesses enfin de douter de ta valeur. Tu apprends à ne plus courir après la validation, à fermer les portes du passé et à reconstruire une confiance solide, celle que plus rien ni personne ne peut t'enlever.",
    link: 'https://abri-love.webflow.io/re-construis-ta-confiance',
  },
]

const PAID_EBOOKS = [
  {
    id: 'dating',
    cover: '/images/datingg.png',
    title: 'Comment trouver l\'amour sur les applications de rencontre',
    description: 'Le guide ultime de 250 pages pour enfin trouver la personne qui te mérite.',
    link: 'https://abri-love.webflow.io/ebook-dating',
  },
  {
    id: 'ghosting',
    cover: '/images/ghostingg.png',
    title: 'Tu t\'es encore fait ghoster',
    description: 'Comprends enfin pourquoi il t\'a ghostée, sans remettre en question ta valeur.',
    link: 'https://abri-love.webflow.io/stop-ghosting',
  },
]

const EBOOKS = [
  {
    id: 'reperes',
    listId: 21,
    cover: '/images/ebook-7-reperes.png',
    title: '7 repères pour savoir si tu perds ton temps avec lui',
    description: 'Et ne plus jamais te tromper en amour.',
  },
  {
    id: 'premier-rdv',
    listId: 23,
    cover: '/images/ebook-premier-rdv.png',
    title: 'Le guide ultime pour un premier rendez-vous réussi',
    description: 'Dis stop aux dates qui te font perdre ton temps avec la mauvaise personne.',
  },
  {
    id: 'ghostee',
    listId: 19,
    cover: '/images/ebook-ghostee.png',
    title: "Tu t'es encore fait ghoster – Partie 1",
    description: "Reprends en main tes relations et ne laisse plus jamais une seule personne te ghoster.",
  },
  {
    id: '7-habitudes',
    listId: 20,
    cover: '/images/ebook-7-habitudes.png',
    title: '7 habitudes qui reconstruisent ta confiance (vraiment)',
    description: "Les 7 habitudes concrètes pour reconstruire une confiance solide et cesser de douter de toi en amour.",
  },
  {
    id: 'courir',
    listId: 22,
    cover: '/images/ebook-courir.png',
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
      height: '100%',
    }}>
      <div style={{ position: 'relative', paddingTop: 40, background: '#fff' }}>
        <img
          src={ebook.cover}
          alt={ebook.title}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div style={{
          position: 'absolute', top: 10, left: 14,
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
        <p style={{ color: '#7a4060', fontSize: 14, lineHeight: 1.65, marginBottom: 16, flex: 1 }}>
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
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll('[data-fade]:not(.fade-in)')
      els.forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('fade-in')
      })
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('fade-in'); obs.unobserve(entry.target) }
        })
      }, { threshold: 0 })
      document.querySelectorAll('[data-fade]:not(.fade-in)').forEach(el => obs.observe(el))
      return obs
    }
    const obs = run()
    return () => obs.disconnect()
  }, [activeTab])

  return (
    <div style={{ margin: '-24px -16px' }}>
      <style>{`
        @keyframes blob1 { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(80px,-60px) scale(1.15); } 66% { transform:translate(-50px,40px) scale(0.88); } }
        @keyframes blob2 { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(-70px,50px) scale(1.12); } 66% { transform:translate(60px,-40px) scale(0.9); } }
        @keyframes blob3 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(60px,-70px) scale(1.1); } }
        @media (max-width: 720px) {
          .amour-grid { grid-template-columns: 1fr !important; }
          .amour-tabs { flex-wrap: wrap !important; }
          .amour-tab { font-size: 12px !important; padding: 8px 16px !important; }
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
        .amour-card { height: auto; }
        .amour-btn { transition: transform 0.2s, box-shadow 0.2s; animation: coaching-pulse 2.5s ease-in-out infinite; will-change: transform; }
        .amour-btn:hover:not(:disabled) { transform: translateY(-3px) !important; animation: none; box-shadow: 0 10px 28px rgba(102,10,67,0.4); }
        .amour-tab { background: transparent; border: 2px solid rgba(102,10,67,0.25); color: #660A43; border-radius: 999px; padding: 10px 22px; font-size: 14px; font-weight: 700; font-family: var(--font-dm-sans,sans-serif); cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .amour-tab:hover { border-color: #660A43; background: rgba(102,10,67,0.06); }
        .amour-tab.active { background: #660A43; color: #fff; border-color: #660A43; }
        @keyframes abri-dot { 0%,60%,100% { transform:scale(0.7); opacity:0.35; } 30% { transform:scale(1); opacity:1; } }
        @keyframes abri-bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
        .abria-2cols { display: flex; align-items: center; gap: 60px; }
        @media (max-width: 720px) { .abria-2cols { flex-direction: column; gap: 40px; } }
        @media (min-width: 721px) { .coaching-center { text-align: center; } .coaching-center a { justify-content: center; } }
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
        background: 'linear-gradient(180deg, #660A43 0%, #660A43 50%, #8a1258 75%, #660A43 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,25,105,0.6) 0%, transparent 65%)', top: '40%', right: '-10%', filter: 'blur(50px)', animation: 'blob1 6s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,15,85,0.55) 0%, transparent 65%)', bottom: '0%', left: '-10%', filter: 'blur(45px)', animation: 'blob2 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(210,40,120,0.5) 0%, transparent 65%)', top: '50%', left: '20%', filter: 'blur(50px)', animation: 'blob3 7s ease-in-out infinite' }} />
        </div>
        <div data-fade style={{ maxWidth: 680, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,241,231,0.55)', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>Abrilove</p>
          <h1 style={{ fontFamily: 'var(--font-playfair,serif)', color: '#FFF1E7', fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 20 }}>
            La bibliothèque
          </h1>
          <p style={{ color: 'rgba(255,241,231,0.8)', fontSize: 'clamp(15px,1.6vw,17px)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            Des guides, programmes et outils pour mieux comprendre tes relations, te reconnecter à toi-même et avancer avec clarté.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', lineHeight: 0, zIndex: 2 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
            <path d="M0,35 Q720,58 1440,35 L1440,80 L0,80 Z" fill="#FFF4F7" />
          </svg>
        </div>
      </section>

      {/* ── TABS ── */}
      <div style={{ background: '#FFF4F7', paddingTop: 20, paddingBottom: activeTab === 'guides' ? 24 : 32, paddingLeft: 'clamp(32px,5vw,80px)', paddingRight: 'clamp(32px,5vw,80px)', borderBottom: '1px solid rgba(102,10,67,0.08)' }}>
        <div data-fade className="amour-tabs" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 'all', label: 'Tout' },
            { id: 'gratuit', label: 'Ressources gratuites' },
            { id: 'guides', label: 'Guides' },
            { id: 'cours', label: 'Cours & Workshops' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`amour-tab${activeTab === tab.id ? ' active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── EBOOKS GRATUITS ── */}
      <section style={{
        background: '#FFF4F7',
        padding: 'clamp(32px,4vw,56px) clamp(32px,5vw,80px) clamp(56px,6vw,80px)',
        display: activeTab === 'all' || activeTab === 'gratuit' ? 'block' : 'none',
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
          <div className="amour-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {EBOOKS.map((ebook, i) => (
              <div key={ebook.id} data-fade className="amour-card" style={{ transitionDelay: `${i * 0.08}s` }}>
                <EbookCard ebook={ebook} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EBOOKS PAYANTS (fond sombre) ── */}
      <section style={{
        background: 'linear-gradient(180deg, #660A43 0%, #8a1258 50%, #660A43 100%)',
        padding: 'calc(clamp(32px,4vw,56px) + 80px) clamp(32px,5vw,80px) calc(clamp(32px,4vw,56px) + 80px)',
        position: 'relative',
        display: activeTab === 'all' || activeTab === 'guides' ? 'block' : 'none',
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
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div data-fade>
            <p style={{ color: 'rgba(255,241,231,0.55)', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Nos guides</p>
            <h2 style={{ fontFamily: 'var(--font-playfair,serif)', color: '#FFF1E7', fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 700, lineHeight: 1.3, marginBottom: 48 }}>
              Tu veux aller plus loin ?
            </h2>
          </div>
          <div className="amour-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {PAID_EBOOKS.map((ebook, i) => (
              <div key={ebook.id} data-fade className="amour-card" style={{ transitionDelay: `${i * 0.08}s`, height: '100%' }}>
                <a href={ebook.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 20, border: '1.5px solid rgba(255,241,231,0.3)', background: 'transparent' }}>
                  <div style={{ position: 'relative', paddingTop: 24 }}>
                    <img src={ebook.cover} alt={ebook.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div style={{ padding: '8px 20px 28px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'var(--font-playfair,serif)', color: '#FFF1E7', fontSize: 17, fontWeight: 700, lineHeight: 1.35, marginBottom: 10 }}>{ebook.title}</h3>
                    <p style={{ color: 'rgba(255,241,231,0.72)', fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{ebook.description}</p>
                    <span className="amour-btn" style={{ background: '#FFF1E7', color: '#660A43', border: 'none', borderRadius: 10, padding: '13px 20px', fontSize: 14, fontWeight: 700, textAlign: 'center', display: 'block' }}>
                      Découvrir le guide
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURS & WORKSHOPS ── */}
      <section style={{
        background: '#FFF4F7',
        padding: 'clamp(32px,4vw,56px) clamp(32px,5vw,80px) clamp(56px,6vw,80px)',
        display: activeTab === 'all' || activeTab === 'cours' ? 'block' : 'none',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div data-fade>
            <p style={{ color: '#660A43', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Cours & Workshops</p>
            <h2 style={{ fontFamily: 'var(--font-playfair,serif)', color: '#660A43', fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 700, lineHeight: 1.3, marginBottom: 48 }}>
              Les programmes
            </h2>
          </div>
          <div className="amour-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, alignItems: 'start' }}>
            {COURS.map((cours, i) => (
              <div key={cours.id} data-fade className="amour-card" style={{ transitionDelay: `${i * 0.08}s` }}>
                <a href={cours.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', background: '#fff', borderRadius: 20, boxShadow: '0 6px 32px rgba(102,10,67,0.10)' }}>
                  <div style={{ position: 'relative', padding: '20px 20px 0' }}>
                    <img src={cours.cover} alt={cours.title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }} />
                    <div style={{ position: 'absolute', top: 30, left: 30, background: '#E8196E', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 6, padding: '4px 10px' }}>Programme</div>
                  </div>
                  <div style={{ padding: '20px 20px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-playfair,serif)', color: '#660A43', fontSize: 17, fontWeight: 700, lineHeight: 1.35, marginBottom: 10 }}>{cours.title}</h3>
                    <p style={{ color: '#7a4060', fontSize: 14, lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{cours.description}</p>
                    <span className="amour-btn" style={{ background: '#660A43', color: '#fff', border: 'none', borderRadius: 10, padding: '13px 20px', fontSize: 14, fontWeight: 700, textAlign: 'center', display: 'block' }}>
                      Découvrir le programme
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION SOMBRE (Abri IA) ── */}
      <section style={{
        background: 'linear-gradient(180deg, #660A43 0%, #8a1258 50%, #660A43 100%)',
        padding: 'calc(clamp(24px,3vw,44px) + 80px) clamp(32px,5vw,80px)',
        position: 'relative',
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
        <div data-fade style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="abria-2cols">
            <div style={{ flex: 1 }}>
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
            <div style={{ flexShrink: 0 }}>
              <IPhoneChat />
            </div>
          </div>
        </div>
      </section>

      {/* ── COACHING ── */}
      <section style={{ background: '#FFF4F7', padding: 'clamp(32px,4vw,56px) clamp(32px,5vw,80px) clamp(56px,6vw,80px)' }}>
        <div data-fade className="coaching-center" style={{ maxWidth: 640, margin: '0 auto' }}>
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
