---
name: agent
description: Use when creating, editing, validating, organizing, or loading Agent Skills in this repository. Follow the open Agent Skills format and consult the official specification when details matter.
---

# Agent Skills

This skill captures the Agent Skills format for use in this project. It is based on the official documentation at https://agentskills.io/home and https://agentskills.io/specification.

## What a skill is

A skill is a directory containing a required `SKILL.md` file with YAML frontmatter and Markdown instructions. A skill may also contain supporting `scripts/`, `references/`, and `assets/` directories. Skills should be portable and version-controlled.

## Required workflow

When creating or changing a skill:

1. Read the official specification at https://agentskills.io/specification if the change involves metadata, structure, or compatibility.
2. Keep the skill focused on one clear capability or workflow.
3. Ensure `SKILL.md` begins with YAML frontmatter containing both required fields: `name` and `description`.
4. Keep the `name` lowercase and hyphen-separated where needed; it must match the containing skill directory name.
5. Make the description specific about both what the skill does and when an agent should use it.
6. Keep the main instructions concise. Move detailed material into `references/` and load it only when needed.
7. Do not assume that every agent automatically discovers or activates skills. Follow the host agent's documented discovery path and loading behavior.
8. Review the changed skill and any referenced paths before finishing.

## Progressive disclosure

Follow the three-stage model described by the official project:

- **Discovery:** expose the skill name and a concise description.
- **Activation:** read the full `SKILL.md` when the task matches the skill.
- **Execution:** follow the instructions and load only the supporting resources needed for the task.

## Project conventions

- Store shared, project-level skills under `.agents/skills/<skill-name>/`.
- Keep skill names and directory names aligned.
- Prefer links to the official specification over copying the entire specification into this repository, so the upstream source remains authoritative.
- When a task is specifically about Remotion video coding, also read `.agents/skills/remotion-video/SKILL.md`.

## Official references

- Overview: https://agentskills.io/home
- Specification: https://agentskills.io/specification
- Official repository: https://github.com/agentskills/agentskills
