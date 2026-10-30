import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Keep syntax highlighting inside the site's four-color palette as well.
const codeTheme = (name, type, background, foreground, accent) => ({
  name, type,
  colors: { 'editor.background': background, 'editor.foreground': foreground },
  tokenColors: [
    { scope: ['keyword', 'storage', 'entity.name', 'constant', 'support'], settings: { foreground: accent, fontStyle: 'bold' } },
    { scope: ['string', 'comment'], settings: { foreground: accent, fontStyle: 'italic' } },
  ],
});

export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), mdx()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    shikiConfig: {
      themes: {
        light: codeTheme('fieldnotes-light', 'light', '#F1F0EA', '#141819', '#3B4343'),
        dark: codeTheme('fieldnotes-dark', 'dark', '#141819', '#F1F0EA', '#B6C7BB'),
      },
      wrap: true,
    },
  },
});
