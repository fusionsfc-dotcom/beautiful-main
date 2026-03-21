import { defineConfig } from 'vite'
import path from 'path'
import { readFileSync, existsSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** Resolves figma:asset/* imports: Supabase URL if in image-assets.json, else placeholder */
function figmaAssetPlaceholder() {
  let assets: Record<string, string> = {}
  const assetsPath = path.resolve(__dirname, 'image-assets.json')
  if (existsSync(assetsPath)) {
    try {
      assets = JSON.parse(readFileSync(assetsPath, 'utf-8'))
    } catch {}
  }

  return {
    name: 'figma-asset-placeholder',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) return id
    },
    load(id: string) {
      if (id.startsWith('figma:asset/')) {
        const hash = id.replace('figma:asset/', '').replace('.png', '')
        const url = assets[hash]
        const fallback = '/placeholder.png'
        return `export default ${JSON.stringify(url || fallback)}`
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetPlaceholder(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
