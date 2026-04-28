'use client'
import dynamic from 'next/dynamic'

const AccroInteractive = dynamic(() => import('./AccroPage'), { ssr: false })

export default function AccroInteractiveLoader() {
  return <AccroInteractive />
}
