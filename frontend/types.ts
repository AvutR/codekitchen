export type JobStatus = 'discovered' | 'evaluating' | 'writing' | 'ready' | 'applied' | 'interviewing' | 'rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  url: string;
  status: JobStatus;
  fitScore: number;
  notes?: string;
  dateAdded: string;
}

export interface AdkConfig {
  projectId: string;
  locationId: string;
  agentId: string;
  accessToken: string;
}
