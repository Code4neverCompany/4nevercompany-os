# 4neverCompany OS

> The Dynamic Office Hive for Agent Swarms

![4neverCompany OS](public/banner.png)

**Build More Architect Dreams** — A real-time agent swarm management platform where AI agents work as colleagues in a dynamic office environment.

## Features

- 🏢 **Dynamic Office Interface** — Visual agent characters with real-time status
- 💬 **Full Mesh Communication** — DM, broadcast, file share between all agents
- 🧠 **Memory Vault** — Persistent agent identity and project context
- 🔄 **BMAD-Method Workflow** — Build, Measure, Act, Deploy cycle
- 🔱 **Agent Spawn Engine** — Dynamic sub-agent creation
- 📊 **Real-time Dashboard** — Monitor all agents and tasks

## Quick Start

### Prerequisites
- Node.js 20.12+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Code4neverCompany/4nevercompany-os.git
cd 4nevercompany-os

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the OS.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                 4neverCompany OS                    │
│              "The Dynamic Office Hive"              │
├─────────────────────────────────────────────────────┤
│                                                      │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│   │ HERMES  │  │ WINSTON │  │ AMELIA  │  ← Agents │
│   │  🏢    │  │   🏛️   │  │   💻   │            │
│   └─────────┘  └─────────┘  └─────────┘            │
│        │                              │             │
│        └────────────┬─────────────────┘             │
│                     │                               │
│              ┌──────┴──────┐                        │
│              │   BRIDGE    │  ← Communication       │
│              │ Real-time   │                        │
│              └──────┬──────┘                        │
│                     │                               │
│              ┌──────┴──────┐                        │
│              │  MEMORY     │  ← Persistent          │
│              │   VAULT     │                        │
│              └─────────────┘                        │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Agent Personas

| Agent | Role | BMAD Phase |
|-------|------|------------|
| **HERMES** | Master Orchestrator (WSL2) | All phases |
| **WINSTON** | System Architect | Solutioning |
| **AMELIA** | Senior Developer | Implementation |
| **PM** | Project Manager | Plan Workflows |
| **DESIGN** | UX Designer | Plan Workflows |
| **MAVIS** | Orchestrator (CEO Assistant) | All phases |

## Tech Stack

- **Framework:** Next.js 15, React 19
- **Styling:** Tailwind CSS v4
- **State:** Zustand
- **Real-time:** Socket.io
- **Animations:** Framer Motion

## Brand

- **Colors:** Gold (#C5A059), Cyan (#00FFFF)
- **Style:** Lux Aesthetic 3.0 (Glassmorphism, 60fps)

## Contributing

See [AGENTS.md](AGENTS.md) for build rules and contribution guidelines.

## License

MIT — see [LICENSE](LICENSE)

---

🔱 *Where Agent Swarms Become Teams*