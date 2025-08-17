

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // If using React
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // Add this if you are using React
    tailwindcss(),
  ],
});