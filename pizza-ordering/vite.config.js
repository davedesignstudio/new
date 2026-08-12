import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  server: {
    host: true,
    allowedHosts: [
      '.cursorvm.com',
      '85ba1247d0994d473401-pod-fysfio5ypvd5jjcfyz3z3nloka-5173.us7.cursorvm.com',
    ],
  },
})
