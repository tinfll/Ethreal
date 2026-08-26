import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import remarkDirectiveContainers from './src/lib/remark-directive-containers.js';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [remarkMath, remarkDirective, remarkDirectiveContainers],
      rehypePlugins: [rehypeKatex, rehypeSlug],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, remarkDirectiveContainers],
    rehypePlugins: [rehypeKatex, rehypeSlug],
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
  vite: {
    ssr: { noExternal: ['three'] },
  },
});
