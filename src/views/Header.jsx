'use client'
import { useState } from 'react'

const LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Quiz', href: '/quiz-gratuit' },
  { label: 'Coaching', href: '/coaching' },
  { label: 'Ressources', href: '/amour' },
  { label: 'Sofi & Oli', href: '/sofi-et-oli' },
  { label: 'Écris nous', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(26,0,17,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <a href="/" style={{
          fontFamily: 'var(--font-playfair, serif)',
          color: '#fff',
          fontSize: 20,
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}>
          Abrilove
        </a>

        {/* Desktop */}
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} style={{
              color: l.href === '/contact' ? '#e8a0c8' : '#b08090',
              fontSize: 13,
              textDecoration: 'none',
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = l.href === '/contact' ? '#e8a0c8' : '#b08090'}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Burger mobile */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: '#fff',
            fontSize: 22,
          }}
          className="burger"
          aria-label="Menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: '#1a0011',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              color: l.href === '/contact' ? '#e8a0c8' : '#b08090',
              fontSize: 15,
              textDecoration: 'none',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
            }}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 680px) {
          .desktop-nav { display: none !important; }
          .burger { display: block !important; }
        }
      `}</style>
    </header>
  )
}
