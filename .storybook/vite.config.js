import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The same React and Tailwind plugins as the app, so src/index.css builds exactly as it does there.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { __BUILD_TIME__: JSON.stringify(''), __WORKBOOKS__: JSON.stringify({}), __DEPLOY_BRANCH__: JSON.stringify('') },
})
