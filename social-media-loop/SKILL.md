---
name: social-media-loop
version: 1.0.0
title: Social Media Self-Improving Loop
description: Turns bookmarks and ideas into style-matched Facebook/Threads posts. Scores predicted engagement, schedules posts, then analyzes actual performance after posting to continuously improve future drafts. LinkedIn-style loop adapted for Facebook and Threads.
tags: [social-media, facebook, threads, linkedin, content, automation, self-improving, scheduling, loop]
author: Keplr/Agent Zero
source_video: https://www.youtube.com/watch?v=FbepQKTwcbA
---

# Social Media Self-Improving Loop

## Overview

This skill automates the entire social media content pipeline:

```
Bookmarks/Ideas
     ↓
Style-matched draft (sounds like YOU, not AI)
     ↓
Engagement score prediction (1-10)
     ↓
Your review → approve with ✅ or refine
     ↓
Auto-schedule via Postess/Buffer
     ↓
Post goes live
     ↓
Agent checks engagement after 24hrs
     ↓
Self-improves next batch based on what worked
```

Platforms: **Facebook** and **Threads** (primary). LinkedIn compatible.

---

## Writing Style Training

Before the loop can run, the agent needs to learn your voice:

```
I want you to learn my writing style for social media posts.
Here are 10-15 examples of my best-performing posts: [paste posts]

Also here is my style guide:
- Tone: [personal/professional/casual]
- Topics I cover: [your topics]
- Things I avoid: [AI slop phrases, corporate speak, etc.]
- Post length preference: [short punchy / medium / long-form]
- Use of emojis: [yes/no/sometimes]

Please create a writing style guide from these examples and save it to memory.
Reference this guide every time you write posts for me.
```

---

## Bookmark Curation Sources

The agent monitors these sources for content ideas:

| Source | What to save | How |
|--------|-------------|-----|
| **Browser bookmarks** | Articles, threads, insights | Bookmark folder sync or manual paste |
| **Twitter/X bookmarks** | Saved tweets | Via X API or manual paste |
| **Discord #alerts** | Trending content from alerts channel | Automatic from chained workflow |
| **Direct ideas** | Your own thoughts/stories | Post directly to `#social-loop` channel |

---

## Loop Workflow Steps

### Step 1: Ingest Bookmarks
```
Please check my bookmarks and pull the latest saved items.
Extract the key insights from each one.
Select the 3 most interesting ones that fit my audience.
```

### Step 2: Draft Posts
```
For each selected bookmark, write:
1. A Facebook/Threads post in my exact writing style
2. A second variant (different angle/hook)
Make sure it sounds like me, not AI. No slop phrases.
```

### Step 3: Score & Present
Agent provides for each draft:
- **Predicted engagement score** (1-10) with reasoning
- **Top performing hook pattern** used
- **Suggested posting time**
- **Variants** — punchy version vs. more personal version

### Step 4: Review & Approve
In `#social-loop` Discord channel:
- ✅ reaction = approved, schedule it
- ❌ reaction = rejected, skip
- Reply with feedback = agent revises

### Step 5: Auto-Schedule
Upon ✅ approval:
```
Please schedule this post for [suggested time] via Postess.
Post to Facebook and Threads.
```

### Step 6: Performance Check (Self-Improvement Loop)
24 hours after each post:
```
Please check the engagement on my post from yesterday.
Compare actual vs predicted engagement score.
Note what worked (hook, length, topic, format).
Update my writing style guide with these learnings.
Apply improvements to the next batch of drafts.
```

---

## Required Integrations

| Integration | Purpose | Setup |
|-------------|---------|-------|
| **Postess** | Schedule and post to Facebook/Threads | Postess API key — see postess.app |
| **Facebook Graph API** | Post to Facebook page/profile | Meta Developer Portal → app credentials |
| **Threads API** | Post to Threads | Instagram/Threads Basic Display API |
| **X API** (optional) | Monitor trending tweets for ideas | developer.twitter.com — pay-as-you-go |
| **Browser bookmarks** | Content ideas source | Export bookmarks or use Chrome extension sync |
| **Discord** | Review channel `#social-loop` | See discord-agent-management skill |

---

## Discord Channel Setup

```
Please create a #social-loop channel in Discord.
This channel is for reviewing and approving social media post drafts.

Workflow:
- When new drafts are ready, post them here with ✅/❌ for approval
- When I react with ✅, automatically schedule the post via Postess
- When I react with ❌, discard and note what I didn't like
- When I reply with feedback, revise and repost for review
- After each post goes live, check engagement in 24hrs and report back here
```

---

## Scheduling the Automated Loop

```
Please set up an automated social media loop:
1. Every Sunday at 6:00 PM — pull my latest bookmarks, draft 5 posts for the week
2. Post all 5 drafts to #social-loop for my review
3. I'll approve/reject by Monday morning
4. Schedule approved posts across the week at optimal times
5. Every Monday at 9:00 AM — post engagement report for last week's posts
6. Use engagement data to improve this week's drafts
```

---

## Self-Improvement Mechanism

The loop gets better over time by tracking:

- **Hook patterns** that generate most engagement
- **Topics** your audience responds to most
- **Post length** that performs best
- **Posting times** with highest reach
- **Your ✅/❌ feedback** — training on your taste

```
After 30 days of running this loop, please:
1. Analyze all posts and engagement data
2. Identify the top 3 patterns that consistently perform well
3. Update my writing style guide with these patterns
4. Give me a brief report: what's working, what to do more of
```

---

## Integration with Mission Control Dashboard

- Dashboard shows: posts pending approval, scheduled posts this week, last week's engagement summary
- Quick approve/reject from dashboard (mirrors Discord ✅/❌)
- A2A hook: `http://100.124.20.121:18790` for dashboard status updates
