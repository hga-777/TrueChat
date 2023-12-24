import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy : {   //added because backend and frontend have different URL
      '/api' : {
        target : 'http://localhost:3000' , 
        secure:false,
      },
    },
  },cn
})
