import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

// Get the directory where vite.config.ts is located
const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` 
  // Use __dirname to ensure we're looking in the same directory as vite.config.ts
  // This works in containers and different working directories
  const envDir = resolve(__dirname)
  
  // Check what env files actually exist
  const envFiles = {
    base: resolve(envDir, '.env'),
    production: resolve(envDir, '.env.production'),
    development: resolve(envDir, '.env.development'),
    local: resolve(envDir, '.env.local'),
    productionLocal: resolve(envDir, '.env.production.local'),
  }
  
  console.log('🔍 Build Mode:', mode)
  console.log('🔍 Env Directory:', envDir)
  console.log('🔍 Working Directory:', process.cwd())
  console.log('🔍 Checking env files:')
  Object.entries(envFiles).forEach(([name, path]) => {
    const exists = existsSync(path)
    console.log(`  ${exists ? '✓' : '✗'} ${name}: ${path}`)
    if (exists) {
      try {
        const content = readFileSync(path, 'utf-8')
        const match = content.match(/VITE_API_URL\s*=\s*(.+)/)
        if (match) {
          console.log(`    → VITE_API_URL = ${match[1].trim()}`)
        }
      } catch (e) {
        console.log(`    → Error reading: ${e}`)
      }
    }
  })
  
  // Load env - use 'VITE_' prefix to only load VITE_ prefixed vars
  // Vite automatically loads: .env, .env.local, .env.[mode], .env.[mode].local
  // Later files override earlier ones, so .env.production.local > .env.production > .env.local > .env
  const env = loadEnv(mode, envDir, 'VITE_')
  
  console.log('🔍 All loaded env vars with VITE_ prefix:')
  Object.keys(env)
    .filter(k => k.startsWith('VITE_'))
    .forEach(k => console.log(`  ${k} = ${env[k]}`))
  
  // FORCE use production URL if mode is production and we have it in .env.production
  let apiUrl = env.VITE_API_URL || process.env.VITE_API_URL
  
  // If mode is production, explicitly read from .env.production file
  if (mode === 'production' && existsSync(envFiles.production)) {
    try {
      const prodContent = readFileSync(envFiles.production, 'utf-8')
      const prodMatch = prodContent.match(/VITE_API_URL\s*=\s*(.+)/)
      if (prodMatch) {
        const prodUrl = prodMatch[1].trim()
        console.log('🔧 FORCING production URL from .env.production:', prodUrl)
        apiUrl = prodUrl
      }
    } catch (e) {
      console.log('⚠️  Error reading .env.production:', e)
    }
  }
  
  console.log('🔍 VITE_API_URL from loadEnv:', env.VITE_API_URL || 'NOT FOUND')
  console.log('🔍 VITE_API_URL from process.env:', process.env.VITE_API_URL || 'NOT FOUND')
  console.log('🔍 Final VITE_API_URL:', apiUrl || 'NOT FOUND - WILL USE FALLBACK')
  
  return {
    plugins: [
      devtools(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
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
    // Make env vars available to the app
    envPrefix: 'VITE_',
    // Explicitly set envDir to ensure env files are found
    envDir: envDir,
    // Define the API URL explicitly if we found it
    define: apiUrl ? {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
    } : {},
  }
})
