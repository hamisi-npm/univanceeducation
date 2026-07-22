/**
 * Syncs Site Settings favicon (or logo) from the Content Lake into
 * `studio/static/` so Sanity Studio uses the brand icon in the browser tab.
 *
 * Usage (from studio/):
 *   npm run favicon:sync
 *
 * Studio cannot load favicons dynamically from CMS at runtime — it only
 * serves files from `static/`. Re-run this after changing the favicon/logo.
 */

import {mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staticDir = path.resolve(__dirname, '../static')

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'wh3g5h3l'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2025-01-01'

const groq = encodeURIComponent(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  "url": coalesce(favicon.asset->url, logo.asset->url),
  name
}`)

async function fetchImageBuffer(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download icon (${response.status}): ${url}`)
  }
  return Buffer.from(await response.arrayBuffer())
}

function pngToSvgWrapper(pngBase64, size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <image width="${size}" height="${size}" href="data:image/png;base64,${pngBase64}" xlink:href="data:image/png;base64,${pngBase64}" preserveAspectRatio="xMidYMid meet"/>
</svg>
`
}

async function main() {
  const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${groq}`
  const payload = await fetch(endpoint).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Sanity query failed (${response.status})`)
    }
    return response.json()
  })

  const doc = payload.result
  if (!doc?.url) {
    throw new Error(
      'No favicon or logo URL found on siteSettings. Upload a Favicon (or Primary logo) in Studio and publish.',
    )
  }

  console.log(`Fetching brand icon for ${doc.name ?? 'site'}…`)
  console.log(doc.url)

  const sourceUrl = doc.url.includes('?')
    ? `${doc.url}&w=512&h=512&fit=max`
    : `${doc.url}?w=512&h=512&fit=max`

  const png = await fetchImageBuffer(sourceUrl)
  const base64 = png.toString('base64')

  await mkdir(staticDir, {recursive: true})

  await Promise.all([
    writeFile(path.join(staticDir, 'favicon-512.png'), png),
    writeFile(path.join(staticDir, 'favicon-192.png'), png),
    writeFile(path.join(staticDir, 'apple-touch-icon.png'), png),
    writeFile(path.join(staticDir, 'favicon.ico'), png),
    writeFile(path.join(staticDir, 'favicon.svg'), pngToSvgWrapper(base64, 512)),
  ])

  console.log(`Wrote Studio favicons to ${staticDir}`)
  console.log('Restart `sanity dev` (or redeploy Studio) if the tab icon is cached.')
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
