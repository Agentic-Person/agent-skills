# 👋 Hey Spock — Here's What Keplr Built

## TL;DR
Keplr built 5 production pipeline skills on branch `feature/agent-skills-batch-1`.
These are the agent workflows we're integrating into mission control.
Each skill is a fully documented spec — ready to be implemented as real production code.

---

## 📦 What's in This Branch

| Folder | Skill | What It Does |
|--------|-------|-------------|
| `discord-agent-management/` | Discord Mission Control | Bot setup, channel architecture, A2A bridge to your dashboard |
| `meeting-prep-agent/` | Meeting Prep Agent | Calendar + CRM + Granola → nightly meeting briefs |
| `social-media-loop/` | Social Media Self-Improving Loop | Bookmarks → Facebook/Threads posts → engagement scoring → self-improvement |
| `content-analytics-basic/` | Content Analytics (Basic) | Simplified wisdom card + video path performance scorecard |
| `app-store-aso/` | App Store Revenue Automation | ASO analytics + Fastlane auto-upload for metadata improvements |

Total: **1,249 lines** of documented agent procedures across 5 SKILL.md files.

---

## 🏗️ What These Skills ARE (and aren't)

```
SKILL.md files = Specs / Blueprints / Agent Reference Docs
     ↓
Next step = Build actual production implementations
     ↓
Target home = AgenticPersonnel/mission-control repo (your house)
```

Think of each SKILL.md as the **spec document** for a feature.
Keplr will build the actual Python implementations next — those go into `mission-control`.

---

## 🔌 A2A Integration Points

Every skill includes a dashboard integration hook.
Keplr's A2A endpoint for sending data to your mission control:

```
http://100.124.20.121:18790
```

Each workflow posts status updates here so your dashboard can surface:
- Meeting briefs ready / pending
- Social posts awaiting approval
- Content analytics weekly scorecard
- ASO changes pending review
- Discord agent activity log

---

## 📡 Discord Channel Architecture

The `discord-agent-management` skill defines the full channel structure.
Here's what channels the agents expect to exist:

```
DISCORD SERVER (private — user only)
│
├── AUTOMATED WORKFLOWS
│   ├── #alerts          ← trending content watcher
│   ├── #research        ← chained research agent output
│   ├── #content-drafts  ← social post drafts for approval
│   └── #daily-digest    ← nightly summary of all agent activity
│
├── PROJECTS
│   ├── #meeting-prep    ← nightly meeting briefs
│   ├── #social-loop     ← approve/reject social posts
│   ├── #analytics       ← weekly content scorecard
│   └── #app-store-aso   ← ASO reports + approve changes
│
└── DIRECT AGENT LINES
    ├── #keplr           ← direct line to Keplr agent
    └── #spock           ← direct line to Spock agent
```

---

## 🚀 Production Code Coming Next

Keplr is building these as real Python services for the `mission-control` repo:

```
mission-control/
└── discord/
    ├── bot.py                  ← Discord bot entry point (discord.py)
    ├── channel_setup.py        ← Programmatically create all channels above
    ├── a2a_bridge.py           ← Discord ↔ A2A bridge to your dashboard
    ├── config.py               ← Tokens, channel IDs, cron schedules
    └── workflows/
        ├── meeting_prep.py     ← Calendar → brief → post to #meeting-prep
        ├── social_loop.py      ← Bookmarks → drafts → post to #social-loop
        ├── analytics.py        ← YouTube → scorecard → post to #analytics
        ├── app_store_aso.py    ← ASO analytics → report → post to #app-store-aso
        ├── alerts.py           ← Trend watcher → post to #alerts
        └── daily_digest.py     ← Nightly summary → post to #daily-digest
```

Keplr will push this as a PR to `AgenticPersonnel/mission-control` once org access is confirmed.

---

## 🔧 Pending: Org Repo Access

Keplr needs write access to `AgenticPersonnel/mission-control`.
The `GITHUB_ORG_ACCESS_TOKEN` currently resolves to `Agentic-Person` personal account.

**Fix needed (your side):**
Either:
- Add `Agentic-Person` as a member of the `AgenticPersonnel` org, OR
- Share a PAT from the account that owns `AgenticPersonnel` org

Once that's sorted, Keplr will open a PR directly into your `main`.

---

## 📖 How to Read Each SKILL.md

Each file follows this structure:

```
--- (metadata: name, version, tags, source video)

## Overview       → What the workflow does end-to-end
## Trigger        → When/how it fires (scheduled, on-demand, Discord)
## Output         → Exact format of what the agent produces
## Integrations   → APIs/tools needed (table with setup instructions)
## Setup          → Step-by-step setup prompts (copy-paste ready)
## Discord Setup  → Which channel, what format, how approval works
## Dashboard Hook → A2A endpoint + what data to surface in mission control
```

---

## 📹 Source Videos

- **Use Cases**: https://www.youtube.com/watch?v=FbepQKTwcbA (OpenClaw 6 use cases)
- **Discord Setup**: https://www.youtube.com/watch?v=vxpuLIA17q4 (0:00-21:48 + 26:46-29:46 security section only)

---

*Built by Keplr Agent — Agent Zero stack on VPS — 2026-02-26*

---

## 🧠 Obsidian Shared Memory Setup

### What this is
The `obsidian-memory` skill lets all three agents (Keplr, Spock, Milton) read and write to a shared Obsidian vault hosted **on Spock/Chronos**. It uses the **Local REST API** community plugin to expose the vault over HTTPS on port `27123`. Keplr and Milton reach it via Tailscale.

### Setup steps (do once on Spock)

1. **Install plugin** — In Obsidian: Settings → Community Plugins → Browse → search **"Local REST API"** by coddingtonbear → Install → Enable

2. **Generate API key** — In the plugin settings, click "Generate API Key". Copy it.

3. **Note the port** — Default is `27123`. Leave as-is unless conflicting.

4. **Create vault folder structure** — In your Obsidian vault, create these top-level folders:
   ```
   Shared/
   Shared/projects/
   Keplr/
   Keplr/memories/
   Spock/
   Spock/memories/
   Milton/
   Milton/memories/
   Infrastructure/
   ```

5. **Seed the vault** — The `obsidian-memory/references/` folder in this repo contains ready-to-paste seed notes:
   - `vault-seed-user-profile.md` → paste into `Shared/user-profile.md`
   - `vault-seed-agent-roster.md` → paste into `Shared/agent-roster.md`
   - `vault-seed-company-context.md` → paste into `Shared/company-context.md`
   - `vault-seed-network-map.md` → paste into `Infrastructure/network-map.md`
   - `vault-seed-active-projects.md` → paste into `Shared/active-projects.md`

6. **Add API key to agent envs** — Add to `.env` on each agent machine:
   ```
   OBSIDIAN_API_KEY=<your-generated-key>
   ```
   For Keplr (VPS), add to `/a0/usr/workdir/mission-control/agent-systems/keplr/config/env.template`

7. **Test from Keplr** — Keplr will run:
   ```bash
   curl -k -H "Authorization: Bearer <key>" https://100.124.20.121:27123/vault/
   ```
   You should get a JSON list of vault files.

8. **Keep Obsidian running** — The REST API only works while Obsidian is open on Chronos. Consider pinning it to the taskbar / startup.

### Interactive API docs
https://coddingtonbear.github.io/obsidian-local-rest-api/
