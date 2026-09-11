import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import remarkBreaks from 'remark-breaks';
import remarkDirectiveContainers from './src/lib/remark-directive-containers.js';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [remarkMath, remarkDirective, remarkBreaks, remarkDirectiveContainers],
      rehypePlugins: [rehypeKatex, rehypeSlug],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, remarkBreaks, remarkDirectiveContainers],
    rehypePlugins: [rehypeKatex, rehypeSlug],
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
  vite: {
    ssr: { noExternal: ['three'] },
  },
});
