---
name: content-analytics-basic
version: 1.0.0
title: Content Analytics (Basic)
description: Simplified analytics scorecard for non-content-creators. Tracks which video paths and wisdom cards are performing better than others. Minimal setup, maximum signal. Not a full creator analytics suite — just enough to make smart decisions.
tags: [analytics, youtube, content, wisdom-cards, video-paths, scorecard, simplified]
author: Keplr/Agent Zero
source_video: https://www.youtube.com/watch?v=FbepQKTwcbA
scope_note: SIMPLIFIED — user is not a content creator. Track wisdom cards and video paths only. No deep creator analytics.
---

# Content Analytics (Basic)

## ⚠️ Scope Note

This is intentionally **lightweight**. The goal is simple signal:
> *"Which wisdom cards and video paths are working better than others?"*

Not a full creator analytics suite. No deep dive on subscriber growth, thumbnails, or monetization. Just enough data to make smart decisions about what to keep making.

---

## What We Track

```
✅ TRACK
├── Wisdom card performance (views, watch time, click-through)
├── Video path performance (which journey converts best)
├── Top 3 performers vs bottom 3
└── One weekly recommendation

❌ DON'T TRACK
├── Subscriber growth obsession
├── Thumbnail A/B testing
├── Monetization/CPM
└── Competitor benchmarking
```

---

## Weekly Scorecard Format

Delivered every Monday to `#analytics` Discord channel:

```
📊 WEEKLY CONTENT SCORECARD — Week of [Date]

🏆 TOP PERFORMERS
1. [Video/Wisdom Card Name] — [Views] views, [Watch time]% retention
2. [Video/Wisdom Card Name] — [Views] views, [Watch time]% retention  
3. [Video/Wisdom Card Name] — [Views] views, [Watch time]% retention

📉 NEEDS WORK
1. [Video/Wisdom Card Name] — [Views] views, [issue]
2. [Video/Wisdom Card Name] — [Views] views, [issue]

📈 TREND
[One sentence: what's working this week vs last week]

💡 ONE RECOMMENDATION
[Single most actionable thing to do based on the data]

🃏 WISDOM CARD RANKINGS
[Simple ranked list with view counts]

🛤️ VIDEO PATH PERFORMANCE
[Which path/journey gets most completions]
```

---

## Required Integrations

| Integration | Purpose | Setup |
|-------------|---------|-------|
| **YouTube Data API v3** | Pull video analytics | Google Cloud Console → YouTube Data API → API key (free) |
| **YouTube Analytics API** | Watch time, retention, CTR | Same Google Cloud project — enable YouTube Analytics API |
| **Discord** | Deliver scorecard to `#analytics` | See discord-agent-management skill |

---

## Setup Instructions

### Step 1: Get YouTube API Access

```
Please set up YouTube Analytics access for my channel.
I need to pull basic video performance data — views, watch time, and click-through rate.
Walk me through setting up the YouTube Data API v3 and YouTube Analytics API.
```

Agent will:
1. Guide you to Google Cloud Console
2. Enable YouTube Data API v3 + YouTube Analytics API
3. Set up OAuth2 credentials (needed for Analytics — not just an API key)
4. Authenticate and verify channel access

### Step 2: Tag Your Wisdom Cards and Video Paths

For the agent to track these specifically, they need to be identifiable:

```
Please help me set up tracking for my wisdom cards and video paths.
Here are my wisdom cards: [list them]
Here are my video paths/journeys: [describe them]

Tag these in the analytics so we can track them separately from other content.
```

Simplest approach: name wisdom cards and video path videos with a consistent prefix in YouTube (e.g. `[WC]` for wisdom cards, `[VP-1]` for video path 1).

### Step 3: Set Up Weekly Report

```
Please set up a weekly analytics report for my content.
Every Monday at 9:00 AM:
1. Pull last 7 days of YouTube analytics for my channel
2. Identify which wisdom cards performed best vs worst
3. Identify which video paths had best completion rates
4. Generate the weekly scorecard
5. Post to #analytics in Discord

Keep it simple — I am not a full-time content creator.
Just tell me what's working and what one thing I should do differently.
```

---

## On-Demand Queries

Ask any time in `#analytics`:

```
# Quick performance check
How did my wisdom cards perform this month?

# Path comparison
Which video path is converting better — path 1 or path 2?

# Single video check  
How is [video name] performing? Is it worth keeping?

# Decision support
Based on analytics, which wisdom card should I make more of?
```

---

## Interpretation Guide

| Metric | What it means | Good threshold |
|--------|--------------|----------------|
| **Views** | Reach | Trending up week-over-week |
| **Watch time %** | How much they watch | >50% = good, >70% = great |
| **CTR (click-through)** | Thumbnail/title working | >4% = solid |
| **Path completion** | Journey finishing rate | >30% = good |

---

## Integration with Mission Control Dashboard

- Dashboard widget: simple scorecard summary (top 3 / bottom 3)
- Green/red indicators for week-over-week trend
- Link to full `#analytics` Discord thread
- A2A hook: `http://100.124.20.121:18790` for dashboard data feed
