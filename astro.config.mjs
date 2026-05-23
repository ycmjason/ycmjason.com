import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.ycmjason.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
