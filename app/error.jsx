'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    const msg = error?.message ?? ''
    if (msg.includes('chunk') || msg.includes('Loading') || msg.includes('ChunkLoad')) {
      window.location.reload()
    }
  }, [error])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: 24,
      background: '#660A43',
      fontFamily: 'sans-serif',
    }}>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Une erreur est survenue.</p>
      <button
        onClick={() => reset()}
        style={{
          background: '#FFF4F7',
          color: '#660A43',
          border: 'none',
          borderRadius: 999,
          padding: '12px 24px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Réessayer
      </button>
    </div>
  )
}
