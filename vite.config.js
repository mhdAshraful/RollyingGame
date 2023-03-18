import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl()
  ],
  root: './', // if index.html is inside src then "src/"
  base: './',
  publicDir: './public',
  server: {
    host: true,
    open: './index.html'
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    sourcemap: true
  }
})