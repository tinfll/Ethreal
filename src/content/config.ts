import { defineCollection, z } from 'astro:content';

const tagList = () =>
  z
    .preprocess(
      (v) => (typeof v === 'string' ? [v] : v),
      z.array(z.string()),
    )
    .default([]);

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
      tags: tagList(),
      draft: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

const lore = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    section: z.enum(['metaphysics', 'history', 'geography', 'cultures', 'institution', 'misc']),
    summary: z.string().optional(),
    relatedCharacters: z.array(z.string()).default([]),
    tags: tagList(),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const games = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      status: z.enum(['concept', 'pre-production', 'in-development', 'released', 'archive']),
      rating: z.enum(['all-ages', 'r15', 'r17', 'r18']).default('all-ages'),
      cover: image().optional(),
      summary: z.string(),
      tags: tagList(),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
    }),
});

const works = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().optional(),
      status: z
        .enum(['concept', 'pre-production', 'in-development', 'released', 'archive'])
        .optional(),
      rating: z.enum(['all-ages', 'r15', 'r17', 'r18']).default('all-ages'),
      cover: z.string().optional(),
      tags: tagList(),
      draft: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

export const collections = { characters, lore, games, works };
