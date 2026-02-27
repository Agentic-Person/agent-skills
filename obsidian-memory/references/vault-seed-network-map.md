# Network Map

_All machines, IPs, ports. Keep updated as infrastructure changes._

## Tailscale VPN Topology

| Machine | Codename | Tailscale IP | Public IP | OS |
|---|---|---|---|---|
| Agent Zero VPS | — | — | 69.9.237.238 | Linux (Docker) |
| Windows workstation | Chronos/Spock | 100.124.20.121 | dynamic | Windows |
| Dev laptop | james-007 | 100.66.217.51 | dynamic | macOS/Windows |

## Running Services

| Service | Host | Port | Auth | Notes |
|---|---|---|---|---|
| Keplr webhook (v2) | VPS | 8765 | None (/discord), token (/webhook) | Receives Discord messages |
| Mission Control API | Spock | 3030 | None | Fastify, feeds dashboard |
| Obsidian REST API | Spock | 27123 | Bearer token | Requires Obsidian running |
| Agent Zero web UI | VPS | 80/443 | — | Keplr web interface |

## Key Endpoints

```
GET  http://100.124.20.121:3030/health
GET  http://100.124.20.121:3030/api/agents
GET  http://100.124.20.121:3030/api/tasks
POST http://100.124.20.121:3030/api/tasks
GET  http://100.124.20.121:3030/api/comms_threads

POST http://69.9.237.238:8765/discord       (no auth)
POST http://69.9.237.238:8765/webhook       (Bearer token)

GET  https://100.124.20.121:27123/vault/    (Obsidian API — SSL self-signed)
```
