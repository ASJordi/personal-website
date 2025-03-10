import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://asjordi.dev',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
          !page.startsWith('https://asjordi.dev/tienda') &&
          !page.startsWith('https://asjordi.dev/services'),
    }),
    tailwind(),
  ]
});
