import React from 'react';
import { Trophy, AlertCircle, Lightbulb } from 'lucide-react';
import { ProcessedModuleData } from '../types';

interface InsightsProps {
  data: ProcessedModuleData[];
}

export const Insights: React.FC<InsightsProps> = ({ data }) => {
  // Logic to find insights dynamically
  const slaModules = data.filter(d => d.sla > 0 && d.name !== 'SLA Analysis');
  const bestPerformer = slaModules.reduce((prev, current) => (prev.sla > current.sla) ? prev : current, slaModules[0]);
  const worstPerformer = slaModules.reduce((prev, current) => (prev.sla < current.sla) ? prev : current, slaModules[0]);
  
  const timeModules = data.filter(d => d.resolutionTime > 0 && d.name !== 'SLA Analysis');
  const fastest = timeModules.reduce((prev, current) => (prev.resolutionTime < current.resolutionTime) ? prev : current, timeModules[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Best Performer */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 text-green-400">
            <Trophy size={20} />
          </div>
          <h4 className="font-semibold text-white">Best Performer</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="font-semibold text-white">{bestPerformer?.name}</span> has the highest SLA compliance at <span className="text-green-400 font-bold">{bestPerformer?.sla}%</span>.
        </p>
      </div>

      {/* Needs Attention */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-3 text-yellow-400">
            <AlertCircle size={20} />
          </div>
          <h4 className="font-semibold text-white">Needs Attention</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="font-semibold text-white">{worstPerformer?.name}</span> has the lowest SLA compliance at <span className="text-yellow-400 font-bold">{worstPerformer?.sla}%</span>.
        </p>
      </div>

      {/* Fastest Resolution */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 text-blue-400">
            <Lightbulb size={20} />
          </div>
          <h4 className="font-semibold text-white">Fastest Resolution</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="font-semibold text-white">{fastest?.name}</span> resolves tickets fastest at <span className="text-blue-400 font-bold">{fastest?.resolutionTime.toFixed(2)} min</span>.
        </p>
      </div>
    </div>
  );
};