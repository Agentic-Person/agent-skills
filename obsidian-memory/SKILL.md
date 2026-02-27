# Obsidian Shared Memory

## Metadata
- **name**: obsidian-memory
- **version**: 1.0.0
- **description**: Read and write to the shared AgenticPersonnel Obsidian vault hosted on Spock/Chronos. Use as a human-readable, canonical knowledge layer shared across all agents (Keplr, Spock, Milton). Complements FAISS vector memory — use Obsidian for structured persistent context, use FAISS for fast semantic retrieval.
- **tags**: memory, obsidian, shared-knowledge, keplr, spock, milton, vault
- **author**: Keplr

---

## Overview

The AgenticPersonnel Obsidian vault lives on **Spock/Chronos** (Windows machine at `100.124.20.121`).  
It is exposed via the **Local REST API** community plugin on port **27123**, secured by an API key.  
All agents on the Tailscale network can reach it at `https://100.124.20.121:27123`.

> ⚠️ The REST API requires Obsidian to be **running** on Spock. If requests fail, Obsidian may be closed.

---

## Connection Details

| Property | Value |
|---|---|
| Host | `100.124.20.121` (Spock/Chronos — Tailscale IP) |
| Port | `27123` |
| Protocol | `https` (self-signed cert — use `-k` with curl or `verify=False` in requests) |
| Auth header | `Authorization: Bearer <OBSIDIAN_API_KEY>` |
| API key env var | `OBSIDIAN_API_KEY` (set in agent environment) |
| Interactive API docs | `https://coddingtonbear.github.io/obsidian-local-rest-api/` |

---

## Vault Folder Structure

```
AgenticPersonnel Vault/
├── Shared/                        # All agents read/write — common ground truth
│   ├── user-profile.md            # Human operator profile, preferences, goals
│   ├── company-context.md         # AgenticPersonnel org info, mission, stack
│   ├── agent-roster.md            # All agents: roles, capabilities, endpoints
│   ├── active-projects.md         # Current projects with status + assigned agents
│   └── projects/                  # One note per project
│       ├── mission-control.md
│       ├── mtu-app.md
│       └── agent-skills-repo.md
│
├── Keplr/                         # Keplr's personal memory space
│   ├── profile.md                 # Keplr's role, capabilities, config
│   ├── session-log.md             # Ongoing session notes / task history
│   ├── learnings.md               # Things Keplr has learned / discovered
│   └── memories/                  # Individual memory notes (one note per memory)
│
├── Spock/                         # Spock's personal memory space
│   ├── profile.md                 # Spock's role, Windows env, capabilities
│   ├── session-log.md
│   ├── learnings.md
│   └── memories/
│
├── Milton/                        # Milton's personal memory space
│   ├── profile.md                 # Milton's role (TBD when set up)
│   ├── session-log.md
│   ├── learnings.md
│   └── memories/
│
└── Infrastructure/                # Technical reference — all agents read
    ├── network-map.md             # IPs, ports, Tailscale topology
    ├── api-endpoints.md           # All running APIs and their schemas
    ├── discord-architecture.md    # Discord channels, bot config, workflow map
    └── deployment-notes.md        # VPS, Docker, PM2 config notes
```

---

## Core Operations

### 1. Read a Note

```bash
curl -k -s \
  -H "Authorization: Bearer $OBSIDIAN_API_KEY" \
  "https://100.124.20.121:27123/vault/Shared/user-profile.md"
```

In Python:
```python
import requests

BASE = "https://100.124.20.121:27123"
HEADERS = {"Authorization": f"Bearer {OBSIDIAN_API_KEY}"}

def read_note(path: str) -> str:
    """path = vault-relative path, e.g. 'Shared/user-profile.md'"""
    r = requests.get(f"{BASE}/vault/{path}", headers=HEADERS, verify=False)
    r.raise_for_status()
    return r.text
```

---

### 2. Create or Overwrite a Note

```bash
curl -k -s -X PUT \
  -H "Authorization: Bearer $OBSIDIAN_API_KEY" \
  -H "Content-Type: text/markdown" \
  --data-binary @/path/to/local.md \
  "https://100.124.20.121:27123/vault/Keplr/learnings.md"
```

In Python:
```python
def write_note(path: str, content: str) -> None:
    """Creates or fully overwrites a note."""
    r = requests.put(
        f"{BASE}/vault/{path}",
        headers={**HEADERS, "Content-Type": "text/markdown"},
        data=content.encode("utf-8"),
        verify=False
    )
    r.raise_for_status()
```

---

### 3. Append to a Note (PATCH — insert at end of section)

```bash
curl -k -s -X PATCH \
  -H "Authorization: Bearer $OBSIDIAN_API_KEY" \
  -H "Content-Type: text/markdown" \
  -H "Heading: Session Log" \
  --data-binary "\n- 2026-02-26: Completed Discord service wiring\n" \
  "https://100.124.20.121:27123/vault/Keplr/session-log.md"
```

In Python:
```python
def append_to_note(path: str, content: str, heading: str = None) -> None:
    """Appends content to a note, optionally under a specific heading."""
    headers = {**HEADERS, "Content-Type": "text/markdown"}
    if heading:
        headers["Heading"] = heading
    r = requests.patch(
        f"{BASE}/vault/{path}",
        headers=headers,
        data=content.encode("utf-8"),
        verify=False
    )
    r.raise_for_status()
```

---

### 4. List Notes in a Folder

```bash
curl -k -s \
  -H "Authorization: Bearer $OBSIDIAN_API_KEY" \
  "https://100.124.20.121:27123/vault/Keplr/memories/"
```

In Python:
```python
def list_notes(folder: str) -> list[str]:
    """Returns list of note filenames in a folder."""
    r = requests.get(f"{BASE}/vault/{folder}/", headers=HEADERS, verify=False)
    r.raise_for_status()
    return r.json().get("files", [])
```

---

### 5. Delete a Note

```python
def delete_note(path: str) -> None:
    r = requests.delete(f"{BASE}/vault/{path}", headers=HEADERS, verify=False)
    r.raise_for_status()
```

---

### 6. Search Notes

```bash
curl -k -s -X POST \
  -H "Authorization: Bearer $OBSIDIAN_API_KEY" \
  -H "Content-Type: application/json" \
  --data '{"query": "Discord service"}' \
  "https://100.124.20.121:27123/search/simple/"
```

In Python:
```python
def search_vault(query: str) -> list[dict]:
    r = requests.post(
        f"{BASE}/search/simple/",
        headers={**HEADERS, "Content-Type": "application/json"},
        json={"query": query},
        verify=False
    )
    r.raise_for_status()
    return r.json()
```

---

## Memory Save Pattern (Agent Workflow)

When saving an important memory, use **both** FAISS and Obsidian:

```python
import requests, os
from datetime import datetime

OBSIDIAN_BASE = "https://100.124.20.121:27123"
OBSIDIAN_KEY = os.environ.get("OBSIDIAN_API_KEY", "")
HEADERS = {"Authorization": f"Bearer {OBSIDIAN_KEY}"}
AGENT_NAME = "Keplr"  # change per agent

def save_to_obsidian_memory(title: str, content: str) -> None:
    """Saves a timestamped memory note to this agent's Obsidian memories folder."""
    timestamp = datetime.now().strftime("%Y-%m-%d-%H%M")
    safe_title = title.replace(" ", "-").lower()[:50]
    path = f"{AGENT_NAME}/memories/{timestamp}-{safe_title}.md"
    note = f"# {title}\n\n_Saved: {timestamp}_\n\n{content}\n"
    requests.put(
        f"{OBSIDIAN_BASE}/vault/{path}",
        headers={**HEADERS, "Content-Type": "text/markdown"},
        data=note.encode("utf-8"),
        verify=False
    )
    print(f"Obsidian note saved: {path}")
```

---

## Shared Context Read Pattern

Use this at the start of any task that needs full project context:

```python
def get_shared_context() -> dict:
    """Pulls all core shared context notes."""
    notes = ["Shared/user-profile.md", "Shared/company-context.md", 
             "Shared/active-projects.md", "Shared/agent-roster.md"]
    context = {}
    for note in notes:
        try:
            r = requests.get(f"{OBSIDIAN_BASE}/vault/{note}", 
                           headers=HEADERS, verify=False)
            if r.status_code == 200:
                context[note] = r.text
        except Exception as e:
            context[note] = f"ERROR: {e}"
    return context
```

---

## Setup Checklist (for Spock)

- [ ] Install **Local REST API** plugin in Obsidian (Community Plugins → search "Local REST API")
- [ ] Enable plugin, generate API key, note it down
- [ ] Confirm plugin is serving on port `27123`
- [ ] Add `OBSIDIAN_API_KEY=<key>` to all agent `.env` files
- [ ] Create vault folder structure (Shared/, Keplr/, Spock/, Milton/, Infrastructure/)
- [ ] Seed `Shared/user-profile.md` with operator profile
- [ ] Seed `Shared/agent-roster.md` with agent info
- [ ] Test from Keplr: `curl -k -H "Authorization: Bearer <key>" https://100.124.20.121:27123/vault/`

---

## Notes & Caveats

- **Obsidian must be running** on Spock for API to respond — build error handling / retry logic
- SSL cert is self-signed — use `verify=False` in Python `requests`, `-k` in curl
- Vault files are plain **Markdown** — humans can read/edit them directly in Obsidian
- Use `[[WikiLinks]]` between notes to build a knowledge graph visible in Obsidian's graph view
- Obsidian Sync (paid) or Git plugin can replicate vault to other machines for backup
