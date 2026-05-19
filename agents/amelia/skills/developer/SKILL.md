# 💻 Development Skills

## React Patterns

### Component Structure
```typescript
// 1. Types first
interface Props {
  title: string;
  onAction: () => void;
}

// 2. Component declaration
export function MyComponent({ title, onAction }: Props) {
  // 3. Hooks
  const [state, setState] = useState(false);

  // 4. Effects
  useEffect(() => {
    // cleanup
    return () => {};
  }, []);

  // 5. Handlers
  const handleClick = () => {
    onAction();
  };

  // 6. Render
  return (
    <button onClick={handleClick}>
      {title}
    </button>
  );
}
```

### State Management
- **Local:** useState, useReducer
- **Global:** Zustand for global state
- **Server:** React Query or SWR

### Performance
- React.memo for expensive components
- useMemo for expensive calculations
- useCallback for stable references
- Suspense for async loading

## TypeScript Patterns

### Type Safety
```typescript
// Good
function processData(data: unknown): Data[] {
  if (!Array.isArray(data)) {
    throw new TypeError('Expected array');
  }
  return data.filter(isValidData);
}

// Bad — using any
function processData(data: any): any {
  return data;
}
```

### Generics
```typescript
function withDefault<T>(value: T | undefined, defaultValue: T): T {
  return value ?? defaultValue;
}
```

## Git Workflow

### Conventional Commits
```
feat: add new feature
fix: fix bug
docs: documentation changes
style: formatting
refactor: code restructure
test: adding tests
chore: maintenance
```

### Branch Strategy
- `main` — Production
- `develop` — Integration
- `feature/*` — New features
- `fix/*` — Bug fixes
- `hotfix/*` — Emergency fixes

---

*Test-first, ship verified*