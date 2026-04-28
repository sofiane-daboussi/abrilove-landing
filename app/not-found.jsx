'use client'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    window.location.replace('https://www.abrilove.fr' + window.location.pathname)
  }, [])
  return null
}
