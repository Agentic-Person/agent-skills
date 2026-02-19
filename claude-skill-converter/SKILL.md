---
name: claude-skill-converter
version: 1.0.0
description: Converts Claude Code slash commands (.md files with YAML frontmatter and $ARGUMENTS) into Agent Zero SKILL.md format. Works from URLs, local files, or pasted content.
tags: [meta, skills, conversion, claude-code, workflow]
author: Keplr
---

# Claude Code → Agent Zero Skill Converter

## Purpose
Convert Claude Code slash command `.md` files into properly structured Agent Zero `SKILL.md` files.
Claude Code commands use `$ARGUMENTS` placeholders and YAML frontmatter.
Agent Zero skills use structured SKILL.md with metadata, procedures, and execution instructions.

## When To Use
- User provides a URL to a Claude Code command
- User pastes a Claude Code command file
- User points to a `.claude/commands/` directory in a repo
- User provides a zip file containing skills/commands

## Conversion Steps

### 1. Read the source
- If URL: use document_query tool to fetch
- If local file: use code_execution_tool to cat the file
- If zip: unzip to /a0/tmp/ first, then read files

### 2. Extract Claude Code structure
- `description:` frontmatter → skill description
- `argument-hint:` → document what arguments the skill takes
- `$ARGUMENTS` placeholder → note where user-provided args are inserted
- Body content → becomes the skill procedure

### 3. Build SKILL.md structure
```
---
name: <kebab-case-name>
version: 1.0.0
description: <from frontmatter description or inferred>
tags: [<relevant>, <tags>]
author: Keplr (converted from Claude Code command)
source: <original URL or file path>
---

# <Title>

## Purpose
<What this skill does>

## Arguments
<What input/arguments this skill expects — replaces $ARGUMENTS>

## Procedure
<Main content of the Claude command, adapted for Agent Zero execution>

## Execution Notes
<How Keplr should execute this — which tools to use, any caveats>
```

### 4. Save the skill
- Save to `/a0/usr/skills/<name>/SKILL.md`
- Confirm save with ls

### 5. Confirm to user
- Report the skill name and location
- Note any $ARGUMENTS that need to be provided at runtime

## Key Differences: Claude Code vs Agent Zero Skills

| Claude Code Command | Agent Zero Skill |
|--------------------|-----------------|
| Run inside Claude Code IDE | Run by Keplr via tools |
| `$ARGUMENTS` = CLI args | Arguments described in skill, passed in user message |
| Implicit file access | Must use code_execution_tool to read files |
| Single .md file | Folder with SKILL.md (+ optional scripts) |
| Slash command trigger | Loaded via skills_tool:load |

## Batch Conversion
If given a directory of commands:
1. List all .md files in the directory
2. Convert each one sequentially
3. Report summary of all skills created
