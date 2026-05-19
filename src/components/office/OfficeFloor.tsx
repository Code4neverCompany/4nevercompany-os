'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Agent, AgentStatus } from '@/types';

const mockAgents: Agent[] = [
  {
    id: 'hermes',
    name: 'HERMES',
    icon: '🏢',
    status: 'running',
    role: 'Master Orchestrator',
    bmadPhase: 'all',
    subAgents: ['hermes-sub-1'],
    currentTask: 'Coordinating swarm operations',
  },
  {
    id: 'winston',
    name: 'WINSTON',
    icon: '🏛️',
    status: 'idle',
    role: 'System Architect',
    bmadPhase: 'solution',
    spawnedBy: 'hermes',
    currentTask: 'Awaiting architecture request',
  },
  {
    id: 'amelia',
    name: 'AMELIA',
    icon: '💻',
    status: 'running',
    role: 'Senior Developer',
    bmadPhase: 'implementation',
    spawnedBy: 'hermes',
    subAgents: ['feature-dev-1'],
    currentTask: 'Implementing Dynamic Office UI',
  },
  {
    id: 'pm',
    name: 'PM',
    icon: '📋',
    status: 'waiting',
    role: 'Project Manager',
    bmadPhase: 'plan',
    spawnedBy: 'hermes',
    currentTask: 'Awaiting task assignment from CEO',
  },
  {
    id: 'design',
    name: 'DESIGN',
    icon: '🎨',
    status: 'idle',
    role: 'UX Designer',
    bmadPhase: 'plan',
    spawnedBy: 'hermes',
    currentTask: 'Ready for design tasks',
  },
];

function StatusBadge({ status }: { status: AgentStatus }) {
  const config = {
    running: { color: 'bg-green-500', label: 'RUN' },
    idle: { color: 'bg-gray-500', label: 'IDLE' },
    waiting: { color: 'bg-yellow-500', label: 'WAIT' },
    blocked: { color: 'bg-red-500', label: 'BLOCKED' },
    spawning: { color: 'bg-purple-500', label: 'SPAWN' },
  };

  const { color, label } = config[status];

  return (
    <div className={`flex items-center gap-1.5 text-xs font-mono`}>
      <div className={`w-2 h-2 rounded-full ${color} ${status === 'running' ? 'animate-pulse' : ''}`} />
      <span className="text-gray-400">{label}</span>
    </div>
  );
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-4 hover:bg-white/5 transition-all group cursor-pointer"
    >
      {/* Agent Avatar */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
          {agent.icon}
        </div>
        <div>
          <h3 className="font-bold text-lg">{agent.name}</h3>
          <p className="text-sm text-gray-400">{agent.role}</p>
        </div>
      </div>

      {/* Status */}
      <div className="mb-3">
        <StatusBadge status={agent.status} />
      </div>

      {/* Current Task */}
      <div className="text-sm">
        <p className="text-gray-500 mb-1">Current Task:</p>
        <p className="text-gray-300 font-medium truncate">{agent.currentTask}</p>
      </div>

      {/* BMAD Phase */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs text-gray-500">BMAD Phase:</span>
        <span className={`text-xs font-mono px-2 py-1 rounded ${
          agent.bmadPhase === 'all' ? 'bg-gold/20 text-gold' :
          agent.bmadPhase === 'solution' ? 'bg-cyan/20 text-cyan' :
          agent.bmadPhase === 'implementation' ? 'bg-green-500/20 text-green-400' :
          'bg-gray-500/20 text-gray-400'
        }`}>
          {agent.bmadPhase.toUpperCase()}
        </span>
      </div>

      {/* Sub-agents */}
      {agent.subAgents && agent.subAgents.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-gray-500">Spawned:</span>
          <div className="flex gap-1">
            {agent.subAgents.map((subId) => (
              <span key={subId} className="text-xs bg-white/10 px-2 py-0.5 rounded font-mono">
                {subId}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function OfficeFloor() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold flex items-center gap-2">
          <span>🏢</span>
          <span className="text-gradient-gold">The Office</span>
        </h2>
        <button className="glass-card px-4 py-2 text-sm hover:bg-gold/10 transition-all flex items-center gap-2">
          <span>➕</span>
          <span>Add Agent</span>
        </button>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {mockAgents.map((agent, index) => (
          <div key={agent.id} onClick={() => setSelectedAgent(agent)}>
            <AgentCard agent={agent} index={index} />
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="glass-card p-4">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <span>💬</span>
          <span>Activity</span>
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-xs font-mono text-gray-500">14:32</span>
            <span className="text-gold">HERMES</span>
            <span>Starting build phase...</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-xs font-mono text-gray-500">14:31</span>
            <span className="text-cyan">AMELIA</span>
            <span>Implementing office UI components</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-xs font-mono text-gray-500">14:30</span>
            <span className="text-gray-300">WINSTON</span>
            <span>Architecture review complete</span>
          </div>
        </div>
      </div>
    </div>
  );
}