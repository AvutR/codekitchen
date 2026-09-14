import { create } from 'zustand';
import { Job, AdkConfig, JobStatus } from './types';

interface AppState {
  jobs: Job[];
  config: AdkConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addJob: (job: Job) => void;
  updateJobStatus: (id: string, status: JobStatus) => void;
  setConfig: (config: AdkConfig) => void;
}

const initialJobs: Job[] = [
  { id: '1', title: 'Senior Frontend Engineer', company: 'Google', url: 'https://careers.google.com', status: 'interviewing', fitScore: 95, dateAdded: new Date().toISOString() },
  { id: '2', title: 'React Developer', company: 'Stripe', url: 'https://stripe.com/jobs', status: 'applied', fitScore: 88, dateAdded: new Date().toISOString() },
  { id: '3', title: 'Fullstack Engineer', company: 'Vercel', url: 'https://vercel.com/careers', status: 'writing', fitScore: 92, dateAdded: new Date().toISOString() },
  { id: '4', title: 'UI Engineer', company: 'Figma', url: 'https://figma.com/careers', status: 'evaluating', fitScore: 0, dateAdded: new Date().toISOString() },
  { id: '5', title: 'Frontend Architect', company: 'Netflix', url: 'https://jobs.netflix.com', status: 'discovered', fitScore: 0, dateAdded: new Date().toISOString() },
];

const loadState = () => {
  try {
    const stored = localStorage.getItem('agent-job-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      return { jobs: parsed.jobs, config: parsed.config, activeTab: parsed.activeTab || 'dashboard' };
    }
  } catch (e) {
    console.warn('Failed to load state from local storage', e);
  }
  return null;
};

const savedState = loadState();

export const useAppStore = create<AppState>((set, get) => {
  const saveState = (state: Partial<AppState>) => {
    const current = get();
    const next = { ...current, ...state };
    localStorage.setItem('agent-job-storage', JSON.stringify({
      jobs: next.jobs,
      config: next.config,
      activeTab: next.activeTab
    }));
    return state;
  };

  return {
    jobs: savedState?.jobs || initialJobs,
    config: savedState?.config || { projectId: '', locationId: 'us-central1', agentId: '', accessToken: '' },
    activeTab: savedState?.activeTab || 'dashboard',
    setActiveTab: (tab) => set(saveState({ activeTab: tab })),
    addJob: (job) => set((state) => saveState({ jobs: [...state.jobs, job] })),
    updateJobStatus: (id, status) => set((state) => saveState({
      jobs: state.jobs.map(j => j.id === id ? { ...j, status } : j)
    })),
    setConfig: (config) => set(saveState({ config })),
  };
});
