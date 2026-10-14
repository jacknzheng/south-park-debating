import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves the site at jacknzheng.github.io/south-park-debating/
  base: '/south-park-debating/',
  plugins: [
    tanstackStart(),
    react(),
  ],
})
