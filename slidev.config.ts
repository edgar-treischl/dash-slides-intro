import { defineConfig } from 'slidev/config'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  base: '/dash-slides-intro/',

  vite: {
    plugins: [
      UnoCSS(),
    ],

    build: {
      chunkSizeWarningLimit: 5000,
    },
  },
})