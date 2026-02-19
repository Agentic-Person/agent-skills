---
name: mtu-subscription-prices
version: 1.0.0
description: Step-by-step guide for changing subscription prices in Manifest the Unseen — covers App Store Connect, RevenueCat (auto-sync), mobile app (no changes needed), and landing page hardcoded prices.
tags: [mtu, manifest-the-unseen, subscriptions, revenuecat, app-store, pricing]
author: Keplr (converted from .claude/commands/prices.md)
source: manifest-the-unseen-ios/.claude/commands/prices.md
---

# MTU Subscription Price Change Guide

## Purpose
Change subscription prices for Manifest the Unseen across all surfaces.
Prices are managed in App Store Connect (source of truth) and sync to RevenueCat.
The mobile app fetches prices dynamically — only the landing page has hardcoded prices.

## Arguments
Optional: specify which tier(s) to update (Novice/Seeker, Awakening, Enlightenment) and new prices.

## Procedure

### Step 1: App Store Connect (Required)
1. Go to https://appstoreconnect.apple.com → Apps → Manifest the Unseen (ID: 6756403109)
2. Click **Subscriptions** in sidebar
3. Select subscription group → specific product
4. Scroll to **Subscription Prices** → Click **+**
5. Choose **"Plan Subscription Price Change"**
6. Select countries/regions and new price
7. Set start date (minimum 1-2 days ahead)
8. Handle existing subscribers:
   - **Preserve current price** (grandfathering) — recommended
   - **Apply to all** — requires consent for large increases

### Step 2: RevenueCat (Automatic — no action needed)
- Prices sync automatically from App Store Connect
- Verify in RevenueCat dashboard after ~24 hours
- No manual changes needed if V2 notifications are configured

### Step 3: Mobile App (No changes needed)
PaywallScreen uses dynamic pricing from RevenueCat:
- `offerings.novice_monthly?.pricePerMonth`
- `offerings.awakening_monthly?.pricePerMonth`
- `offerings.enlightenment_monthly?.pricePerMonth`

### Step 4: Landing Page (REQUIRED)
File: `web/components/Pricing.tsx`
Update the `tiers` array (lines 16-58):
```typescript
const tiers = [
  { name: 'Seeker', monthlyPrice: 7.99, yearlyPrice: 79.99 },
  { name: 'Awakening', monthlyPrice: 19.99, yearlyPrice: 199.99 },
  { name: 'Enlightenment', monthlyPrice: 49.99, yearlyPrice: 499.99 },
]
```
After updating, commit and redeploy to Vercel.

### Step 5: Documentation (Optional)
Update if needed:
- `docs/features/subscriptions/revenuecat-quick-reference.md`
- `docs/planning/manifest-the-unseen-summary.md`

## Product IDs
| Tier | Monthly ID | Annual ID |
|------|-----------|----------|
| Novice/Seeker | `manifest_novice_monthly` | `manifest_novice_yearly` |
| Awakening | `manifest_awakening_monthly` | `manifest_awakening_yearly` |
| Enlightenment | `manifest_enlightenment_monthly` | `manifest_enlightenment_yearly` |

## Timeline
| Event | Timeline |
|-------|----------|
| Schedule change in App Store Connect | 1-2 days before effective date |
| Sandbox propagation | Up to 1 hour |
| Production propagation | Up to 24 hours |
| Existing subscriber notification | 27-60 days before renewal |

## Important Rules
- Consent required for increases >50% AND >$5/period in certain regions
- Price decreases apply to ALL subscribers (cannot grandfather)
- Test in Sandbox first — allow 1 hour for metadata changes
- RevenueCat V2 notifications must be enabled for accurate revenue tracking
- Landing page MUST be manually updated — does not fetch prices dynamically
