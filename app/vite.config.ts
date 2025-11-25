import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  // Force production URL from .env.production when building for production
  let apiUrl = process.env.VITE_API_URL
  if (mode === 'production') {
    const prodEnvPath = resolve(__dirname, '.env.production')
    if (existsSync(prodEnvPath)) {
      const content = readFileSync(prodEnvPath, 'utf-8')
      const match = content.match(/VITE_API_URL\s*=\s*(.+)/)
      if (match) apiUrl = match[1].trim()
    }
  }

  return {
    plugins: [
      devtools(),
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
    ],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: apiUrl ? {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
    } : {},
  }
})
