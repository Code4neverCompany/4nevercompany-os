# 🎨 Design Skills

## Component Design

### Structure
```typescript
// 1. Props interface
interface Props {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// 2. Variants as utility classes
const variants = {
  primary: 'bg-gold text-surface hover:bg-gold-light',
  secondary: 'bg-white/10 text-white hover:bg-white/20',
};

// 3. Sizes
const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

// 4. Component
export function Button({ variant = 'primary', size = 'md', ...props }: Props) {
  return (
    <button
      className={clsx(
        'rounded-lg font-medium transition-all',
        variants[variant],
        sizes[size]
      )}
      {...props}
    />
  );
}
```

## Glassmorphism

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}
```

## Animation Guidelines

### Timing
- Micro-interactions: 150-200ms
- Page transitions: 300-400ms
- Loading states: infinite
- Easing: ease-out for entries, ease-in for exits

### Motion
```typescript
// Entry animation
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Hover effects
const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};
```

## Design Tokens

```typescript
// Tailwind theme extension
const theme = {
  colors: {
    gold: {
      DEFAULT: '#C5A059',
      light: '#D4B06A',
      dark: '#A8893F',
    },
    cyan: {
      DEFAULT: '#00FFFF',
      dark: '#00CCCC',
    },
  },
  animation: {
    'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'float': 'float 6s ease-in-out infinite',
  },
};
```

---

*Visual excellence, user-focused, creative excellence*