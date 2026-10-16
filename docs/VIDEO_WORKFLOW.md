# Video production workflow

A lightweight workflow for producing repeatable videos in Remotion. Use it for ranking/Reels videos and adapt it when the format is more narrative.

## 1. Define the brief

Record only decisions that affect the video:

- **Goal:** what should viewers learn, feel, or do?
- **Audience/platform:** for example, Vietnamese Naruto fans watching Facebook Reels.
- **Format:** vertical 1080×1920, 30 FPS unless otherwise requested.
- **Length:** choose a target based on the amount of information; do not pad a list just to hit a duration.
- **Language:** on-screen text, narration, and captions.
- **Assets:** character images, logos, voice, music, sound effects, and their usage rights.
- **Must be accurate:** names, rankings, claims, source material, and spelling.

If the user has not specified a nonessential detail, choose a sensible default rather than repeatedly asking questions.

## 2. Write a treatment before coding

Use [TREATMENT_TEMPLATE.md](TREATMENT_TEMPLATE.md). Decide the opening hook, beat order, reveal strategy, visual rhythm, audio cues, and ending. For a small edit to an existing template, a concise bullet list is enough.

Do not start by copying an existing demo and swapping its text. Reuse the project's components and techniques, but make the sequence serve the current video's own content.

## 3. Build a visual test

Before implementing every scene, preview the hardest or most representative moment:

- The opening hook or first ranking card.
- The longest character name or densest text.
- The most complex transition.
- Any frame with multiple visual layers.

Use the actual composition and assets, not a disconnected mockup. Check the image at phone size and at the final aspect ratio.

## 4. Implement with one timeline

- Keep ranking/content data in `src/data/`.
- Keep reusable UI in `src/components/` when a component is reused or has a distinct responsibility.
- Keep scene timing and composition orchestration in `src/compositions/`.
- Derive timing from frames and the composition FPS. Avoid separate hard-coded values that can drift apart.
- Keep motion deterministic so a frame can render independently.
- Prefer a consistent transition vocabulary, with exceptions reserved for important beats.

## 5. Review the cut

Review at least once in Remotion Studio and, when practical, render a short sample. Watch at normal speed, not only by inspecting stills.

Check:
- Does the opening make the subject clear immediately?
- Is each ranking/reveal understandable without pausing?
- Is the character artwork large enough?
- Does the viewer have enough time to read each line?
- Do cuts and motion match the narration/music?
- Does the ending feel intentional rather than abruptly stopping?

## 6. Validate and render

Run the project's checks:

```bash
npm run lint
npm run still
npm run build
```

Use the scripts as currently defined in `package.json`; if a command is unavailable or expensive, explain that and run the closest relevant check. Inspect the still and the rendered MP4 before considering the work complete.

## 7. Deliver

Summarize:
- What changed.
- The rendered output path, if a render actually ran.
- Validation performed and results.
- Any missing asset, rights question, or visual issue still needing attention.

## Source inspiration

Adapted for Remotion from the treatment-first workflow and self-review principles in [Lemo-Opuscar's DIRECTOR.md](https://github.com/lemomo-ai/lemo-opuscar/blob/main/DIRECTOR.md) and [AGENTS.md](https://github.com/lemomo-ai/lemo-opuscar/blob/main/AGENTS.md).
