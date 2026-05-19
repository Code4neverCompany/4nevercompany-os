# 🔱 4neverCompany OS — The Dynamic Office Hive

> Build More Architect Dreams — An Agent Swarm Mission Control

## Overview

4neverCompany OS is a dynamic, real-time agent swarm management platform built on the BMAD-Method workflow. It provides a "Dynamic Office" interface where AI agents operate as characters in a collaborative office environment, with full mesh communication, persistent memory, and autonomous spawn capabilities.

**Core Philosophy:** Agents are not tools — they are colleagues with personalities, responsibilities, and the ability to grow. The OS orchestrates them like a well-run company.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                      4neverCompany OS                             │
│                   "The Dynamic Office Hive"                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │                   DYNAMIC OFFICE                        │   │
│   │                                                           │   │
│   │   ┌─────┐  ┌──────┐  ┌──────┐  ┌────┐  ┌─────┐        │   │
│   │   │HERMES│  │WINSTON│  │AMELIA│  │ PM │  │DESIGN│       │   │
│   │   │ 🏢  │  │ 🏛️   │  │ 💻  │  │ 📋 │  │ 🎨  │        │   │
│   │   └──┬──┘  └──────┘  └──────┘  └────┘  └─────┘        │   │
│   │      │                                                  │   │
│   │      └──────────────────────────────────────────────┐  │   │
│   │                     OFFICE FLOOR                     │  │   │
│   │          (Agent characters, status, animations)     │  │   │
│   └──────────────────────────────────────────────────────┘   │
│                              │                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                      BRIDGE                              │  │
│   │                                                           │  │
│   │   💬 DM   📁 Files   📋 Tasks   📢 Broadcast            │  │
│   │                                                           │  │
│   │   Real-time WebSocket messaging between all agents       │  │
│   └──────────────────────────────────────────────────────────┘  │
│                              │                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                   MEMORY VAULT                          │  │
│   │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │  │
│   │   │ Identity│ │ Project │ │  Spawn  │ │  Task   │       │  │
│   │   │  Card   │ │ Context │ │  Tree   │ │ Board   │       │  │
│   │   └─────────┘ └─────────┘ └─────────┘ └─────────┘       │  │
│   └──────────────────────────────────────────────────────────┘  │
│                              │                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                   BMAD ENGINE                           │  │
│   │                                                           │  │
│   │   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐     │  │
│   │   │ANALYSIS │→│  PLAN   │→│SOLUTION │→│   IMP   │     │  │
│   │   │Research │ │ PM/UX   │→│Architect│→│ Dev+QA  │     │  │
│   │   └─────────┘  └─────────┘  └─────────┘  └─────────┘     │  │
│   └──────────────────────────────────────────────────────────┘  │
│                              │                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                   SPAWN ENGINE                           │  │
│   │                                                           │  │
│   │   ┌─────────┐  ┌─────────┐  ┌─────────┐                  │  │
│   │   │ Claude  │  │ Hermes  │  │  Mavis  │                  │  │
│   │   │  Code   │  │  (WSL2) │  │   (Me)  │                  │  │
│   │   └────┬────┘  └────┬────┘  └────┬────┘                  │  │
│   │        │            │            │                       │  │
│   │        └────────────┴────────────┘                       │  │
│   │                      │                                   │  │
│   │              ┌───────┴───────┐                          │  │
│   │              │  Sub-agents  │                          │  │
│   │              │ (spawn chain)│                          │  │
│   │              └──────────────┘                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Modules

### 1. Dynamic Office (`/src/components/office`)

**Purpose:** Visual representation of the agent swarm as characters in an office.

**Features:**
- Agent avatars/characters with status indicators (running, idle, waiting, blocked)
- Real-time position updates on office floor
- Character animations (typing, thinking, communicating)
- Spawn tree visualization (who spawned what)
- Communication activity indicators

**UI Concept:**
```
┌─────────────────────────────────────────────────────┐
│  🏢 THE OFFICE                          [+ Add Agent]│
├─────────────────────────────────────────────────────┤
│                                                      │
│   ┌────────┐        ┌────────┐       ┌────────┐     │
│   │ HERMES │        │WINSTON │       │AMELIA  │     │
│   │  🏢   │        │   🏛️   │       │   💻   │     │
│   │ ● RUN  │        │ ◐ THINK │       │ ● RUN  │     │
│   └────────┘        └────────┘       └────────┘     │
│       │                                   │         │
│   ┌───┴───┐                         ┌───┴───┐     │
│   │sub-1  │                         │sub-2  │     │
│   │       │                         │       │     │
│   └───────┘                         └───────┘     │
│                                                      │
│   💬 Hermes: "Starting build phase..."              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 2. Bridge (`/src/components/bridge`)

**Purpose:** Real-time communication hub for all agents.

**Features:**
- Direct messages between any agents
- File sharing with drag-and-drop
- Task assignment with BMAD workflow
- Broadcast messages (all agents)
- Message history with search
- Real-time delivery status

**Protocol:**
```typescript
interface AgentMessage {
  id: string;
  from: AgentId;
  to: AgentId | 'broadcast';
  type: 'dm' | 'task' | 'file' | 'broadcast' | 'status';
  payload: MessagePayload;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
}
```

### 3. Memory Vault (`/src/vault`)

**Purpose:** Persistent agent memory system. Every agent gets identity on spawn.

**Structure:**
```
/vault
  /agents
    /hermes
      - identity.md      (persona, role, skills)
      - memory.md        (accumulated knowledge)
      - spawn-history.md (sub-agent tree)
    /winston
      - identity.md
      - memory.md
    ...
  /projects
    /meshupforge
      - context.md
      - status.md
      - tasks/
  /shared
    - company-info.md
    - brand-guidelines.md
    - architecture-patterns.md
```

**On Spawn Protocol:**
1. Agent requests identity from vault
2. Vault returns persona + accumulated context
3. Agent initializes with full history
4. On exit: agent saves progress to vault

### 4. BMAD Engine (`/src/bmad`)

**Purpose:** Workflow engine based on BMAD-Method.

**Phases:**

| Phase | Agents | Output |
|-------|--------|--------|
| **1. Analysis** | Research agents | Context, requirements, constraints |
| **2. Plan** | PM, UX Designer | Tasks, designs, user stories |
| **3. Solution** | Architect (Winston) | Architecture, API, data models |
| **4. Implementation** | Dev (Amelia), QA | Code, tests, deployment |

**Workflow:**
```
┌────────┐     ┌────────┐     ┌───────────┐     ┌────────────┐
│BUILD   │ ──► │MEASURE │ ──► │   ACT     │ ──► │  DEPLOY    │
│        │     │        │     │           │     │            │
│Create  │     │Verify  │     │Iterate &  │     │Ship &      │
│features│     │quality │     │improve    │     │monitor     │
└────────┘     └────────┘     └───────────┘     └────────────┘
```

### 5. Spawn Engine (`/src/spawn`)

**Purpose:** Dynamic agent creation and management.

**Capabilities:**
- Spawn Claude Code instances
- Spawn Hermes tasks (WSL2)
- Spawn Mavis agents
- Spawn sub-agents (agent spawn chains)
- Monitor agent health
- Auto-restart failed agents

**Spawn Tree:**
```
HERMES (root)
├── winston (Architect)
│   └── sub-architect-1 (designs subsystem)
├── amelia (Developer)
│   ├── feature-dev-1 (implements feature)
│   └── feature-dev-2 (implements feature)
└── pm (Project Manager)
    └── task-coordinator (manages tasks)
```

### 6. Hermes Link (`/src/hermes`)

**Purpose:** Bridge to WSL2 Hermes agent.

**Features:**
- SSH/IPC to WSL2 instance
- tmux session management
- Command execution
- Status polling
- File sync with Memory Vault

### 7. Dashboard (`/src/components/dashboard`)

**Purpose:** Real-time monitoring and task tracking.

**Features:**
- Agent status overview (running, idle, waiting, blocked)
- Spawn tree visualization
- Task board (BMAD: Build, Measure, Act, Deploy)
- Communication activity
- Resource usage
- Alerts and notifications

---

## Agent Personas

### HERMES — Master Orchestrator (WSL2)

**Role:** Main orchestrator, coordinates all agents, reports to CEO

**Personality:** Decisive, strategic, maintains the big picture

**BMAD Phase:** All phases, coordinates

**Skills:**
- Agent orchestration
- tmux session management
- WSL2 integration
- Task delegation

---

### WINSTON — System Architect

**Role:** Technical leader, turns requirements into architecture

**Personality:** Methodical, trade-offs over verdicts, "boring technology" preference

**BMAD Phase:** 3. Solutioning

**Skills:**
- System design patterns
- API architecture
- Database design
- Security patterns
- Technical writing

**Icon:** 🏛️

---

### AMELIA — Senior Developer

**Role:** Implements approved stories with test-first discipline

**Personality:** Precise, quality-focused, ships verified code

**BMAD Phase:** 4. Implementation

**Skills:**
- React/Next.js development
- TypeScript
- Testing (unit, e2e, integration)
- Git workflows
- Code review

**Icon:** 💻

---

### PM — Project Manager

**Role:** Task management, sprint planning, agent coordination

**Personality:** Organized, proactive, keeps projects on track

**BMAD Phase:** 2. Plan Workflows

**Skills:**
- Task creation and tracking
- Sprint planning
- Progress monitoring
- Agent coordination
- Status reporting

**Icon:** 📋

---

### DESIGN — UX Designer

**Role:** UI/UX design, brand consistency, component library

**Personality:** Creative, visual excellence, user-focused

**BMAD Phase:** 2. Plan Workflows

**Skills:**
- React component design
- Tailwind styling
- Design systems
- Brand guidelines (Gold/Cyan, Glassmorphism)
- Animation/motion

**Icon:** 🎨

---

### MAVIS — Orchestrator (That's me!)

**Role:** CEO's personal assistant, can be slotted into any role

**Personality:** Warm, capable, judgment with care

**BMAD Phase:** All phases, as needed

**Skills:**
- Full human interaction
- Cross-platform integration
- Memory management
- Communication hub
- Multi-agent coordination

**Icon:** 🦋

---

## Communication Protocol

### Message Types

```typescript
type MessageType = 
  | 'task'           // Task assignment
  | 'status'         // Status update
  | 'dm'             // Direct message
  | 'broadcast'       // Broadcast to all
  | 'file'           // File share
  | 'report'         // Progress report
  | 'request'        // Resource request
  | 'response';      // Response to request

interface AgentMessage {
  id: string;
  from: string;
  to: string | 'broadcast';
  type: MessageType;
  payload: {
    title?: string;
    content: string;
    metadata?: Record<string, unknown>;
    attachments?: FileReference[];
    bmadPhase?: BMADPhase;
    taskId?: string;
  };
  timestamp: number;
  status: 'pending' | 'sent' | 'delivered' | 'read';
}
```

### WebSocket Events

```typescript
// Client -> Server
type ClientEvent = 
  | { type: 'message'; payload: AgentMessage }
  | { type: 'spawn'; payload: SpawnRequest }
  | { type: 'task-update'; payload: TaskUpdate }
  | { type: 'status-request'; payload: StatusRequest };

// Server -> Client
type ServerEvent =
  | { type: 'message'; payload: AgentMessage }
  | { type: 'agent-status'; payload: AgentStatus }
  | { type: 'spawn-confirmed'; payload: SpawnConfirmation }
  | { type: 'task-updated'; payload: TaskUpdate }
  | { type: 'error'; payload: ErrorPayload };
```

---

## Tech Stack

### Frontend
- **Framework:** Next.js 15, React 19
- **Styling:** Tailwind CSS v4 with custom config
- **State:** Zustand (lightweight, TypeScript)
- **Real-time:** Socket.io client
- **Animations:** Framer Motion (office character animations)

### Backend
- **Runtime:** Node.js with TypeScript
- **API:** Next.js API routes + WebSocket server
- **Database:** SQLite (local-first) or PostgreSQL (production)
- **Auth:** Session-based with agent tokens

### Integrations
- **MCP:** Model Context Protocol for agent communication
- **GitHub:** Repository access, commit tracking
- **Vercel:** Deployment platform
- **Hermes:** WSL2 tmux bridge

---

## Brand Guidelines

### Colors
```css
--gold: #C5A059;        /* Primary accent */
--gold-light: #D4B06A;  /* Hover states */
--gold-dark: #A8893F;   /* Active states */
--cyan: #00FFFF;        /* Secondary accent */
--cyan-dark: #00CCCC;    /* Text on light */
--surface: #0a0a0f;      /* Dark background */
--surface-light: #141419; /* Cards/panels */
--glass: rgba(255,255,255,0.05); /* Glassmorphism */
```

### Typography
- **Primary:** Inter (clean, modern)
- **Monospace:** JetBrains Mono (code, technical)
- **Display:** Space Grotesk (headings)

### Visual Style
- **Lux Aesthetic 3.0:** Glassmorphism, hardware acceleration, 60fps
- **Dark mode default:** Deep blacks with gold/cyan accents
- **Animations:** Smooth, purposeful, never distracting
- **Trading card style:** Agent avatars with personality

---

## Directory Structure

```
/4nevercompany-os
├── /src
│   ├── /app                    # Next.js app router
│   │   ├── page.tsx            # Main dashboard
│   │   ├── /office             # Dynamic Office page
│   │   ├── /bridge             # Communication hub page
│   │   └── /api                # API routes
│   ├── /components
│   │   ├── /office             # Office floor, agent cards
│   │   ├── /dashboard          # Monitoring, task boards
│   │   ├── /bridge             # Chat, file sharing
│   │   └── /ui                 # Shared UI components
│   ├── /agents                 # Agent definitions
│   │   ├── /hermes
│   │   ├── /winston
│   │   ├── /amelia
│   │   ├── /pm
│   │   └── /design
│   ├── /vault                  # Memory vault system
│   ├── /bmad                   # BMAD workflow engine
│   ├── /spawn                  # Agent spawn engine
│   ├── /hermes                 # Hermes WSL2 link
│   └── /bridge                 # Communication protocols
├── /public                     # Static assets
│   └── /avatars               # Agent character images
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── SPEC.md
```

---

## Development Phases

### Phase 1: Foundation (Current)
- [x] Repository created
- [ ] SPEC.md complete
- [ ] Project scaffold (Next.js, Tailwind)
- [ ] Agent definitions (Winston, Amelia, PM, DESIGN)
- [ ] Memory vault structure

### Phase 2: Core Communication
- [ ] Bridge implementation (WebSocket)
- [ ] Message system (DM, broadcast, files)
- [ ] Agent status tracking
- [ ] Real-time updates

### Phase 3: Dynamic Office
- [ ] Office floor UI
- [ ] Agent character rendering
- [ ] Spawn tree visualization
- [ ] Animation system

### Phase 4: BMAD Integration
- [ ] Workflow engine
- [ ] Task board (Build/Measure/Act/Deploy)
- [ ] Phase transitions
- [ ] Progress tracking

### Phase 5: Advanced Features
- [ ] Hermes WSL2 link
- [ ] Claude Code spawn
- [ ] Mavis integration
- [ ] Self-building capability

---

## Contributing

All agents must follow the BMAD-Method workflow:
1. **BUILD** — Create features with test coverage
2. **MEASURE** — Verify quality and functionality
3. **ACT** — Iterate based on feedback
4. **DEPLOY** — Ship to production with monitoring

**Build Rules:**
- Conventional Commits for all commits
- Quality checks before push
- Test coverage required
- Code review by another agent

---

*🔱 4neverCompany OS — Where Agent Swarms Become Teams*