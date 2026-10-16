# Agent Skills specification reference

This is a short project reference, not a replacement for the upstream specification. For exact and current requirements, use https://agentskills.io/specification.

## Directory layout

A skill directory contains at minimum:

```text
skill-name/
├── SKILL.md
├── scripts/       # optional executable helpers
├── references/    # optional supporting documentation
└── assets/        # optional templates and resources
```

## SKILL.md frontmatter

Required:
- `name`: 1–64 characters; lowercase letters, numbers, and hyphens. It must not start or end with a hyphen, contain consecutive hyphens, or differ from the parent directory name.
- `description`: 1–1024 characters describing the skill's purpose and when it should be used.

Optional metadata supported by the specification includes `license`, `compatibility`, `metadata`, and `allowed-tools`. Check the official specification for exact constraints and current details.

Example:

```markdown
---
name: example-skill
description: Use when performing the specific workflow described by this skill.
---

# Example Skill

Instructions for the agent.
```

## Loading model

Agent Skills uses progressive disclosure: an agent discovers skills from their name and description, loads the full `SKILL.md` when relevant, then reads linked resources or runs bundled scripts as needed. Actual discovery paths and automatic activation depend on the host agent.

## Validation checklist

- [ ] The folder name matches the frontmatter `name`.
- [ ] YAML frontmatter is valid and contains `name` and `description`.
- [ ] Description clearly signals when to use the skill.
- [ ] Referenced files exist at the specified paths.
- [ ] Instructions are scoped, actionable, and avoid unrelated project rules.
- [ ] Host-agent compatibility and discovery path are documented where relevant.

## Upstream links

- Overview: https://agentskills.io/home
- Full specification: https://agentskills.io/specification
- Official source repository: https://github.com/agentskills/agentskills
