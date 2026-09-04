import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const assetsDirectory = join(process.cwd(), 'dist', 'assets')
const maxJavaScriptBytes = 2 * 1024 * 1024
const maxSingleChunkBytes = 500 * 1024

const files = (await readdir(assetsDirectory))
  .filter(file => file.endsWith('.js'))
  .map(async file => ({ file, size: (await stat(join(assetsDirectory, file))).size }))

const javascriptFiles = await Promise.all(files)
const totalBytes = javascriptFiles.reduce((total, file) => total + file.size, 0)
const largestChunk = javascriptFiles.reduce(
  (largest, file) => (file.size > largest.size ? file : largest),
  { file: 'none', size: 0 }
)

const formatBytes = bytes => `${(bytes / 1024).toFixed(1)} KiB`

console.log(`Bundle check: ${formatBytes(totalBytes)} across ${javascriptFiles.length} JavaScript chunks.`)
console.log(`Largest chunk: ${largestChunk.file} (${formatBytes(largestChunk.size)}).`)

if (totalBytes > maxJavaScriptBytes || largestChunk.size > maxSingleChunkBytes) {
  console.error(
    `Bundle budget exceeded. Limits are ${formatBytes(maxJavaScriptBytes)} total and `
    + `${formatBytes(maxSingleChunkBytes)} per chunk.`
  )
  process.exitCode = 1
}
