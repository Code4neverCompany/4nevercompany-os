'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Task, BMADPhase, TaskStatus } from '@/types';

const mockTasks: Task[] = [
  { id: 't1', title: 'Setup project scaffold', description: 'Initialize Next.js, Tailwind, TypeScript', assignee: 'amelia', bmadPhase: 'implementation', status: 'completed', createdAt: Date.now() - 3600000, updatedAt: Date.now() - 1800000 },
  { id: 't2', title: 'Write SPEC.md', description: 'Full architecture and BMAD integration', assignee: 'mavis', bmadPhase: 'solution', status: 'active', createdAt: Date.now() - 2400000, updatedAt: Date.now() - 600000 },
  { id: 't3', title: 'Design office floor UI', description: 'Agent visualization, spawn tree', assignee: 'design', bmadPhase: 'plan', status: 'active', createdAt: Date.now() - 1800000, updatedAt: Date.now() - 900000 },
  { id: 't4', title: 'Create agent personas', description: 'Winston, Amelia, PM, DESIGN definitions', assignee: 'winston', bmadPhase: 'solution', status: 'planned', createdAt: Date.now() - 1200000, updatedAt: Date.now() - 1200000 },
  { id: 't5', title: 'Implement Bridge', description: 'WebSocket real-time comms', assignee: 'amelia', bmadPhase: 'implementation', status: 'planned', createdAt: Date.now() - 600000, updatedAt: Date.now() - 600000 },
  { id: 't6', title: 'Integrate Hermes WSL2', description: 'Bridge to tmux session manager', assignee: 'hermes', bmadPhase: 'analysis', status: 'blocked', createdAt: Date.now() - 300000, updatedAt: Date.now() - 300000 },
];

const bmadColumns: { phase: BMADPhase; label: string; color: string }[] = [
  { phase: 'analysis', label: 'ANALYSIS', color: 'border-purple-500' },
  { phase: 'plan', label: 'PLAN', color: 'border-blue-500' },
  { phase: 'solution', label: 'SOLUTION', color: 'border-cyan-500' },
  { phase: 'implementation', label: 'IMPLEMENT', color: 'border-green-500' },
  { phase: 'deploy', label: 'DEPLOY', color: 'border-gold' },
];

function TaskCard({ task }: { task: Task }) {
  const statusColors: Record<TaskStatus, string> = {
    completed: 'bg-green-500/20 text-green-400',
    active: 'bg-blue-500/20 text-blue-400',
    planned: 'bg-gray-500/20 text-gray-400',
    blocked: 'bg-red-500/20 text-red-400',
    postponed: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-3 hover:bg-white/5 transition-all cursor-pointer"
    >
      <h4 className="font-medium text-sm mb-1 truncate">{task.title}</h4>
      <p className="text-xs text-gray-500 mb-2 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400">{task.assignee}</span>
        <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusColors[task.status]}`}>
          {task.status.toUpperCase()}
        </span>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [selectedPhase, setSelectedPhase] = useState<BMADPhase | 'all'>('all');

  const filteredTasks = selectedPhase === 'all'
    ? mockTasks
    : mockTasks.filter(t => t.bmadPhase === selectedPhase);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold flex items-center gap-2">
          <span>📊</span>
          <span className="text-gradient-cyan">Dashboard</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            <span className="text-gold font-mono">{mockTasks.filter(t => t.status === 'active').length}</span> active
            <span className="mx-2">|</span>
            <span className="text-green-400 font-mono">{mockTasks.filter(t => t.status === 'completed').length}</span> done
          </div>
        </div>
      </div>

      {/* Phase Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedPhase('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            selectedPhase === 'all' ? 'bg-gold text-surface' : 'glass-card hover:bg-white/5'
          }`}
        >
          All Phases
        </button>
        {bmadColumns.map((col) => (
          <button
            key={col.phase}
            onClick={() => setSelectedPhase(col.phase)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border-l-4 ${
              selectedPhase === col.phase
                ? `bg-surface-light ${col.color}`
                : `glass-card hover:bg-white/5 border-transparent`
            }`}
          >
            {col.label}
          </button>
        ))}
      </div>

      {/* BMAD Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
        {bmadColumns.map((col) => {
          const columnTasks = mockTasks.filter(t => t.bmadPhase === col.phase);
          return (
            <div key={col.phase} className="min-w-[200px]">
              <div className={`glass-card p-3 border-l-4 ${col.color} mb-3`}>
                <h3 className="font-mono text-sm font-bold">{col.label}</h3>
                <p className="text-xs text-gray-500">{columnTasks.length} tasks</p>
              </div>
              <div className="space-y-2">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent Status Overview */}
      <div className="glass-card p-4">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <span>🔴</span>
          <span>System Status</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'HERMES', status: 'running', tasks: 3 },
            { name: 'WINSTON', status: 'idle', tasks: 1 },
            { name: 'AMELIA', status: 'running', tasks: 2 },
            { name: 'PM', status: 'waiting', tasks: 1 },
            { name: 'DESIGN', status: 'idle', tasks: 1 },
          ].map((agent) => (
            <div key={agent.name} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${agent.status === 'running' ? 'bg-green-500 animate-pulse' : agent.status === 'waiting' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
              <span className="text-sm font-mono">{agent.name}</span>
              <span className="text-xs text-gray-500 ml-auto">{agent.tasks}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}