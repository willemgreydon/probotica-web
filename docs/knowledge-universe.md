# Knowledge Universe — the educational engine

`/knowledge` is a first-class surface, not a blog. It is the "understand" half of ProBotica's thesis. Everything here is typed in `features/knowledge/lib/knowledge-types.ts`, which is **explicitly designed to migrate to Sanity/MDX without refactor** — preserve that shape.

## Content model

```
Topic taxonomy (KnowledgeTopic)
  slug (TopicCategory) · title · shortTitle · description · accentColor · icon
  articleCount · parentSlug? · relatedSlugs[] · tier(foundational|applied|frontier|societal)

Article (KnowledgeArticle)
  slug · title · subtitle · excerpt · heroLabel · category · difficulty
  readingTime · publishedAt · updatedAt · tags[]
  sections[] · keyTakeaways[] · glossaryTerms[] · relatedSlugs[]
  prerequisites?[] · author{…}

Section (ArticleSection)
  id · heading · level(2|3) · body
  callout?{type: info|warning|tip|example, text}
  codeBlock?{language, code, caption?}

+ Glossary (data/glossary.ts)
+ Learning paths (data/learning-paths.ts)
+ Topics (data/knowledge-topics.ts) · Articles (data/knowledge-articles.ts)
```

`difficulty`: `beginner | intermediate | advanced | expert`.
`TopicCategory` spans AI, ML, deep learning, neural networks, generative AI, LLMs, AI agents, prompt engineering, robotics, humanoid robots, computer vision, RL, autonomous systems, AI ethics/safety/governance, AI in business, automation, human-AI collaboration, future of work.

## Components

`KnowledgeHero`, `KnowledgeGrid`, `KnowledgeCard`, `KnowledgeArticleLayout`, `KnowledgeTOC`, `RelatedConcepts`, `ConceptGraph`, `LearningPathRail`, `GlossaryPreview`, `DifficultyBadge`. SEO helpers in `lib/knowledge-seo.ts`; utils in `knowledge-utils.ts`.

## Pedagogy — what makes it *best-practice educational*

The data model already encodes good teaching primitives (`prerequisites`, `difficulty`, `learning-paths`, `relatedSlugs`, `keyTakeaways`, `glossaryTerms`, typed `callout`s and `codeBlock`s). The job is to make the *experience* deliver on them:

1. **Scaffolding & sequencing** — surface `prerequisites` as "learn these first"; gate nothing, but recommend order. Learning paths render as a guided sequence with progress.
2. **Active recall** — add self-check questions / inline quizzes / "predict the output" before code blocks. Retrieval beats re-reading.
3. **Worked examples → transfer** — every `codeBlock`/prompt should be runnable or copyable, and concepts link out to a Bot Lab "try it" (the education→product bridge).
4. **Visible progress & spaced return** — track read articles + path progress; offer "continue learning" and spaced "revisit" nudges.
5. **Progressive disclosure** — plain-language summary up top (for Lena/Sophie), depth in expandable sections; `glossaryTerms` get hover/tap definitions inline.
6. **Concept graph for exploration** — `ConceptGraph`/`RelatedConcepts` let curious learners wander the map, not just a linear feed.
7. **Accuracy & currency** — `publishedAt`/`updatedAt` shown; claims sourced; `callout type:warning` flags common misconceptions; no teaching a falsehood for engagement.
8. **Difficulty honesty** — `DifficultyBadge` sets expectations and never relies on color alone (a11y).

## Authoring guidance

- New article: add to `data/knowledge-articles.ts` conforming to `KnowledgeArticle`; set realistic `readingTime`, real `prerequisites`/`relatedSlugs`, meaningful `keyTakeaways`, and link `glossaryTerms` that exist in `data/glossary.ts`.
- Keep slugs stable (URLs + cross-link keys). Add the topic to `knowledge-topics.ts` if new; wire it into a learning path if it belongs to one.
- Localization: ProBotica is DACH-rooted — design content + types to support German (`de-AT`) alongside English (see i18n stories).

The educational backlog is the **Knowledge Universe & Pedagogy** epic in [`stories/`](./stories/README.md).
