import React from 'react';
import { useAppStore } from '../store';
import { JobStatus } from '../types';
import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, ExternalLink } from 'lucide-react';

const COLUMNS: { id: JobStatus; label: string }[] = [
  { id: 'discovered', label: 'Scouted' },
  { id: 'evaluating', label: 'Evaluating' },
  { id: 'writing', label: 'Writing Docs' },
  { id: 'applied', label: 'Applied' },
  { id: 'interviewing', label: 'Interviewing' },
];

export const Pipeline: React.FC = () => {
  const { jobs, updateJobStatus } = useAppStore();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Application Pipeline</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Track jobs as they move through the agent workflow.</p>
      </div>
      
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 snap-x">
        {COLUMNS.map(col => (
          <div key={col.id} className="flex-1 min-w-[300px] max-w-[350px] bg-gray-100/50 dark:bg-gray-900/50 rounded-2xl p-4 flex flex-col snap-center border border-gray-200/50 dark:border-gray-800/50">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">{col.label}</h3>
              <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold py-1 px-2.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                {jobs.filter(j => j.status === col.id).length}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              {jobs.filter(j => j.status === col.id).map(job => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={job.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group"
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white leading-tight">{job.title}</h4>
                    {job.fitScore > 0 && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-md shrink-0 ${job.fitScore > 90 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {job.fitScore}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1.5">
                    <Briefcase size={12} /> {job.company}
                  </p>
                  <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                    <a href={job.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium flex items-center gap-1 transition-colors">
                      View Post <ExternalLink size={12} />
                    </a>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {COLUMNS.findIndex(c => c.id === col.id) < COLUMNS.length - 1 && (
                        <button
                          onClick={() => updateJobStatus(job.id, COLUMNS[COLUMNS.findIndex(c => c.id === col.id) + 1].id)}
                          className="p-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-600 dark:text-gray-300 transition-colors"
                          title="Move to next stage"
                        >
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
      `}} />
    </div>
  );
};
