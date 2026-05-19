'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for heavy components
const OfficeFloor = dynamic(() => import('@/components/office/OfficeFloor'), {
  ssr: false,
  loading: () => <OfficeLoading />,
});

const Dashboard = dynamic(() => import('@/components/dashboard/Dashboard'), {
  ssr: false,
  loading: () => <OfficeLoading />,
});

const Bridge = dynamic(() => import('@/components/bridge/Bridge'), {
  ssr: false,
  loading: () => <OfficeLoading />,
});

function OfficeLoading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gold font-medium">Loading Office...</p>
      </div>
    </div>
  );
}

type Tab = 'office' | 'dashboard' | 'bridge';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('office');

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'office', label: 'Office', icon: '🏢' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'bridge', label: 'Bridge', icon: '💬' },
  ];

  return (
    <main className="min-h-screen bg-surface">
      {/* Header */}
      <header className="glass-panel m-4 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
            <span className="text-xl">🔱</span>
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gradient-gold">
              4neverCompany OS
            </h1>
            <p className="text-sm text-gray-400">The Dynamic Office Hive</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gold text-surface'
                  : 'glass-card hover:bg-gold/10 text-gray-300 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <div className="p-4">
        {activeTab === 'office' && <OfficeFloor />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'bridge' && <Bridge />}
      </div>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 glass-panel m-4 p-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-400">System Online</span>
          </div>
          <div className="text-gray-500">|</div>
          <span className="text-gray-400">BMAD v1.0</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <span>🔱 Master4never</span>
          <span className="text-gold">HERMES • WINSTON • AMELIA • PM • DESIGN</span>
        </div>
      </footer>
    </main>
  );
}