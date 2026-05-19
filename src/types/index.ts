// Agent types
export type AgentId = 'hermes' | 'winston' | 'amelia' | 'pm' | 'design' | 'mavis' | string;

export type AgentStatus = 'running' | 'idle' | 'waiting' | 'blocked' | 'spawning';

export interface Agent {
  id: AgentId;
  name: string;
  icon: string;
  status: AgentStatus;
  role: string;
  bmadPhase: BMADPhase | 'all';
  spawnedBy?: AgentId;
  subAgents?: AgentId[];
  currentTask?: string;
  position?: { x: number; y: number };
}

export type BMADPhase = 'analysis' | 'plan' | 'solution' | 'implementation' | 'deploy';

// Message types
export type MessageType = 'task' | 'status' | 'dm' | 'broadcast' | 'file' | 'report' | 'request' | 'response';

export interface FileReference {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface MessagePayload {
  title?: string;
  content: string;
  metadata?: Record<string, unknown>;
  attachments?: FileReference[];
  bmadPhase?: BMADPhase;
  taskId?: string;
}

export interface AgentMessage {
  id: string;
  from: AgentId;
  to: AgentId | 'broadcast';
  type: MessageType;
  payload: MessagePayload;
  timestamp: number;
  status: 'pending' | 'sent' | 'delivered' | 'read';
}

// Task types
export type TaskStatus = 'planned' | 'active' | 'blocked' | 'postponed' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee?: AgentId;
  bmadPhase: BMADPhase;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
}

// Spawn types
export interface SpawnRequest {
  type: 'claude-code' | 'hermes' | 'mavis' | 'sub-agent';
  agentId: AgentId;
  parentId?: AgentId;
  config?: Record<string, unknown>;
}

export interface SpawnConfirmation {
  success: boolean;
  agentId: AgentId;
  message?: string;
}

// WebSocket events
export interface ClientEvent {
  type: 'message' | 'spawn' | 'task-update' | 'status-request';
  payload: unknown;
}

export interface ServerEvent {
  type: 'message' | 'agent-status' | 'spawn-confirmed' | 'task-updated' | 'error';
  payload: unknown;
}