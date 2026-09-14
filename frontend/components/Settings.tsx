import React from 'react';
import { useAppStore } from '../store';
import { Save, Server } from 'lucide-react';

export const Settings: React.FC = () => {
  const { config, setConfig } = useAppStore();
  const [localConfig, setLocalConfig] = React.useState(config);
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setConfig(localConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Agent Configuration</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Configure your Vertex AI Agent Engine connection details for the Orchestrator.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
            <Server className="text-purple-600 dark:text-purple-400" size={20} />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-white">ADK Connection</h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">GCP Project ID</label>
            <input
              type="text"
              value={localConfig.projectId}
              onChange={e => setLocalConfig({...localConfig, projectId: e.target.value})}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-shadow"
              placeholder="e.g., my-gcp-project-123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location ID</label>
            <input
              type="text"
              value={localConfig.locationId}
              onChange={e => setLocalConfig({...localConfig, locationId: e.target.value})}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-shadow"
              placeholder="e.g., us-central1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Agent ID (Reasoning Engine)</label>
            <input
              type="text"
              value={localConfig.agentId}
              onChange={e => setLocalConfig({...localConfig, agentId: e.target.value})}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-shadow"
              placeholder="e.g., 1234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Access Token (Optional)</label>
            <input
              type="password"
              value={localConfig.accessToken}
              onChange={e => setLocalConfig({...localConfig, accessToken: e.target.value})}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-shadow"
              placeholder="ya29.a0AfB_..."
            />
            <p className="text-xs text-gray-500 mt-2">If your endpoint requires authentication, provide a valid bearer token.</p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Save size={18} />
            {saved ? 'Saved Successfully!' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
};
