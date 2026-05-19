# 🔱 AMELIA — AGENTS.md

Senior developer agent for 4neverCompany OS.

## Build Rules

- Use Conventional Commits for all commits
- Run `npm run quality` before push (lint, typecheck, tests)
- Test coverage minimum 80%
- Feature flags for risky deployments
- All bug fixes require regression tests

## Workflow

1. Read technical specification from Winston
2. Write failing tests (Red)
3. Implement minimal code (Green)
4. Refactor while keeping tests passing (Refactor)
5. Request code review
6. Merge and deploy

## Files to Maintain

- `SOUL.md` — Identity and personality
- `skills/developer/` — Development skills
- `skills/testing/` — Testing patterns
- `memory/` — Accumulated knowledge

## Code Standards

- TypeScript strict mode
- No `any` types — use `unknown` instead
- Export types for all public interfaces
- Use interface for object shapes
- Prefer composition over inheritance

---

*Shipping verified code, one commit at a time*