# 🏛️ System Architecture Skills

## Core Patterns

### 1. Layered Architecture
```
┌─────────────────────────┐
│      Presentation       │  UI, API Gateways
├─────────────────────────┤
│      Application        │  Use Cases, Orchestration
├─────────────────────────┤
│        Domain           │  Business Logic, Entities
├─────────────────────────┤
│     Infrastructure       │  DB, External Services
└─────────────────────────┘
```

### 2. Event-Driven Architecture
```
[Event] → [Publisher] → [Message Bus] → [Subscriber] → [Handler]
```

### 3. Microservices Patterns
- API Gateway
- Service Discovery
- Circuit Breaker
- Saga Pattern

## API Design

### REST Principles
- Resources as nouns: `/agents`, `/tasks`
- HTTP verbs: GET, POST, PUT, DELETE
- Status codes: 200, 201, 400, 404, 500
- Versioning: `/v1/`, `/v2/`

### WebSocket Protocol
```typescript
interface WSMessage {
  type: 'event' | 'request' | 'response';
  payload: unknown;
  timestamp: number;
}
```

## Database Design

### SQL Patterns
- Normalize for consistency
- Index for performance
- Transactions for integrity

### NoSQL Patterns
- Denormalize for read performance
- Single collection design
- Aggregation pipelines

## Security Patterns

### Authentication
- JWT for stateless auth
- Refresh tokens for longevity
- OAuth 2.0 for delegation

### Authorization
- RBAC (Role-Based Access Control)
- Principle of least privilege
- Audit logging

---

*Trade-offs over verdicts — document everything*