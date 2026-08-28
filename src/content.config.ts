import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

/**
 * Content model.
 *
 * Two rules are enforced here rather than left to discipline:
 *
 *  1. Every project carries a short brief for the main page and a full write-up
 *     for its own page, and `limitations` is `.min(1)`, so a project that omits
 *     what it cannot do fails the build.
 *
 *  2. Nothing is invented. Facts still needed are tracked in `unresolved`
 *     against a question id, and any placeholder in prose is written `TK:` so
 *     it cannot be mistaken for finished copy.
 */

/** One or more paragraphs. Plain strings, no markdown parsing needed. */
const prose = z.array(z.string().min(1)).min(1);

const unresolved = z
  .array(
    z.object({
      id: z.string().regex(/^Q-[A-Z]+\d+[a-z]?$/, 'must be a question id, e.g. Q-B2'),
      note: z.string().min(1),
    })
  )
  .default([]);

const link = z.object({
  kind: z.enum(['repo', 'live', 'demo', 'press', 'paper']),
  label: z.string().min(1),
  href: z.url(),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.yaml' }),
  schema: z.object({
    title: z.string().min(1),
    order: z.number().int(),
    status: z.enum(['production', 'in-progress', 'mvp', 'analysis', 'archived']),
    /** Short technology label shown beside the title. */
    category: z.string().min(1),
    /** Whether this is paid work or a personal project. Kept explicit so the
     *  distinction is never blurred. */
    kind: z.enum(['professional', 'personal']),
    confidential: z.boolean().default(false),
    period: z.object({ start: z.string().min(1), end: z.string().nullable() }),
    stack: z.array(z.string().min(1)).min(1),

    /** The four-line version carried on the main page. */
    brief: z.object({
      problem: z.string().min(1),
      approach: z.string().min(1),
      outcome: z.string().min(1),
    }),

    /** The full write-up on the project's own page. */
    summary: z.string().min(1),
    forWhom: z.string().min(1),
    context: prose,
    constraints: z.array(z.string().min(1)).default([]),
    myRole: prose,
    approach: z
      .array(z.object({ decision: z.string().min(1), detail: prose }))
      .min(1),
    outcome: z.object({
      metrics: z
        .array(
          z.object({
            value: z.string().min(1),
            label: z.string().min(1),
            /** Every number must record where it came from. */
            source: z.string().min(1),
          })
        )
        .default([]),
      notes: prose,
    }),
    limitations: z.array(z.string().min(1)).min(1, 'every project must state what it cannot do'),
    nextSteps: z.array(z.string().min(1)).default([]),
    links: z.array(link).default([]),
    unresolved,
  }),
});

/** Plain statements of the work taken on. */
const services = defineCollection({
  loader: file('./src/content/services.yaml'),
  schema: z.object({
    title: z.string().min(1),
    detail: z.string().min(1),
    order: z.number().int(),
  }),
});

const skills = defineCollection({
  loader: file('./src/content/skills.yaml'),
  schema: z.object({
    group: z.string().min(1),
    items: z.array(z.string().min(1)).min(1),
    order: z.number().int(),
  }),
});

const publications = defineCollection({
  loader: file('./src/content/research/publications.yaml'),
  schema: z.object({
    title: z.string().min(1),
    authors: z.array(z.string().min(1)).min(1),
    venue: z.string().min(1),
    detail: z.string().optional(),
    year: z.number().int(),
    citations: z.number().int().nonnegative(),
    theme: z.enum(['machine-learning', 'special-functions', 'other']),
    /** Shown on the main page rather than only in the full list. */
    selected: z.boolean().default(false),
    href: z.url().optional(),
  }),
});

const roles = defineCollection({
  loader: file('./src/content/cv/roles.yaml'),
  schema: z.object({
    title: z.string().min(1),
    org: z.string().min(1),
    location: z.string().min(1),
    start: z.string().min(1),
    end: z.string().nullable(),
    order: z.number().int(),
    /** Earlier roles are listed as one line rather than with bullets. */
    minor: z.boolean().default(false),
    confidential: z.boolean().default(false),
    bullets: z.array(z.string().min(1)).default([]),
    line: z.string().optional(),
  }),
});

const education = defineCollection({
  loader: file('./src/content/cv/education.yaml'),
  schema: z.object({
    qualification: z.string().min(1),
    institution: z.string().min(1),
    location: z.string().min(1),
    start: z.string().min(1),
    end: z.string().min(1),
    order: z.number().int(),
    detail: z.string().optional(),
  }),
});

const profile = defineCollection({
  loader: file('./src/content/profile.yaml'),
  schema: z.object({
    name: z.string().min(1),
    /** The line under the name. What I do, in one sentence. */
    role: z.string().min(1),
    /** The positioning paragraphs at the top of the page. */
    intro: prose,
    metaDescription: z.string().min(1).max(160),
    location: z.string().min(1),
    workAuthorisation: z.string().optional(),
    /** Portrait. Path under /public. Omit and the layout closes up cleanly. */
    photo: z
      .object({
        src: z.string().min(1),
        alt: z.string().min(1),
      })
      .optional(),
    email: z.email(),
    profiles: z.array(link.omit({ kind: true }).extend({ kind: z.string().min(1) })),
    cvHref: z.string().optional(),
    research: z.object({
      citations: z.number().int().nonnegative(),
      hIndex: z.number().int().nonnegative(),
      i10Index: z.number().int().nonnegative(),
      asOf: z.string().min(1),
    }),
    unresolved,
  }),
});

export const collections = { projects, services, skills, publications, roles, education, profile };
