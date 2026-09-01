import { defineCollection, z } from "astro:content";

const visibility = z.enum(["public", "anonymized", "private", "unknown"]);

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    industry: z.string(),
    visibility,
    featured: z.boolean().default(false),
    summary: z.string(),
    role: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    responsibilities: z.array(z.string()).optional(),
    outcomes: z.array(z.string()).optional(),
    client: z.string().optional(),
    location: z.string().optional(),
    startYear: z.number().optional(),
    endYear: z.number().optional(),
    links: z
      .object({
        website: z.string().url().optional(),
        github: z.string().url().optional(),
      })
      .optional(),
    needsVerification: z.array(z.string()).optional(),
  }),
});

const notes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(false),
    pubDate: z.date().optional(),
    topics: z.array(z.string()).default([]),
  }),
});

export const collections = {
  projects,
  notes,
};
