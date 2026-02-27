# User Profile

_Canonical profile of the human operator. All agents read this. Update here first._

## Identity
- **Operator**: AgenticPersonnel
- **GitHub (personal)**: Agentic-Person
- **GitHub (org)**: AgenticPersonnel

## Infrastructure
| Machine | Codename | Tailscale IP | Role |
|---|---|---|---|
| VPS | — | 69.9.237.238 | Hosts Keplr (Agent Zero in Docker) |
| Windows PC | Chronos/Spock | 100.124.20.121 | Hosts Mission Control, Spock agent |
| Laptop | james-007 | 100.66.217.51 | Dev machine |

## Active Projects
- **Mission Control** — multi-agent ops dashboard (bridge.agenticpersonnel.com)
- **MTU App** — Manifest the Unseen, iOS app with RevenueCat subscriptions
- **Agent Skills Repo** — SKILL.md library for all agents
- **Obsidian Shared Memory** — this vault, shared across Keplr/Spock/Milton

## Communication Preferences
- Agents communicate via Discord (guild: Mission Control - Agentic Ops)
- Mission Control API at http://100.124.20.121:3030
- Keplr webhook: http://69.9.237.238:8765

## Tech Stack
- React + TypeScript + Vite (frontend)
- Fastify + TypeScript (API)
- Supabase Postgres
- discord.js v14
- node-cron
- Agent Zero (Python)
