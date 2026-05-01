import AbriMailClient from './AbriMailClient'

export const metadata = {
  title: "L'Abri Mail — Abrilove",
  description: "Ta lecture écrite personnalisée. Tu m'écris, je te réponds sous 24h avec une analyse lucide et bienveillante de ta situation amoureuse.",
}

export default function AbriMailRoute() {
  return <AbriMailClient />
}
