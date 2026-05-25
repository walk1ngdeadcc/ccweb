import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
    favorite: z.boolean().default(false),
    cover: z.string().optional(),
    difficulty: z.string().optional(),
  }),
});

export const collections = { notes };
