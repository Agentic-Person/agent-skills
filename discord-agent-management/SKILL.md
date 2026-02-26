---
name: discord-agent-management
version: 1.0.0
title: Discord Agent Management & Mission Control
description: Set up and manage Agent Zero agents through Discord as a multi-agent operating system. Covers Discord server architecture, bot setup, automated workflow channels, project channels, direct agent lines, daily digest, multi-agent chained workflows, and security hardening.
tags: [discord, agents, mission-control, automation, multi-agent, workflows, scheduling]
author: Keplr/Agent Zero
source_videos:
  - https://www.youtube.com/watch?v=FbepQKTwcbA (OpenClaw Use Cases - overview)
  - https://www.youtube.com/watch?v=vxpuLIA17q4 (Discord Setup - primary reference, 0:00-21:48 + 26:46-29:46)
platform_notes: Adapted from OpenClaw/Claude Code video for Agent Zero stack (Keplr + Spock + Tailscale + A2A)
---

# Discord Agent Management & Mission Control

## Overview

Discord is the most powerful interface for managing multiple AI agents simultaneously. Unlike Telegram, WhatsApp, or iMessage, Discord supports:

- **Multiple channels** — one per workflow, project, or agent
- **Parallel agent sessions** — each channel maintains its own context
- **Automated workflow routing** — agents post to channels, triggering downstream agents
- **Cron-scheduled agents** — agents spin up on schedule, post results, go idle
- **Direct agent lines** — talk to specific sub-agents privately
- **Pinned documents** — research, plans, architecture docs pinned per channel

**Our stack**: Keplr (Agent Zero on VPS) + Spock (Agent Zero on Chronos/OpenClaw) + Tailscale mesh + A2A protocol + Discord bot(s)

---

## Architecture Overview

```
Discord Server (Private — your eyes only)
│
├── 📋 AUTOMATED WORKFLOWS
│   ├── #alerts          ← trending content/tweets every 2hrs
│   ├── #research        ← deep-dive stories from alerts
│   ├── #scripts-content ← scripts/posts from research (approve with ✅/❌)
│   ├── #daily-digest    ← nightly summary of all agent activity
│   └── #[custom]        ← any recurring research channel
│
├── 🗂️ PROJECTS  
│   ├── #mission-control ← dashboard integration channel
│   ├── #meeting-prep    ← meeting agent outputs
│   ├── #social-loop     ← Facebook/Threads post drafts
│   ├── #analytics       ← content/wisdom card analytics
│   ├── #app-store-aso   ← ASO automation results
│   └── #[project-name]  ← one per active project
│
└── 🤖 DIRECT AGENT LINES
    ├── #keplr           ← main Agent Zero (VPS)
    ├── #spock           ← OpenClaw orchestrator (Chronos)
    ├── #[agent-name]    ← each sub-agent has own channel
    └── #[agent-name]    ← direct line, full computer access
```

---

## Part 1: Initial Discord Server Setup

### Step 1: Create Your Private Server

1. Open Discord → click **+** (Add a Server) in left sidebar
2. Choose **Create My Own** → **For me and my friends**
3. Name it something personal (e.g. `[YourName] Mission Control`)
4. ⚠️ **CRITICAL SECURITY RULE**: This server is for YOU ONLY. Never invite anyone else — your agents have full computer access through this interface.

### Step 2: Register a Discord Bot Application

1. Go to: **https://discord.com/developers/applications**
2. Click **New Application** → name it (e.g. `Keplr-Agent`)
3. Go to **Bot** section in left sidebar
4. Click **Add Bot** → confirm
5. Under **Privileged Gateway Intents**, enable ALL THREE:
   - ✅ Presence Intent
   - ✅ Server Members Intent  
   - ✅ Message Content Intent
6. Click **Reset Token** → copy the token (save it securely — shown only once)
7. Go to **OAuth2** → **URL Generator**:
   - Scopes: ✅ `bot`
   - Bot Permissions: ✅ `Administrator` (simplest for private server)
8. Copy the generated URL → open in browser → add bot to YOUR server

### Step 3: Configure Agent Zero Discord Integration

Tell your agent (via Telegram or current chat):

```
I want to set you up in a Discord server so I can communicate with you there. 
Please walk me through getting you in as a bot in Discord so I can communicate with you.
Here is my Discord bot token: [TOKEN]
My server name is: [SERVER NAME]
```

The agent will:
- Add Discord to its config (`~/.claude/` or Agent Zero settings)
- Connect to your server using the token
- Confirm it can see and post to channels
- Ask you to test by sending a message

### Step 4: Verify Connection

In Discord, type in any channel: `@YourBotName hello`  
Your agent should respond within a few seconds.

---

## Part 2: Channel Structure Setup

### Automated Prompt to Create All Channels

Send this to your agent in its direct channel:

```
I want to set up my Discord as a mission control for managing all my agents and projects.
Please create the following channel structure:

Category: AUTOMATED WORKFLOWS
- #alerts (trending content monitoring)
- #research (deep-dive research results)
- #content-drafts (scripts/posts for my approval)
- #daily-digest (nightly summary of all agent activity)

Category: PROJECTS  
- #mission-control
- #meeting-prep
- #social-loop
- #analytics
- #app-store-aso

Category: DIRECT AGENT LINES
- #keplr
- #spock

Make sure you can receive and respond to messages in each channel.
```

### Project Channel Rules

Each project channel:
- Maintains **full conversation history** for that project
- Agent has **complete access to your computer** from any channel
- Agent **pins key documents** (plans, architecture, reports) to channel
- You can switch context by switching channels — no context bleed

---

## Part 3: Automated Workflow Channels

### Simple Automation: Research/News Channel

Prompt template (customize topic):

```
Please create an automated research channel for me.
Every morning at 7:00 AM, spin up a sub-agent that:
1. Researches [YOUR TOPIC — e.g. "AI news and major model releases"]
2. Finds the top 5 most important stories from the last 24 hours
3. Summarizes each in 2-3 sentences with source links
4. Posts the report to #research channel

Set this up as a recurring cron job.
```

Agent will:
1. Create the channel
2. Write a cron job script
3. Schedule it (using system cron or Agent Zero scheduler)
4. Test run to verify it works

### Intermediate Automation: Competitor/Content Research

```
Please create a competitive research channel.
Every morning at 8:00 AM:
1. Search YouTube for videos about [YOUR NICHE] posted in the last 5 days
2. Rank them by views-per-hour (highest trending first)
3. List top 10 with title, channel, view count, views/hour, and link
4. Post to #research channel

You'll need a YouTube Data API key — please walk me through getting one.
```

**Note**: YouTube Data API is free. Agent will direct you to Google Cloud Console → enable YouTube Data API v3 → create credentials → API key.

### Advanced: Multi-Agent Chained Workflow

This is the most powerful pattern — agents trigger each other in sequence:

```
I want to set up a multi-agent chained workflow in Discord:

Step 1 — 7:00 AM: Spin up an ALERTS agent that:
- Searches for trending tweets/posts about [YOUR NICHE]
- Posts the top 10 trending items to #alerts channel

Step 2 — 7:30 AM: Spin up a RESEARCH agent that:
- Reads the #alerts channel
- Researches the full story behind each alert
- Posts detailed research summaries to #research channel

Step 3 — 8:00 AM: Spin up a CONTENT agent that:
- Reads the #research channel
- Writes a [post/script/brief] for each story in my writing style
- Posts each draft to #content-drafts with ✅ emoji for approval
- Trains itself on my ✅/❌ reactions over time

Set up all three as scheduled cron jobs with proper sequencing.
For tweet/X data, walk me through getting an X API key.
```

**X/Twitter API Note**: Pay-as-you-go at developer.twitter.com. Basic tier is inexpensive for this use case.

### Daily Digest Channel

```
Please set up a daily digest that runs every night at 10:00 PM.
It should:
1. Review all channel activity from the past 24 hours
2. Summarize: what each agent completed, what's pending my approval, what's blocked
3. List any tasks I need to action tomorrow morning
4. Post the summary to #daily-digest
```

---

## Part 4: Direct Agent Lines

Each agent/sub-agent gets its own channel for direct communication:

```
Please set up direct agent line channels for each of my agents and sub-agents.
I want to be able to open any channel and have a direct 1:1 conversation 
with that specific agent, with its full context preserved.

Agents to create channels for:
- Keplr (you — main Agent Zero on VPS)
- Spock (Agent Zero on Chronos — accessible via A2A at http://100.124.20.121:18790)
- Any sub-agents you spin up as part of workflow automation
```

From any direct agent channel you can:
- Ask about specific tasks it's working on
- Give feedback on outputs
- Check status of background jobs
- Override or redirect its current task

---

## Part 5: Our Specific Workflow Channels

### Meeting Prep Agent Channel (#meeting-prep)

```
Set up a meeting prep agent in #meeting-prep.
Every night at 10:00 PM:
1. Check my Google Calendar for meetings the next day
2. For each meeting, research the person/company online
3. Pull any notes from our previous interactions (check memory)
4. Generate a meeting brief with: who they are, agenda, talking points, 
   questions to ask, last interaction summary
5. Post the brief to #meeting-prep
```

### Social Media Loop Channel (#social-loop)

```
Set up a social media posting loop in #social-loop.
When I drop a bookmark/idea/link into this channel:
1. Extract the key insights
2. Write a Facebook/Threads post in my writing style
3. Score the predicted engagement (1-10)
4. Post draft to #social-loop for my review
5. After I approve (✅ reaction), schedule it via the Postess/Buffer API
6. After posting, check engagement after 24hrs and note what worked
7. Use that feedback to improve future drafts
```

### Analytics Channel (#analytics)

```
Set up a simplified analytics report in #analytics.
Every Monday at 9:00 AM:
1. Pull basic YouTube analytics (if API connected)
2. Report on: which video paths performed best, which wisdom cards got engagement
3. Simple scorecard: top 3 performers, bottom 3, one recommendation
4. Keep it brief — I am NOT a full-time content creator, just need signal
```

### App Store ASO Channel (#app-store-aso)

```
Set up an app store monitoring agent in #app-store-aso.
Every Sunday at 9:00 AM:
1. Pull App Store Connect analytics: impressions, downloads, conversion rate
2. Identify the lowest-hanging fruit improvements (title, description, screenshots)
3. Draft updated ASO copy with predicted impact
4. Post recommendations to #app-store-aso for my approval
5. After approval, use Fastlane to push metadata updates
```

---

## Part 6: Proactive Agents (Push Notifications)

Make agents proactive — they ping YOU rather than waiting:

```
For all automated workflow agents, configure them to:
1. @mention me when they need approval on something
2. Send an alert if a task fails or gets stuck
3. Post a completion summary when a major task finishes
4. Only ping for important things — no spam

I want to wake up to useful pings, not noise.
```

---

## Part 7: Security Rules

⚠️ **These are non-negotiable. Follow all of them.**

### The Core Security Principle
> Your agent has **complete access to your entire digital life** through Discord. Anyone who gets into your Discord server can control your computer, files, accounts, and workflows.

### Security Checklist

- ✅ **Server is PRIVATE** — you are the only member, ever
- ✅ **No friends, family, or colleagues** in this server
- ✅ **Don't add bots to other servers** — keep agent bots isolated
- ✅ **No autonomous email sending** — agent drafts, YOU send
- ✅ **No autonomous text/SMS sending** — too risky
- ✅ **No autonomous financial transactions** — always require your approval
- ✅ **Keep Agent Zero updated** — security patches ship regularly
- ✅ **Store bot token securely** — never share it, rotate if compromised
- ✅ **2FA on your Discord account** — non-negotiable
- ✅ **Review channel permissions** — bot should only have necessary scope

### What Agents CAN Do Autonomously
- Research and report findings
- Write drafts (posts, scripts, code)
- Schedule tasks
- Read from APIs (YouTube, App Store analytics)
- Post to Discord channels
- Run code on local/VPS machine

### What Agents Should NEVER Do Autonomously
- Send emails to external recipients
- Post to social media without approval
- Make purchases or financial moves
- Share files externally
- Invite others to Discord server

---

## Part 8: Reverse Prompt — Discover Your Custom Workflows

Once set up, use this reverse prompt to let your agent suggest workflows based on your context:

```
Based on everything you know about me, my goals, my business, my projects, 
and the workflows we've built together — what are the top 5 most impactful 
multi-agent automations we could create in Discord that I haven't set up yet?
Prioritize by: time saved × revenue impact.
```

This surfaces workflows tailored to YOU that generic tutorials won't cover.

---

## Part 9: Integration with Mission Control Dashboard

When Spock's mission control dashboard is ready, wire Discord into it:

```
Connect Discord channels to mission control dashboard:
1. Surface #daily-digest content on dashboard homepage
2. Show real-time agent status from #direct-agent-lines
3. Allow dashboard to post tasks/triggers into Discord channels
4. Mirror approval workflow: ✅/❌ in Discord reflects in dashboard
5. A2A endpoint: http://100.124.20.121:18790 (Spock on Chronos)
```

---

## Required API Keys / Credentials

| Service | Where to Get | Cost | Used For |
|---------|-------------|------|----------|
| Discord Bot Token | discord.com/developers/applications | Free | Agent ↔ Discord connection |
| YouTube Data API v3 | console.cloud.google.com | Free tier | Competitor/content research |
| X/Twitter API | developer.twitter.com | Pay-as-you-go | Trending tweet monitoring |
| Google Calendar API | console.cloud.google.com | Free | Meeting prep agent |
| App Store Connect API | appstoreconnect.apple.com | Free | ASO monitoring |

---

## Quick Start Prompts (Copy-Paste Ready)

### 1. Initial Bot Setup
```
I want to set you up in Discord so I can manage you and other agents there.
Please walk me through creating a Discord bot and connecting you to my private server.
```

### 2. Create Full Channel Structure
```
Please create my Discord mission control channel structure with these categories:
AUTOMATED WORKFLOWS: #alerts, #research, #content-drafts, #daily-digest
PROJECTS: #mission-control, #meeting-prep, #social-loop, #analytics, #app-store-aso
DIRECT AGENT LINES: #keplr, #spock
```

### 3. First Automated Workflow
```
Please build a new channel for AI news research. Every morning at 7am, 
spin up a sub-agent that finds the top 5 AI stories from the last 24 hours 
and posts a brief summary with links to #research.
```

### 4. Reverse Prompt
```
Based on everything you know about me, my goals, and our workflows — 
what are the top 5 most impactful multi-agent Discord automations I should build next?
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Bot not responding | Check token in agent config; verify bot has Message Content Intent enabled |
| Bot can't create channels | Grant Administrator permission in OAuth2 scope |
| Cron job not firing | Check system cron (`crontab -l`) or Agent Zero scheduler |
| Agent loses context between sessions | Each channel is a separate context; use memory tool to persist key info |
| Spock not reachable | Verify Tailscale active; check gateway rebind at 100.124.20.121:18790 |

