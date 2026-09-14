import React from 'react';
import { useAppStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Briefcase, FileText, Send, Calendar } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { jobs } = useAppStore();

  const stats = [
    { label: 'Scouted Jobs', value: jobs.length, icon: Briefcase, color: 'bg-blue-500' },
    { label: 'Resumes Generated', value: jobs.filter(j => ['writing', 'applied', 'interviewing'].includes(j.status)).length, icon: FileText, color: 'bg-purple-500' },
    { label: 'Applications Sent', value: jobs.filter(j => ['applied', 'interviewing'].includes(j.status)).length, icon: Send, color: 'bg-green-500' },
    { label: 'Interviews', value: jobs.filter(j => j.status === 'interviewing').length, icon: Calendar, color: 'bg-orange-500' },
  ];

  const pipelineData = [
    { name: 'Scouted', count: jobs.filter(j => j.status === 'discovered').length },
    { name: 'Evaluating', count: jobs.filter(j => j.status === 'evaluating').length },
    { name: 'Writing', count: jobs.filter(j => j.status === 'writing').length },
    { name: 'Applied', count: jobs.filter(j => j.status === 'applied').length },
    { name: 'Interviewing', count: jobs.filter(j => j.status === 'interviewing').length },
  ];

  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pipeline Overview</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Monitor your multi-agent job application pipeline.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">Funnel Analysis</h3>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 14, fontWeight: 500 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1f2937', color: '#fff' }} 
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={36}>
                {pipelineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
