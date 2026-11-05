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
/* Capability cards. Structure mirrors the reference: mono label, ghost number,
 * heading, sub-line, checked bullets, an impact box, a target metric, and
 * technology pills. */
const services = defineCollection({
  loader: file('./src/content/services.yaml'),
  schema: z.object({
    order: z.number().int(),
    label: z.string().min(1),
    title: z.string().min(1),
    detail: z.string().min(1),
    bullets: z.array(z.string().min(1)).min(2),
    impact: z.string().min(1),
    metric: z.string().min(1),
    tech: z.array(z.string().min(1)).min(2),
  }),
});

/* Stages in the Architecture Workbench diagram. */
const pipeline = defineCollection({
  loader: file('./src/content/pipeline.yaml'),
  schema: z.object({
    // Which diagram this stage belongs to. The workbench renders one tab per
    // diagram; a stage without one would be unreachable, so it is required
    // rather than defaulted.
    diagram: z.enum(['cashfx', 'planscan']),
    order: z.number().int(),
    tag: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    latency: z.string().min(1),
    edge: z.string().min(1),
    governance: z.string().min(1),
    responsibilities: z.array(z.string().min(1)).min(2),
    safeguard: z.string().min(1),
    // The tools this stage actually used. Every entry must already appear in
    // the Cash & FX case study's published stack, so the workbench cannot
    // introduce a technology the case study does not stand behind.
    tech: z.array(z.string().min(1)).min(1),
  }),
});

const caseStudies = defineCollection({
  loader: file('./src/content/case-studies.yaml'),
  schema: z.object({
    order: z.number().int(),
    period: z.string().min(1),
    category: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    role: z.string().min(1),
    href: z.string().min(1),
    metrics: z
      .array(z.object({ label: z.string().min(1), sub: z.string().min(1), value: z.string().min(1) }))
      .min(2),
  }),
});

const trajectory = defineCollection({
  loader: file('./src/content/trajectory.yaml'),
  schema: z.object({
    order: z.number().int(),
    period: z.string().min(1),
    status: z.string().min(1),
    org: z.string().min(1),
    location: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().min(1),
    summary: z.string().min(1),
    bullets: z.array(z.string().min(1)).min(1),
    tech: z.array(z.string().min(1)).min(1),
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
    /** Small mono label above the headline. The category of work. */
    role: z.string().min(1),
    /** The hero headline. A statement of what I build, not a slogan. */
    statement: z.string().min(1),
    /** The single paragraph under the headline. Two or three lines, no more. */
    lead: z.string().min(1),
    /**
     * Three evidence cards under the hero. Every value must already be
     * approved for publication; `source` records where it came from so no
     * number can appear without provenance.
     */
    highlights: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
          detail: z.string().min(1),
          source: z.string().min(1),
          /** Makes the card a link into the relevant case study. */
          href: z.string().optional(),
        })
      )
      .min(3)
      .max(4),
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

export const collections = { projects, services, pipeline, caseStudies, trajectory, skills, publications, roles, education, profile };
