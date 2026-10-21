---
name: remotion-video
description: Instructions for creating, editing, and reviewing videos in this Remotion project. Read this skill before making code changes to the repository.
---

# Remotion Video Project Skill

Before coding in this repository, read this file from GitHub and follow the instructions below. No local skill installation is required; load this file manually whenever a coding task is requested.

## Project conventions

- Use Remotion with React and TypeScript.
- Keep video compositions reusable and data-driven. Put editable video content (titles, rankings, character names, image paths, timing, and styling options) in data/config files when practical.
- Keep composition entry points and reusable visual components separate.
- Use explicit TypeScript types for component props and data structures.
- Prefer small, composable components over a single large composition file.
- Use Remotion APIs for animation and timing. Derive animated values from the frame using Remotion utilities such as `useCurrentFrame`, `useVideoConfig`, `interpolate`, and `spring`; avoid CSS or browser timers for timeline-driven animation.
- Keep dimensions, frame rate, duration, and aspect ratio explicit in the composition configuration. The current target format is vertical 1080×1920 at 30 fps unless the user requests otherwise.
- Keep media assets in the project's public assets directory and reference them with Remotion's `staticFile` when appropriate.
- Do not invent image paths or claim an asset exists unless it has been verified in the repository.
- Preserve existing behavior unless the request explicitly calls for a change. Avoid unrelated refactors and unnecessary dependencies.

## Workflow for every coding task

1. Read this file from GitHub before editing code.
2. Inspect the relevant source files and current branch/PR state before making assumptions.
3. Translate the request into the smallest coherent change; ask a concise question only if an essential requirement is missing.
4. Make changes on a feature branch, not directly on `main`, unless the user explicitly requests otherwise.
5. Review the resulting diff for correctness, types, consistency, and unintended changes.
6. Run available checks (at minimum typecheck/build or a Remotion render when the execution environment supports it). If checks cannot be run, state that clearly; never claim they passed.
7. Report changed files, validation performed, and any remaining limitations. Link to the relevant GitHub branch or pull request.

## Video design guidelines

- Establish a clear visual hierarchy: main subject first, title second, supporting details last.
- Make text readable on a phone screen. Avoid overly small labels and dense paragraphs.
- Use consistent spacing, typography, colors, and animation timing across ranking cards.
- Keep transitions intentional and avoid excessive motion that distracts from the subject.
- Design the opening seconds to communicate the topic quickly and create a reason to keep watching, when relevant to the request.
- For ranking/list videos, keep the layout and timing consistent between entries while allowing the content to vary.
- Use placeholders only when the user has not supplied assets; clearly identify placeholders and do not present them as final artwork.

## Communication

- Respond in Vietnamese unless the user requests another language.
- Be direct and technically precise.
- Distinguish implemented changes from suggestions.
- Do not say code was tested, rendered, or deployed unless that action actually succeeded.
