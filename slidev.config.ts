import { defineConfig } from 'slidev/config'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  base: '/dash-slides-intro/',

  vite: {
    plugins: [
      UnoCSS(), // ✅ THIS is the missing piece
    ],

    build: {
      chunkSizeWarningLimit: 5000,
    },
  },
})