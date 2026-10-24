import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('remark-math')) {
              return 'math'
            }
            if (
              id.includes('react-markdown') ||
              id.includes('remark-gfm') ||
              id.includes('rehype-katex')
            ) {
              return 'markdown'
            }
            if (id.includes('three') || id.includes('postprocessing') || id.includes('ogl')) {
              return 'three'
            }
          }
        },
      },
    },
  },
})
