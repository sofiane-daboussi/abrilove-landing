import { readdir, mkdir, rename } from 'fs/promises'

// Move all output files into out/accro/ so paths match the basePath
// Keep _redirects and images at root level
const KEEP_AT_ROOT = new Set(['_redirects', 'images'])

const entries = await readdir('out')
await mkdir('out/accro', { recursive: true })

for (const entry of entries) {
  if (!KEEP_AT_ROOT.has(entry) && entry !== 'accro') {
    await rename(`out/${entry}`, `out/accro/${entry}`)
  }
}

console.log('postbuild: moved output into out/accro/')
