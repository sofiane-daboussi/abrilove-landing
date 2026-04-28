'use client'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    if (window.location.hostname === 'accro.abrilove.fr') {
      window.location.replace('/accro')
    } else {
      window.location.replace('https://www.abrilove.fr')
    }
  }, [])
  return null
}
