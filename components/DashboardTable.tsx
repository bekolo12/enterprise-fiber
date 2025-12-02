import React from 'react';
import { ProcessedModuleData } from '../types';
import { Table, Clock, Activity, CheckCircle } from 'lucide-react';

interface DashboardTableProps {
  data: ProcessedModuleData[];
}

export const DashboardTable: React.FC<DashboardTableProps> = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
      <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
        <Table className="w-5 h-5 mr-2 text-yellow-400" />
        Module Performance Details
      </h3>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-600/50">
              <th className="py-4 px-4 text-gray-400 font-medium text-sm uppercase tracking-wider">Module</th>
              <th className="py-4 px-4 text-center text-gray-400 font-medium text-sm uppercase tracking-wider">
                <div className="flex items-center justify-center gap-2">
                  <Activity size={16} /> Tickets
                </div>
              </th>
              <th className="py-4 px-4 text-center text-gray-400 font-medium text-sm uppercase tracking-wider">
                <div className="flex items-center justify-center gap-2">
                  <Clock size={16} /> Avg Time (min)
                </div>
              </th>
              <th className="py-4 px-4 text-center text-gray-400 font-medium text-sm uppercase tracking-wider">
                 <div className="flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> SLA %
                </div>
              </th>
              <th className="py-4 px-4 text-center text-gray-400 font-medium text-sm uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-700/30 hover:bg-white/5 transition-colors duration-200">
                <td className="py-4 px-4 font-medium text-white">{row.name}</td>
                <td className="py-4 px-4 text-center">{row.tickets || '-'}</td>
                <td className="py-4 px-4 text-center">{row.resolutionTime > 0 ? row.resolutionTime.toFixed(2) : '-'}</td>
                <td className="py-4 px-4 text-center">{row.sla > 0 ? `${row.sla}%` : '-'}</td>
                <td className="py-4 px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-opacity-20 ${row.statusColor.replace('text-', 'bg-')} ${row.statusColor}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};