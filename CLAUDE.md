# CLAUDE.md, portfolio site

---

## REDESIGN, 2026-08-03. This section overrides anything below it.

The owner re-briefed the site. Where this section and the original brief
disagree, this section wins.

### Positioning
- **Lead:** data scientist and forecasting specialist, with production treasury
  experience and an applied-mathematics PhD.
- **Secondary:** AI automation, presented as an **emerging, project-based**
  capability. The owner is a beginner in AI with **no professional AI
  experience**, only personal projects. Never frame it as professional
  experience or imply seniority he does not have. When unsure, describe it
  **more modestly, not less**.
- The site must read as a credible independent practitioner, not a student.

The one place this collides with the record: the CV and LinkedIn describe a
DistilBERT classifier and an agentic workflow built inside the treasury role,
and the TMI award is literally named Best AI Deployment. Resolved by treating
the treasury machine learning as **data science**, which is his stated strength,
and reserving the **AI** framing for safeframe and PlanScan as personal
projects. Tracked as Q-N1 and awaiting his confirmation.

### Employment status, confirmed 2026-11-03
The FAMI Ltd / IKEA Group Treasury role **ended in July 2026**. Confirmed by the
owner. Everything about it is past tense: `roles.yaml` and the Cash & FX project
carry `end: "2026-07"`, and the intro reads "For three years at IKEA Group
Treasury, until July 2026, I did exactly that". Do not reintroduce "present",
"since April 2023", or any present-tense verb for that role. He is currently
available, which is what the contact section already says.

### Structure
One main page at `/`, with sections: intro, what I can help with, selected work,
experience, research and education, skills and stack, contact. Nav is four
anchors into that page. Each project also has a deep-dive page at
`/work/[slug]`. There is no separate about, CV, research, work-index or contact
page.

### Writing rules
- **No em dashes anywhere.** Use a comma, a colon or a full stop.
- Precise and to the point. Foreground concrete technical specifics: methods,
  tools, what was built. No salesy adjectives, no impact hype.

### Design
- Mature, restrained, professional. Strong typography, clear hierarchy,
  generous spacing. Hierarchy comes from type size, weight and space, never from
  boxes or colour blocks.
- **No forecast chart, no animation, no dashboard gimmicks.** The interactive
  forecast component and its React island were removed on 2026-08-03. React,
  `react-dom` and `@astrojs/react` are uninstalled. Do not reintroduce a
  framework without asking.
- Identity: ink on warm paper, one restrained accent in deep slate teal, Source
  Serif 4 for reading and Inter for metadata only. Do not imitate
  brittanychiang.com or eugeneyan.com; they were structural references only.

### Stack after the redesign
Astro static, plain CSS, `@astrojs/sitemap`. The only JavaScript that ships is
the inline theme script. Free hosting.

---

# Original brief (superseded where the section above disagrees)

Draft, Phase 0. Rules inherited from the owner's master brief. Future sessions:
read this file completely before touching anything.

Companion files: `PLAN.md` (phases and gates), `OPEN_QUESTIONS.md` (facts still
needed, and things I am forbidden to guess).

---

## The four rules that override everything else

### 1. Never invent content
No project description, metric, date, job title, technology, or publication
detail unless the owner supplied it or it was read from a file the owner pointed
at. If a fact is needed, it goes into `OPEN_QUESTIONS.md` and gets asked.

Placeholders must be **obviously fake**: `TK: metric`, `TK: thesis title`. Never
a plausible-looking stand-in. A number that looks real and is not is a career
risk for the owner, not a bug.

Reading a directory name is not reading a project. Inferring intent from a
docstring is not confirmation.

### 2. Confidentiality — FAMI / IKEA Group Treasury
Under contract. Describe at **capability level only**:
- No client-identifying detail
- No internal system names beyond what is explicitly approved
- No exact entity counts, no internal process timings, unless each one is
  individually confirmed
- Confirmation is per item. Silence is a no.

When in doubt, flag it in `OPEN_QUESTIONS.md` rather than publish it.

### 3. Zero cost
No paid service, paid font, paid API, or dependency requiring a billable
account. If a task appears to need one, stop and ask.

### 4. Accessibility and performance are acceptance criteria
Not polish. A build that misses them is not done. See "Acceptance criteria".

---

## Stack — decided, do not re-litigate

- **Astro**, static output (`output: 'static'`), TypeScript strict
- **React islands only where interactivity is real** — `client:visible` /
  `client:idle`. Everything else ships zero JS.
- **Plain CSS with custom properties.** No Tailwind unless argued for and agreed.
- **Astro Content Collections with Zod schemas** for all content
- **Deploy: Cloudflare Pages via GitHub.** The GitHub Pages build must also be
  confirmed to work as a fallback.
- **Analytics: none, or Cloudflare Web Analytics.** No cookies, no consent
  banner.

Rationale, recorded so no future session re-argues it: Astro's zero-JS default
gives the best Core Web Vitals for a content site. Cloudflare Pages is free with
unlimited bandwidth and permits commercial use; Vercel's Hobby plan forbids
commercial use, and this site solicits consulting work.

**Dependency policy:** `astro`, `@astrojs/react`, `@astrojs/sitemap`. Anything
else requires asking first — including charting libraries.

---

## Audience

- **Primary:** AI engineering and data science hiring managers (Google-tier, AI
  labs, product companies).
- **Secondary:** Big4 / consulting firms, and buyers of independent
  treasury-finance consulting.

**Through-line: PRODUCTION.** Forecasting and LLM systems that run in a real
business, not notebooks. A secondary reader must self-select in ~5 seconds from
the nav and homepage. One site, not three.

---

## Information architecture

Multi-page, deep-linkable. Not a single long scroll. Every case study gets a
stable URL.

```
/                hero + positioning + signature visualisation + 3 featured projects
/work            all projects
/work/[slug]     individual case study
/research        PhD and publications
/about           narrative bio, background, how I work
/cv              HTML CV + PDF download
/contact         email + LinkedIn + GitHub
```

---

## Case study structure — identical on every project page

1. One-line summary of what it does and who for
2. Context and constraints
3. My specific role — what I built vs. what existed
4. Technical approach, with real decisions and trade-offs
5. Outcome, with a metric **only if the owner supplied a real one**
6. Current limitations / what I'd do next
7. Links: repo, live demo, recorded demo

**Section 6 is mandatory on every project. Do not soften or omit it.** The Zod
schema enforces this — a project without it fails the build. If the limitations
are themselves confidential, say exactly that; do not drop the section.

---

## Design direction — decided

Typography-led and restrained. The proof is the content; the design's job is to
get out of its way while still looking deliberate.

- Warm neutral background, near-black text, contrast ≥ 4.5:1 always
- **Pastel only for surfaces, section bands, borders, and the data-viz palette.
  Never for body text.**
- One accent colour, used sparingly and consistently
- Two fonts maximum, self-hosted, woff2, subset, preloaded, google-fonts-free
  (the exact meaning of "google-fonts-free" is Q-D1 and is unresolved)
- Generous whitespace, single column for prose, max ~68ch line length
- Dark mode via `prefers-color-scheme`, plus a manual toggle
- **Every design token in `:root` as a custom property. No hardcoded hex
  anywhere.** Enforced by a CI grep over `src/`.

---

## Design tokens

**Status: PROPOSED, pending Gate 2.** The contrast ratios below were computed,
not estimated — every pair passes WCAG AA for normal text. The accent is a
placeholder shape (warm terracotta) chosen to prove the token structure works;
the actual accent is Q-D3 and is the owner's decision.

```css
:root {
  /* ---- colour: light (default) ---- */
  --color-bg:            #FAF8F4;  /* warm off-white */
  --color-surface:       #F1EDE5;  /* raised panels, section bands */
  --color-border:        #E3DCD0;
  --color-text:          #1A1815;  /* 16.70:1 on bg  */
  --color-text-muted:    #5A544B;  /*  7.06:1 on bg, 6.41:1 on surface */
  --color-accent:        #8A4B2A;  /*  6.34:1 on bg  */
  --color-accent-weak:   #F3E3D8;  /* surface tint only, never text */
  --color-focus:         #8A4B2A;

  /* ---- data-viz (pastel, surfaces only) ---- */
  --viz-actual:          #3E5C76;
  --viz-forecast:        #8A4B2A;
  --viz-band:            #E8D5C4;
  --viz-grid:            #E3DCD0;

  /* ---- type ---- */
  --font-body:           TK: pending Q-D1;
  --font-display:        TK: pending Q-D1;
  --scale-base:          1rem;      /* 16px */
  --scale-sm:            0.875rem;
  --scale-lg:            1.25rem;
  --scale-xl:            1.5625rem;
  --scale-2xl:           1.953rem;
  --scale-3xl:           2.441rem;  /* 1.25 modular scale */
  --leading-prose:       1.65;
  --leading-tight:       1.2;
  --measure:             68ch;

  /* ---- space (4px base) ---- */
  --space-1:  0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4:  1rem;     --space-6: 1.5rem;   --space-8: 2rem;
  --space-12: 3rem;     --space-16: 4rem;    --space-24: 6rem;

  /* ---- other ---- */
  --radius:              4px;
  --border-width:        1px;
  --duration-fast:       150ms;
  --duration-base:       200ms;
  --duration-slow:       300ms;
  --ease-out:            cubic-bezier(0.16, 1, 0.3, 1);
  --lift:                8px;   /* the motion budget's hard ceiling */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* dark values below */ }
}
:root[data-theme="dark"] {
  --color-bg:            #161413;
  --color-surface:       #211E1B;
  --color-border:        #322E2A;
  --color-text:          #EDE9E2;  /* 15.18:1 on bg  */
  --color-text-muted:    #A9A199;  /*  7.21:1 on bg, 6.51:1 on surface */
  --color-accent:        #E8A87C;  /*  9.03:1 on bg  */
  --color-accent-weak:   #2E241D;
  --color-focus:         #E8A87C;

  --viz-actual:          #9DB8D1;
  --viz-forecast:        #E8A87C;
  --viz-band:            #3A2E26;
  --viz-grid:            #322E2A;
}
```

**Theme toggle contract:** `data-theme` on `<html>` wins over the media query in
both directions. Applied by a small inline `<head>` script reading
`localStorage` before first paint — this is the only render-blocking JS on the
site, and it exists to prevent a flash of the wrong theme.

**Contrast rule:** any new token pair must be measured before use, not eyeballed.
Re-run the check whenever a colour changes.

---

## Motion budget — hard limits

**ALLOWED**
- Opacity fades
- Transforms up to 8px (`--lift`)
- 150–300ms, ease-out, fired once
- Hover states
- Smooth theme transition
- The signature visualisation's own motion

**BANNED**
- Parallax
- Scroll-jacking
- Scroll-driven reveals on body text
- Typewriter effects
- Page-load spinners
- Animated counters
- Cursor followers
- Anything that delays reading

**REQUIRED**
- A `@media (prefers-reduced-motion: reduce)` block that disables **every**
  transform and transition.
- Tested by actually enabling Reduce Motion in the OS, not by devtools
  emulation.
- Any motion triggered by interaction must be disableable — **WCAG 2.3.3**, and
  the site must satisfy it.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Signature visualisation

An interactive time-series forecast component in the hero.

- **Fully synthetic data, generated at build time. No real business data, ever.**
  Seeded generator committed to the repo so the claim is verifiable.
- Historical actuals, a forecast line, an uncertainty band, and 2–3 controls
  (horizon, confidence level, model)
- Small, fast, keyboard-accessible
- Degrades to a static SVG under reduced motion
- Client-side only. No backend, no cold start.
- **Lightweight charting approach — do not pull in a heavy library without
  asking first.** Current plan is hand-written SVG; Recharts alone would consume
  the entire homepage JS budget.
- Must expose the same information non-visually: labelled controls, a
  visually-hidden live region, and a table alternative.

---

## Content plan — 3–5 case studies maximum

Candidates (owner's priority order; final shortlist is Q-H1):

1. **Tabular Code Critic** — see the correction below
2. **PROGNOS** — production multi-country cash/FX forecasting (SANITISED, rule 2)
3. **PlanScan AI** — Irish planning compliance checker, RAG-based
4. **NLP transaction classification** — DistilBERT, confidence-scored human
   review queue, feedback retraining

Anything else goes in a compact "Also built" list, one line each.

### Repos read in Phase 0
- Tabular Code Critic → `C:\Users\mohda\Documents\TabularCodeCritic\tabular-code-critic`
- PlanScan AI → `C:\Users\mohda\Documents\planscan`

The brief left both as `[LOCAL PATH]`; these were located by name and **await
the owner's confirmation** that they are the intended repos.

### Confirmed facts (round 1, 2026-08-02)
Sources: owner, `Mohammad_Aman_Resume.pdf`, `Linkedin_Profile.pdf` (both in the
Portfolio folder), public GitHub profile. These are usable. The full list is in
`OPEN_QUESTIONS.md` under "ANSWERED — round 1".

- **Mohammad Aman**, Clontarf, Dublin, Ireland. **Stamp 4** (no sponsorship
  required — a genuine selling point, use it).
- FAMI Ltd (IKEA Group Treasury), Cash & FX Forecast Specialist, Apr 2023–present.
  **IKEA is already named on the owner's own public LinkedIn**, so naming the
  employer is not new exposure.
- PhD Applied Mathematics, Aligarh Muslim University, 2016–2020. Thesis: "A study
  of generalized polynomials and multi-variable generating functions."
  MSc Data Analytics, National College of Ireland, 2022–2023.
- **Best AI Deployment (Silver), TMI Awards 2023** (Treasury Management
  International, issued Mar 2024). Third-party, verifiable proof of the
  production-AI claim — the strongest credential on the site, pending Q-F15.
- The owner's CV positions him as a business/ops analyst; LinkedIn positions him
  as AI/ML for finance. **The site targets AI engineering hiring managers, so
  the LinkedIn framing is the correct one.** (Q-A2)
- **Research: 192 citations, h-index 9, i10-index 8, 20 listed items.** Google
  Scholar `ojbD2U8AAAAJ`, Scopus Author ID `57215376485`. Mostly special
  functions / orthogonal polynomials, plus one deep learning paper (ICAI 2024,
  lifelogging memory retrieval, with NCI co-authors) which is the published
  bridge between the maths PhD and the AI work — **lead `/research` with it.**
  Two Scholar entries are disputed; see Q-I8 and Q-I9 before publishing the list.

### Approved for publication (owner confirmed, 2026-08-02)
- **Employer nameable.** FAMI Ltd (IKEA Group Treasury).
- **TMI Award nameable and linkable.** Best AI Deployment (Silver), TMI Awards
  2023, issued Mar 2024.
- **Scale of the treasury environment is publishable, but rewrite it — do not
  copy the CV's phrasing.** Owner's instruction: convey that this is a large
  multi-entity environment, in better words than the CV uses. Available facts:
  27 countries, 2,200 entities, ~75% reduction in manual forecast preparation,
  50K+ daily payments, ~85% reduction in manual categorisation, 8 hours → 15
  minutes on the reporting workflow. Draft the wording, get it approved at
  Gate 1 before it ships.

### Corrections — do not propagate the brief's wording
From reading the code and checking the public profile. Until the owner rules
otherwise:

- The project is **`safeframe`**, confirmed by the owner. The GitHub repo is
  still named `tabular-code-critic`, and so is the owner's CV. (Q-B1, Q-B12)
- It is **not an AI/LLM code-review tool.** There is no model call anywhere in
  it. It is a runtime + static analyser for pandas that catches bugs which do
  not raise. Its AI relevance is the bug classes it targets, and the owner's
  intended distribution path (below). Never write "AI-powered" over this code.
- **The `.pth` zero-config auto-activation IS built and committed** (verified
  2026-08-02 at commit `2edaafa`). This is **section 4 material — it is the
  headline of the case study**, not a roadmap item. How it works, from the code:
  `safeframe.pth` contains one line, `import safeframe_autoenable`, dropped at
  the site-packages root at install time, so every interpreter in that
  environment runs it before any user code. It stays a complete no-op until
  something imports pandas — it wraps `builtins.__import__`, and once the
  outermost `import pandas` unwinds it activates the guard and **restores the
  original `__import__`**, so there is no lasting overhead. Opt out per-process
  with `SAFEFRAME_DISABLE`.
  - Two real engineering details worth writing up: pandas' own C extensions
    re-enter `import pandas` while pandas is still initialising, so the hook
    tracks nesting depth and only fires at depth 0 — touching a
    half-initialised pandas breaks it. And `setup.py` copies the `.pth`
    directly into the wheel's build staging directory because setuptools'
    `data_files` routes through `.data/<scheme>/` and lands it in the wrong
    place cross-platform.
  - The payoff, in the owner's words: coding agents already capture the
    stderr of code they run, so the agent itself sees "that merge exploded your
    row count" in its own tool output. No `import`, no `with` block, nothing for
    the human or the AI to remember.
  - Honest caveats, both already in the README or stated by the owner: it only
    activates in the environment safeframe is installed into; editable installs
    (`pip install -e .`) don't process `.pth` files, so dev mode is manual
    `watch()` only; and fully offline sandboxes can't `pip install` at all.
    These belong in section 6.
- **Not yet on PyPI.** The owner is publishing it and will confirm when done —
  "everything is done, just need to put it on PyPI". Until he confirms, do not
  write `pip install safeframe` as if it works. (Q-B13)
- PlanScan configures **31 councils** but has **2 ingested** (Dublin City,
  Fingal). Ship the honest number; the owner will update it when ingestion is
  done. Never write "31 councils" unqualified. (Q-C1)
- **PlanScan is not on GitHub.** The public profile has four repos:
  `tabular-code-critic`, `herscottons`, `PrimacyBI`, `ChurnAnalysis_banking`.
  The local `planscan` folder is not a git repository. (Q-C4)
- **PlanScan is not deployed.** No `.streamlit/`, Procfile, Dockerfile, or any
  deployment config. Local `streamlit run app.py` only. Do not claim a live
  demo. (Q-C2)
- PlanScan's directory contains credential files. **Never open `.env`,
  `grop api.txt`, or `API Keys/`.** Never `git init` and push that directory
  without rotating the key and starting a clean history first. (Q-C6)
- **"PROGNOS" is dropped — owner confirmed 2026-08-02.** It is an internal
  system name. The case study is titled **"Cash & FX Forecasting System"**.
  Never write "PROGNOS" anywhere on the site. (Q-F16 — closed)

### Featured projects (owner confirmed 2026-08-02)
Homepage features three, in this order:
1. **safeframe** — lead with the zero-config auto-activation
2. **Cash & FX Forecasting System** (IKEA Group Treasury)
3. **PlanScan AI**

The NLP transaction classification work folds into the Cash & FX case study
rather than standing alone (Q-G9). "Also built" list still to be decided (Q-H2).

---

## Acceptance criteria — a phase is not done until these pass

- Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO —
  mobile, throttled
- axe-core: zero violations
- Full keyboard navigation with visible focus rings; a skip-to-content link
- With OS Reduce Motion enabled: no transform or transition animations
- All text contrast ≥ 4.5:1, verified, in both colour schemes
- Homepage total JS under 100KB compressed
- Usable at 320px width with no horizontal scroll
- Zero console errors or warnings
- Semantic HTML: one `h1` per page, correct heading order, real landmarks
- Open Graph and Twitter card metadata on every page; sitemap; `robots.txt`
- Clean production build from a fresh clone

---

## Working style

- **Phases with gates. Stop at every gate. Do not run ahead.** The phase list is
  in `PLAN.md`.
- When a fact is missing, add it to `OPEN_QUESTIONS.md` with an ID, a marker
  (🔴 blocking / 🟡 shapes the work / ⚪ nice to have), and a recommendation
  where there is an obvious default.
- When the brief and the code disagree, the code wins and the disagreement gets
  flagged. Do not quietly reconcile them.
- Report honestly. If an acceptance criterion fails, say so with the number.

## Environment

- Windows 11, PowerShell. Node v22, npm 11, git 2.54 confirmed present.
- Project root: `C:\Users\mohda\Documents\Portfolio` (not yet a git repo).
