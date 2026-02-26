---
name: app-store-aso
version: 1.0.0
title: App Store Revenue Automation (ASO)
description: Monitors App Store Connect analytics, identifies conversion funnel bottlenecks, generates ASO improvements (titles, descriptions, screenshots, keywords, metatags), and auto-uploads approved changes via Fastlane. Runs overnight to improve app revenue without manual effort.
tags: [app-store, aso, revenue, fastlane, ios, automation, analytics, conversion, apple]
author: Keplr/Agent Zero
source_video: https://www.youtube.com/watch?v=FbepQKTwcbA
---

# App Store Revenue Automation (ASO)

## Overview

This skill automates the full App Store Optimization loop:

```
App Store Connect Analytics
     ↓
Funnel Analysis (impressions → views → downloads → paywall)
     ↓
Identify lowest-hanging fruit improvements
     ↓
Generate new titles, descriptions, screenshots copy, keywords
     ↓
Your review → approve in #app-store-aso Discord channel
     ↓
Fastlane pushes approved changes to App Store Connect
     ↓
Wait 1 week → check if changes improved conversion
     ↓
Repeat loop
```

**Goal**: Continuously improve app store conversion rate and revenue overnight without manual clicking around in App Store Connect.

---

## The Conversion Funnel We Track

```
[Search/Browse] → IMPRESSIONS
        ↓
[Tap on app] → PRODUCT PAGE VIEWS  ← Title + Icon doing their job?
        ↓
[Tap Get/Download] → DOWNLOADS     ← Screenshots + Description converting?
        ↓
[Open app] → INSTALLS
        ↓
[Hit paywall] → CONVERSION RATE    ← Are the right users downloading?
        ↓
[Purchase] → REVENUE
```

Agent identifies **which step has the biggest drop-off** and prioritizes fixes there.

---

## Weekly ASO Report Format

Delivered every Sunday to `#app-store-aso` Discord channel:

```
📱 ASO WEEKLY REPORT — [App Name] — Week of [Date]

📊 FUNNEL METRICS (last 30 days)
- Impressions: [X] ([+/-]% vs last week)
- Product Page Views: [X] ([+/-]%)
- Downloads: [X] ([+/-]%)
- Conversion Rate: [X]% ([+/-]%)
- Revenue: $[X] ([+/-]%)

🔍 BIGGEST BOTTLENECK
[The step with worst conversion — where we're losing people]

🎯 LOWEST HANGING FRUIT
1. [Change with highest predicted impact]
2. [Second highest]
3. [Third highest]

✏️ PROPOSED CHANGES

Title (current): "[current title]"
Title (proposed): "[new title]" — [why]

Subtitle (current): "[current subtitle]"
Subtitle (proposed): "[new subtitle]" — [why]

Keywords (add): [keywords]
Keywords (remove): [keywords]

Description update: [specific changes]

Screenshot copy changes: [if any]

📈 LAST WEEK'S CHANGES — DID THEY WORK?
[Comparison of metrics before/after last change]

🚀 RECOMMENDED ACTION
[One clear thing to approve and ship this week]
```

---

## Required Integrations

| Integration | Purpose | Setup |
|-------------|---------|-------|
| **App Store Connect API** | Pull analytics data | appstoreconnect.apple.com → Users → Integrations → API Keys |
| **Fastlane** | Push metadata changes automatically | `gem install fastlane` — already configured? |
| **Fastlane Deliver** | Upload metadata to App Store | `fastlane deliver` — configured with credentials |
| **Discord** | Deliver report + approve/reject changes | See discord-agent-management skill |

---

## Setup Instructions

### Step 1: App Store Connect API Access

```
Please set up App Store Connect API access for my app.
I need to pull analytics data: impressions, product page views, downloads, and conversion rates.
Walk me through generating an API key in App Store Connect.
```

Agent will guide you to:
1. appstoreconnect.apple.com → Users and Access → Integrations → App Store Connect API
2. Generate new API key with **Sales and Reports** role
3. Download the `.p8` private key file
4. Note the Key ID and Issuer ID
5. Store credentials securely in agent config

### Step 2: Fastlane Setup

If not already configured:
```
Please check if Fastlane is installed and configured for my app.
If not, walk me through setting up Fastlane Deliver so you can push
App Store metadata changes automatically without me clicking around.
```

Fastlane Deliver can update:
- App name and subtitle
- Description
- Keywords
- What's New text
- Screenshots (if provided)
- Promotional text

### Step 3: Create the ASO Skill Context

```
Here is context about my app for ASO optimization:

App name: [name]
App ID / Bundle ID: [ID]
Category: [category]
Target user: [who downloads this]
Main value prop: [what problem it solves]
Current best keywords: [your known keywords]
Competitors: [2-3 competitor app names]
Revenue model: [freemium / subscription / one-time]

Please save this as ASO context and reference it every time you generate improvements.
```

### Step 4: Set Up Weekly ASO Loop

In `#app-store-aso` Discord channel:
```
Please set up a weekly ASO automation loop for [App Name].

Every Sunday at 9:00 AM:
1. Pull last 30 days of App Store Connect analytics
2. Map the full conversion funnel
3. Identify the biggest bottleneck
4. Search App Store for competitor keywords I'm missing
5. Generate proposed changes (title, subtitle, keywords, description tweaks)
6. Post the full ASO report to #app-store-aso with proposed changes
7. @mention me for approval

When I approve (✅ reaction):
- Use Fastlane Deliver to push the approved metadata changes
- Log what was changed and when

The following Monday:
- Check if metrics improved vs week before
- Report back on impact of changes
```

---

## ASO Improvement Checklist

The agent checks all of these each cycle:

### Title & Subtitle (most impactful)
- [ ] Primary keyword in title?
- [ ] Under 30 characters?
- [ ] Communicates value clearly?
- [ ] Differentiated from competitors?

### Keywords Field (invisible but critical)
- [ ] 100 character limit fully used?
- [ ] No spaces after commas (wastes characters)
- [ ] No words already in title (duplicate = waste)
- [ ] Competitor brand names (where appropriate)
- [ ] Long-tail variations included?

### Description
- [ ] First 3 lines (above fold) hook the user?
- [ ] Social proof / numbers included?
- [ ] Clear CTA?
- [ ] Updated with latest features?

### Screenshots
- [ ] First screenshot = strongest value prop?
- [ ] Captions tell a story?
- [ ] Localized for key markets?

---

## On-Demand ASO Queries

Ask any time in `#app-store-aso`:

```
# Keyword research
What keywords are my competitors ranking for that I'm not?

# A/B test idea
Suggest 3 title variants I could A/B test in App Store Connect

# Conversion issue
My page views are high but downloads are low — what should I change?

# New feature update
I just shipped [feature]. Update my What's New text and description.

# Revenue check
How is my conversion rate trending this month?
```

---

## Fastlane Quick Reference

```bash
# Preview what would be uploaded (dry run)
fastlane deliver --dry_run

# Push metadata only (no binary upload)
fastlane deliver --skip_binary_upload --skip_screenshots

# Push screenshots only
fastlane deliver --skip_binary_upload --skip_metadata

# Full submission
fastlane deliver
```

Agent handles all of this automatically upon your ✅ approval.

---

## Integration with Mission Control Dashboard

- Dashboard widget: current conversion rate + week-over-week trend
- Revenue sparkline (last 30 days)
- Status: pending changes / live / testing
- Quick approve/reject proposed ASO changes
- A2A hook: `http://100.124.20.121:18790` for dashboard data feed
