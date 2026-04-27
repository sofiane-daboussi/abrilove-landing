import dynamic from 'next/dynamic'

const AccroPage = dynamic(() => import('../../src/pages/AccroPage'), { ssr: false })

export default function AccroRoute() {
  return <AccroPage />
}
