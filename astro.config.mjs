import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  site: process.env.SITE_URL || 'https://el-rustico.vercel.app',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind(), sitemap(), react()],
  server: {
    allowedHosts: true,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
    ssr: {
      noExternal: ['@mui/material', '@emotion/react', '@emotion/styled'],
    },
    optimizeDeps: {
      include: ['@mui/material', '@emotion/react', '@emotion/styled'],
    },
  },
});
