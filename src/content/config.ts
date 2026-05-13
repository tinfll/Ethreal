import { defineCollection, z } from 'astro:content';

const characters = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string().optional(),
      faction: z.string().optional(),
      era: z.string().optional(),
      summary: z.string(),
      portrait: image().optional(),
      model: z
        .object({
          src: z.string(),
          format: z.enum(['glb', 'gltf', 'fbx']).default('glb'),
          scale: z.number().default(1),
        })
        .optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

const lore = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    section: z.enum(['metaphysics', 'history', 'geography', 'cultures', 'misc']),
    summary: z.string().optional(),
    relatedCharacters: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const timeline = defineCollection({
  type: 'data',
  schema: z.object({
    events: z.array(
      z.object({
        era: z.string(),
        year: z.string(),
        title: z.string(),
        description: z.string(),
        characters: z.array(z.string()).default([]),
      }),
    ),
  }),
});

const games = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      status: z.enum(['concept', 'pre-production', 'in-development', 'released']),
      cover: image().optional(),
      summary: z.string(),
      tags: z.array(z.string()).default([]),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
    }),
});

export const collections = { characters, lore, timeline, games };
