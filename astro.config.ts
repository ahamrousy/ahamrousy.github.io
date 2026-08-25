import { defineConfig } from 'astro/config';
import { SITE_URL, BASE } from './src/site.config';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: BASE,
  // GitHub Pages serves /about/index.html at /about/ — trailing slashes keep
  // canonicals, hreflang and internal links byte-identical to what Pages serves.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // The whole stylesheet is ~23 kB (≈5 kB gzipped) and every page uses most
    // of it. Inlining removes a render-blocking request, which is the single
    // biggest LCP win available on a site with no client-side JavaScript.
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
