import CgvClient from './CgvClient'

export const metadata = {
  title: 'CGV — Abrilove',
  description: 'Conditions Générales de Vente du site abrilove.fr — e-books, coaching, abonnement Abr(IA).',
}

export default function CgvRoute() {
  return <CgvClient />
}
