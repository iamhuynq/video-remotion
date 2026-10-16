# Video Remotion

A data-driven Remotion starter for vertical ranking/list videos. The starter includes a 1080×1920, 30 FPS composition with an intro, animated ranking cards, progress indicators, and an outro. Character data and image paths live in `src/data/characters.ts`.

## Requirements

- Node.js 18.18+ (Node.js 20 LTS recommended)
- npm

## Install

```bash
npm install
```

## Preview in Remotion Studio

```bash
npm run dev
```

Select **NarutoRanking** in Remotion Studio to preview the composition. The example uses generated initials as visual placeholders, not character artwork.

## Render an MP4

```bash
npm run build
```

Output: `out/naruto-ranking.mp4`

Render a still preview:

```bash
npm run still
```

Output: `out/preview.png`

## Customize the ranking

Edit `src/data/characters.ts`:

- `rank`: displayed ranking number
- `name`: character/title text
- `subtitle`: supporting line
- `accent`: per-card accent color (hex)
- `image`: optional path relative to `public/`, e.g. `images/my-character.png`

To use an image, put it under `public/images/` and set `image: "images/my-character.png"`. Make sure you have the rights to use any images you add.

The composition duration is calculated from the number of entries. Timing constants and layout are in `src/compositions/RankingVideo.tsx`.

## Project structure

```text
public/                  # Add image/font assets here
src/
  compositions/
    RankingVideo.tsx     # Intro, ranking cards, outro, animation
  data/
    characters.ts        # Editable ranking data
  Root.tsx               # Remotion composition registration
  index.ts               # Entry point
package.json
remotion.config.ts
tsconfig.json
```

## Production notes for the coding agent

- [Agent instructions](AGENTS.md) — project-specific rules and workflow entry point.
- [Video workflow](docs/VIDEO_WORKFLOW.md) — brief → treatment → look test → build → review.
- [Treatment template](docs/TREATMENT_TEMPLATE.md) — reusable planning sheet for each new video.
- [Style guide](docs/STYLE_GUIDE.md) — consistent layout, typography, motion, audio, and Reels retention principles.
- [Quality checklist](docs/QUALITY_CHECKLIST.md) — pre-publish content, visual, audio, and technical review.

The production workflow is adapted for this project from [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar), especially its agent workflow, directing method, and technical quality checks. These documents are rewritten for Remotion; the Lemo-Opuscar rendering engine and demos are not part of this repository.

## Scripts

- `npm run dev` — launch Remotion Studio
- `npm run build` — render the MP4
- `npm run still` — render a still frame
- `npm run lint` — run TypeScript type checking

This repository contains placeholder visuals only. Replace the sample names and add your own appropriately licensed assets before publishing.
