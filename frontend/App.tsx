import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Pipeline } from './components/Pipeline';
import { AgentChat } from './components/AgentChat';
import { Settings } from './components/Settings';
import { useAppStore } from './store';

export default function App() {
  const { activeTab } = useAppStore();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'pipeline' && <Pipeline />}
          {activeTab === 'chat' && <AgentChat />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}
