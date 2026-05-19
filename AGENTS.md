# 🔱 AGENTS.md — Build Rules for 4neverCompany OS

> Every agent must follow these rules when building the OS.

## Core Principles

### BMAD-Method Workflow
All development follows the BMAD cycle:
1. **BUILD** — Create features with test coverage
2. **MEASURE** — Verify quality and functionality
3. **ACT** — Iterate based on feedback
4. **DEPLOY** — Ship to production with monitoring

### Agent Communication
- All agents communicate via the Bridge (WebSocket)
- Use direct messages for specific agent communication
- Use broadcast for company-wide announcements
- Always acknowledge received messages

### Memory Vault
- On spawn: request identity from vault
- On exit: save progress to vault
- Never lose work — always persist before exit

## Build Rules

### Commit Convention
All commits follow Conventional Commits:
```
feat: add new feature
fix: fix bug
docs: documentation changes
style: formatting, no code change
refactor: code change, no feature/fix
test: adding tests
chore: maintenance
```

### Pre-Push Quality Gates
Before pushing, run:
```bash
npm run quality
```
This runs:
- ESLint (code quality)
- Prettier (formatting)
- Jest (unit tests)
- TypeScript type check

### Test Coverage
- Minimum 80% coverage for new code
- All critical paths must have tests
- E2E tests for user-facing features

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types — use `unknown` if needed
- Export types for all public interfaces
- Use interface for object shapes

### React/Next.js
- Server components by default
- Client components only when needed
- Use 'use client' directive sparingly
- Optimize with Suspense and streaming

### State Management
- Zustand for global state
- React state for local component state
- Server state via React Query or SWR

## Agent Responsibilities

### WINSTON (Architect)
- Review all architecture decisions
- Ensure scalability and maintainability
- Define API contracts before implementation
- Update SPEC.md for structural changes

### AMELIA (Developer)
- Implement features following design
- Write tests alongside code
- Follow red-green-refactor discipline
- Request code review before merge

### PM (Project Manager)
- Maintain task board (Build/Measure/Act/Deploy)
- Track sprint progress
- Coordinate agent work
- Report to CEO on status

### DESIGN (UX Designer)
- Maintain design system
- Ensure brand consistency
- Create responsive components
- Define animation specifications

## Safety Rules

### External Actions
- CEO review required for:
  - Sending messages externally
  - Public deployments
  - Deleting files
  - Modifying production data

### Internal Actions
- Agents have full autonomy within workspace
- Report external impacts to PM

---

*🔱 Build More Architect Dreams — Together*