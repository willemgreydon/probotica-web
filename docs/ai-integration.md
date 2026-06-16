# AI Integration

## The one rule

**All AI flows through `lib/ai/openai.ts`, and the no-key demo fallback must always work.** A visitor without an `OPENAI_API_KEY` configured still sees useful, representative output — never an error wall or blank panel.

## Configuration

`.env` keys (see `.env.example`):

```
OPENAI_API_KEY=          # absent → demo fallback
OPENAI_MODEL=gpt-4.1-mini
OPENAI_TEMPERATURE=0.7
NEXT_PUBLIC_SITE_URL=https://probotica.at
CONTACT_EMAIL=hello@probotica.at
```

Env access is centralized in `lib/config/env.ts`. `OPENAI_API_KEY` is server-only — never expose it to the client.

## Wrapper: `lib/ai/openai.ts`

- Exposes structured helpers (e.g. `runStructuredAI(systemPrompt, input)`) that return **strict JSON**.
- Handles the missing-key case by returning a deterministic, realistic fallback object.
- Route handlers are thin: parse + clamp input, call the wrapper, return JSON.

Example (`app/api/ai/lead-qualifier/route.ts`):

```ts
export const runtime = 'nodejs';
export async function POST(req: Request){
  const body = await req.json().catch(()=>({}));
  const input = String(body.input || '').slice(0,6000);   // clamp input
  const result = await runStructuredAI(
    'You are ProBotica AI. Return strict JSON with summary, recommendations, risks, nextSteps, estimatedImpact.',
    input,
  );
  return NextResponse.json({ scenario: 'lead-qualifier', ...result });
}
```

## Endpoints

| Route | Purpose |
| --- | --- |
| `POST /api/ai/lead-qualifier` | Qualify a lead → summary, recommendations, risks, next steps, impact |
| `POST /api/ai/ux-audit` | UX audit of provided context |
| `POST /api/ai/content-studio` | Content generation/brief |
| `POST /api/bots/test` | Run an arbitrary bot definition against input |
| `GET  /api/bots/metadata` | Bot catalog metadata |
| `POST /api/workflows/run` | Execute a multi-step workflow pipeline |

## Bot definitions

A bot is a typed `BotDefinition` (`features/bots/lib/bot-types.ts`): `slug`, `name`, `category` (sales | ux | content | marketing | real-estate | development | learning | automation | research | support | strategy | other), `systemPrompt`, `starterPrompt`, `inputPlaceholder`, `outputMode` (`text`|`json`|`mixed`), `model`, `temperature`, `status` (`active`|`draft`|`disabled`), `sampleInputs`, `capabilities`, and **`safetyNotes`**. Data: `features/bots/data/public-bots.ts` and `imported-bots.server.ts` (raw exports staged in `_imports/`).

## Safety & trust (hard requirements)

- Surface each bot's **`safetyNotes`** in the UI before/around runs.
- GDPR-aware: "no training on your data" messaging, scoped data flows, audit-friendly. This is part of the brand promise (the "AI Compliance Layer" solution).
- Validate and clamp all user input; validate AI output shape with `zod` before rendering.
- Make **demo vs. live** unmistakable — never show a fake "LIVE" badge (PB-022 fixes exactly this on `/studio`).
- Rate-limit/guard endpoints before any public launch.

## Education ↔ product bridge

Knowledge articles about a concept (e.g. prompt engineering) should offer a **"try it" CTA** that deep-links into the matching Bot Lab bot or scenario, pre-filling a sample input. This is the core education→product loop — see the **Education↔Product Bridge** stories.
