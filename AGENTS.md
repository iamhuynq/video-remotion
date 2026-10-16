# Agent instructions for Video Remotion

This repository creates data-driven vertical videos with Remotion. The current example is a 1080×1920, 30 FPS ranking/list video; keep the implementation aligned with the existing React/Remotion architecture.

## Source of truth

- Follow the installed Remotion skills in `.agents/skills/` for API usage, timing, sequencing, assets, audio, and rendering.
- Read `src/compositions/RankingVideo.tsx` before changing composition behavior.
- Read `src/data/characters.ts` before changing ranking content or its data shape.
- Keep content/data, visual tokens, reusable components, and composition timing separated where practical.
- Use frame-based Remotion APIs (`useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring`, `Sequence`) rather than wall-clock time or CSS animations that cannot be rendered deterministically.

## Workflow

1. **Brief:** infer the goal, platform, language, target duration, available assets, and any required facts. Ask only for information that materially changes the result; otherwise choose sensible defaults and state them.
2. **Treatment:** before coding a substantial new video, write a short plan in `production/TREATMENT.md` (or another clearly named file for that video). Define the hook, sequence of beats, visual emphasis, timing, and ending.
3. **Look test:** render or preview a representative frame/short segment using the real Remotion composition. Check legibility and image crop at the final 1080×1920 size.
4. **Build:** implement reusable components and keep per-video content in data files. Avoid duplicating a composition for each ranking list unless the format genuinely differs.
5. **Validate:** run `npm run lint`, preview in Remotion Studio, and render a short sample or still when feasible. Check text, images, frame timing, and audio sync before a full render.
6. **Deliver:** report files changed, commands run, validation results, and any remaining limitations. Never claim a render or test succeeded unless it actually ran.

## Visual and editorial principles

- The first 1–3 seconds should give viewers a reason to stay: a surprising claim, a clear question, a strong visual, or a promise of what the list reveals.
- Every scene should add information, escalate curiosity, or deliver a payoff. Remove decorative motion that competes with the subject.
- Keep character artwork dominant and text readable on a phone. Use consistent safe margins and avoid placing text over a face or key silhouette.
- Vary pacing intentionally; do not make every card enter and leave at the same speed if the content calls for emphasis.
- Use motion to direct attention. Prefer a small set of consistent transition rules over unrelated effects on every scene.
- Design audio with the picture: narration, music, and sound effects should support the beat rather than fight one another.
- For ranking videos, keep the hierarchy obvious: rank → character → short supporting detail. Do not reveal so much in the opening that the countdown loses its reason to continue.

## Technical constraints

- Preserve the current composition's declared dimensions and frame rate unless the user asks to change them.
- Animation must be deterministic at a given frame. Do not depend on `Date.now()`, unseeded randomness, or state carried from a previous frame.
- Avoid unnecessary dependencies. Prefer built-in Remotion features and installed skill guidance before adding packages.
- Validate user-provided text lengths and missing assets; use graceful fallbacks only when they preserve the intended design.
- Do not overwrite unrelated user changes. Keep output videos and temporary render files out of source control unless explicitly requested.
- Respect asset licences and platform policies. Recreating an image with code does not automatically grant rights to use copyrighted characters or artwork.

## Project-specific docs

- [Video workflow](docs/VIDEO_WORKFLOW.md)
- [Treatment template](docs/TREATMENT_TEMPLATE.md)
- [Style guide](docs/STYLE_GUIDE.md)
- [Quality checklist](docs/QUALITY_CHECKLIST.md)

## Inspiration and attribution

The production workflow and review principles in these project notes are adapted for Remotion from ideas in [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar), especially its `AGENTS.md`, `DIRECTOR.md`, and `TECHNIQUE.md`. These files are rewritten for this repository; Lemo-Opuscar's engine, scripts, style prompts, and demos are not required or copied here.
