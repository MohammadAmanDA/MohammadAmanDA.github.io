// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// No UI framework. The site is static HTML and CSS with two small inline
// scripts, for the theme toggle and the back-to-top control.
//
// Hosting: GitHub Pages, as a user site from the repo `MohammadAmanDA.github.io`.
// A user site is served from the domain root, so no `base` path is needed and
// every internal link works unchanged. When a custom domain is added later,
// change `site` here and add a CNAME file to public/. Nothing else moves.
export default defineConfig({
  output: 'static',
  site: 'https://mohammadamanda.github.io',
  integrations: [sitemap()],
});
