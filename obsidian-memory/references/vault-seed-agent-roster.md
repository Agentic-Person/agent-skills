# Agent Roster

_All active agents in the AgenticPersonnel system._

## Keplr
- **Type**: Agent Zero (Python, Docker)
- **Host**: VPS at 69.9.237.238
- **Role**: General AI assistant, orchestrator, primary user-facing agent
- **Webhook**: http://69.9.237.238:8765/discord (no auth)
- **Auth token**: keplr-65b827bcfb3837bd7cc8a96e5262d76d878f3e3ab5a939c1
- **Discord channel**: #keplr
- **Memory**: FAISS at /a0/usr/memory/default/ + this Obsidian vault
- **Status**: ✅ Active

## Spock
- **Type**: TBD (Windows/Chronos machine)
- **Host**: Spock/Chronos at 100.124.20.121
- **Role**: Mission Control operator, Discord service host, local Windows automation
- **Mission Control API**: http://100.124.20.121:3030
- **Discord channel**: #spock
- **Obsidian vault host**: Runs Obsidian + Local REST API on port 27123
- **Status**: ✅ Active

## Milton
- **Type**: TBD
- **Host**: TBD
- **Role**: TBD — pending setup
- **Status**: 🔜 Pending

## Coordination
- Agents share this Obsidian vault via Tailscale
- Discord is the primary async communication layer
- Mission Control dashboard is the human-readable status view
