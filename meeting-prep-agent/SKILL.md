---
name: meeting-prep-agent
version: 1.0.0
title: Meeting Prep Agent
description: Before every meeting, automatically researches the person/company, checks calendar, retrieves CRM notes and past interactions, and delivers a one-page meeting brief with agenda, talking points, action items, and questions to ask.
tags: [meetings, calendar, crm, research, productivity, automation, scheduling]
author: Keplr/Agent Zero
source_video: https://www.youtube.com/watch?v=FbepQKTwcbA
---

# Meeting Prep Agent

## Overview

Before every meeting you have, this agent automatically:
1. Reads your calendar for upcoming meetings
2. Researches who you're meeting (LinkedIn, web, social)
3. Checks your CRM/memory for past interactions
4. Checks Granola (or equivalent) for previous meeting notes
5. Generates a one-page meeting brief delivered to your `#meeting-prep` Discord channel

Result: You walk into every meeting fully prepared — no manual research needed.

---

## Trigger Options

| Method | When | How |
|--------|------|-----|
| **Scheduled** | Nightly 10 PM | Checks next day's calendar automatically |
| **On-demand** | Any time | Ask agent: "Prep me for my meeting with [Name]" |
| **Discord** | Post name/link to `#meeting-prep` | Agent generates brief on demand |

---

## What the Brief Contains

```
📋 MEETING BRIEF — [Person Name] — [Date/Time]

👤 WHO THEY ARE
- Name, role, company
- LinkedIn summary
- Notable background / achievements
- Online presence / recent activity

🤝 OUR HISTORY
- Last interaction date and summary
- Key decisions made
- Outstanding action items from last time
- Relationship context

📅 THIS MEETING
- Agenda / stated purpose
- My goals for this call
- Their likely goals

💬 TALKING POINTS
- 3 topics to cover
- Context/framing for each

❓ QUESTIONS TO ASK
- Top 3 questions prepared

⚠️ RISKS / WATCH OUTS
- Any blockers, sensitivities, or things to avoid

✅ ACTION ITEMS FROM LAST MEETING
- Outstanding items still pending
```

---

## Required Integrations

| Integration | Purpose | Setup |
|-------------|---------|-------|
| **Google Calendar API** | Read upcoming meetings | Google Cloud Console → Calendar API → OAuth2 credentials |
| **Granola** (or equivalent) | Previous meeting notes | Export notes via API or file sync |
| **Agent Memory** | Past interaction history | Agent Zero memory tool (automatic) |
| **Web Search** | Research person/company | Built into Agent Zero |
| **LinkedIn** | Profile research | Via browser agent or scraping |
| **Discord** | Deliver brief to `#meeting-prep` | See discord-agent-management skill |

---

## Setup Instructions

### Step 1: Connect Google Calendar

```
Please connect to my Google Calendar so you can check my upcoming meetings.
Walk me through setting up Google Calendar API access.
```

Agent will:
- Guide you to Google Cloud Console
- Enable Calendar API
- Set up OAuth2 credentials
- Store credentials in config

### Step 2: Connect Granola (Meeting Notes)

Granola records meetings and turns them into structured notes. To connect:
```
I use Granola for meeting notes. Please check how to access Granola notes 
either via their API or by reading the local notes folder they sync to.
```

Alternative: If not using Granola, any note-taking tool that exports to text/markdown works.

### Step 3: Create the CRM Memory Layer

Agent Zero's memory tool serves as a lightweight CRM:
```
After each meeting I have, please save a summary to memory including:
- Person name, company, role
- Key points discussed
- Decisions made
- Action items for both parties
- My overall impression
- Next steps
```

Over time, the agent builds a rich history of every person you've interacted with.

### Step 4: Set Up the Nightly Schedule

In your `#meeting-prep` Discord channel:
```
Please set up a nightly meeting prep run at 10:00 PM.
Every night:
1. Check my Google Calendar for meetings tomorrow
2. For each meeting, research the person using web search and LinkedIn
3. Check my memory/CRM for any past interactions with them
4. Check Granola notes for any previous meeting with them
5. Generate a meeting brief and post it to #meeting-prep
6. @mention me so I know the brief is ready
```

---

## Example Agent Prompts

### On-demand brief
```
I have a meeting with Sarah Chen from Acme Corp tomorrow at 2 PM.
Please prepare my meeting brief — research her on LinkedIn and the web,
check if we've interacted before, and generate the full brief.
```

### Post-meeting capture
```
I just finished my meeting with Sarah Chen. Here are my notes: [paste notes]
Please save this to memory with full context so you can reference it next time.
```

### Quick reminder
```
What do I know about John from last week's call? What were the action items?
```

---

## Discord Channel Setup

```
Please create a #meeting-prep channel in Discord.
Post all meeting briefs there automatically each night.
@mention me when a new brief is ready.
Pin the most recent brief so I can find it easily.
```

---

## Integration with Mission Control Dashboard

The mission control dashboard can surface:
- Today's upcoming meetings with brief status (ready / pending)
- Outstanding action items from past meetings
- Quick link to full brief in `#meeting-prep` Discord channel

A2A hook: Agent posts brief summary to `http://100.124.20.121:18790` for dashboard ingestion.
