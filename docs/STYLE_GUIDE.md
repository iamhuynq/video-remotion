# Visual style guide

This guide defines a consistent baseline for this Remotion project. A specific video may override it when the treatment explains why.

## Canvas and composition

- Default: **1080×1920, 30 FPS**.
- Keep important text and faces away from the outer edges. Use consistent safe margins across scenes.
- One dominant focal point per beat. Supporting labels should not compete with the character artwork.
- Preserve aspect ratio when fitting images. Choose crop, contain, or a designed background intentionally; do not stretch character art.
- Check both the full frame and how it reads in a small mobile preview.

## Hierarchy

For ranking cards, the usual order is:

1. **Rank** — immediately recognizable.
2. **Character artwork** — the largest visual element.
3. **Character name** — readable at a glance.
4. **Supporting text** — short and optional.

Use contrast, spacing, scale, and position before adding outlines, shadows, or extra decorations to make text readable.

## Typography and copy

- Use a small, consistent type system: display/title, name, and supporting copy.
- Prefer concise Vietnamese. Avoid long sentences on a single screen.
- Keep punctuation and spelling consistent. Do not shrink text unpredictably to fit; shorten the copy or adjust the layout.
- Never place critical text over a face, eyes, or a key silhouette.
- Give text enough time to be read after its entrance animation finishes.

## Color and effects

- Choose a limited palette per video, with one accent color for rank/reveal moments.
- Keep background and foreground contrast strong.
- Use glow, particles, shake, blur, and chromatic effects only when they clarify emphasis or support the mood.
- Avoid stacking effects on every element. A clean frame with one strong motion cue usually reads better on a phone.
- Ensure color choices remain legible for the full scene, not just the first frame.

## Motion and rhythm

- Animate with Remotion's frame-based APIs and deterministic values.
- Use easing/springs intentionally: anticipation → action → settle is preferable to abrupt motion for important elements.
- Vary duration and intensity to reflect the content. Save the strongest motion for the hook, major reveal, or ending.
- Keep the subject readable while moving. Avoid continuous movement that prevents viewers from studying the character.
- Use transitions that connect scenes visually; do not add a transition merely because it looks impressive.
- A ranking video should create forward momentum without making every card feel identical.

## Audio

- Align meaningful reveals and cuts with narration, music, or sound effects when appropriate.
- Keep speech intelligible over music.
- Use sound effects to reinforce a physical or visual event, not as constant decoration.
- Use brief drops in music or silence to create contrast before a key reveal.
- Check audio sync in the rendered output, not only in the code.

## Reels retention

- The first 1–3 seconds should show a strong image or clear promise; avoid a long logo-only intro.
- Keep each scene focused on one idea.
- Build curiosity honestly: tease a later reveal without misleading the viewer.
- If a list is ranked, make the progression and remaining count clear.
- Let the most important reveal breathe long enough to register.
- End with a meaningful payoff or concise call to action; avoid a long generic outro.

## Asset handling

- Use high-resolution assets that remain clean after scaling.
- Check transparent edges, crop, and image quality on the actual canvas.
- Keep asset filenames and data paths predictable.
- Do not assume that a publicly available anime image is free to reuse commercially.
