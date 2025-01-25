import path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), nxViteTsPaths()],
  worker: {
    plugins: () => [nxViteTsPaths()]
  },
  build: {
    target: 'es2022' // Top-level await is supported.
  },
  // TODO: I don't understand at all how to tell the optimizer exclude
  // storybook's cache. Put everything that I can think of here.
  optimizeDeps: {
    exclude: [path.resolve(__dirname, 'node_modules/.cache/storybook')],
    force: true
  }
})
