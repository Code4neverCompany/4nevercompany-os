'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AgentMessage, AgentId } from '@/types';

const mockMessages: AgentMessage[] = [
  { id: 'm1', from: 'hermes', to: 'amelia', type: 'dm', payload: { content: 'Start implementing the office floor UI' }, timestamp: Date.now() - 120000, status: 'read' },
  { id: 'm2', from: 'amelia', to: 'hermes', type: 'report', payload: { title: 'Progress Update', content: 'OfficeFloor component created, waiting for design tokens' }, timestamp: Date.now() - 60000, status: 'delivered' },
  { id: 'm3', from: 'winston', to: 'broadcast', type: 'broadcast', payload: { title: 'Architecture Ready', content: 'SPEC.md is comprehensive and ready for implementation' }, timestamp: Date.now() - 30000, status: 'read' },
  { id: 'm4', from: 'design', to: 'amelia', type: 'dm', payload: { content: 'Here are the color tokens for the office UI', attachments: [{ id: 'a1', name: 'design-tokens.json', type: 'application/json', size: 2048, url: '#' }] }, timestamp: Date.now() - 10000, status: 'delivered' },
];

const agents: AgentId[] = ['hermes', 'winston', 'amelia', 'pm', 'design', 'mavis'];

export default function Bridge() {
  const [selectedRecipient, setSelectedRecipient] = useState<AgentId | 'broadcast'>('amelia');
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState<'dm' | 'task' | 'broadcast'>('dm');

  const sendMessage = () => {
    if (!messageContent.trim()) return;
    // In production, this would send via WebSocket
    console.log({ to: selectedRecipient, type: messageType, content: messageContent });
    setMessageContent('');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold flex items-center gap-2">
          <span>💬</span>
          <span className="text-gradient-gold">Bridge</span>
        </h2>
        <div className="text-sm text-gray-400">
          {mockMessages.length} messages
        </div>
      </div>

      {/* Message Composer */}
      <div className="glass-card p-4 space-y-4">
        <div className="flex gap-4">
          {/* Type selector */}
          <div className="flex gap-2">
            {(['dm', 'task', 'broadcast'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setMessageType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  messageType === type
                    ? 'bg-gold text-surface'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Recipient selector */}
          <select
            value={selectedRecipient}
            onChange={(e) => setSelectedRecipient(e.target.value as AgentId)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm"
            disabled={messageType === 'broadcast'}
          >
            {agents.filter(a => a !== 'mavis').map((agent) => (
              <option key={agent} value={agent}>{agent.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Message input */}
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type your message..."
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm resize-none h-24"
        />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
            <span>📎</span>
            <span>Attach File</span>
          </button>
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-gold text-surface rounded-lg text-sm font-medium hover:bg-gold-light transition-all"
          >
            Send
          </button>
        </div>
      </div>

      {/* Message History */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-gray-400">Message History</h3>
        {mockMessages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                msg.type === 'broadcast' ? 'bg-cyan/20 text-cyan' :
                msg.type === 'task' ? 'bg-gold/20 text-gold' :
                'bg-white/10'
              }`}>
                {msg.type.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-sm font-mono">
                <span className="text-gold">{msg.from.toUpperCase()}</span>
                <span className="text-gray-500"> → </span>
                <span className={msg.to === 'broadcast' ? 'text-cyan' : 'text-gray-300'}>
                  {msg.to === 'broadcast' ? 'ALL' : msg.to.toUpperCase()}
                </span>
              </span>
            </div>
            {msg.payload.title && (
              <h4 className="font-medium text-sm mb-1">{msg.payload.title}</h4>
            )}
            <p className="text-sm text-gray-300">{msg.payload.content}</p>
            {msg.payload.attachments && msg.payload.attachments.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                {msg.payload.attachments.map((att) => (
                  <span key={att.id} className="text-xs bg-white/10 px-2 py-1 rounded flex items-center gap-1">
                    <span>📎</span>
                    <span>{att.name}</span>
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}