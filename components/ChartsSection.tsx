import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { COLORS } from '../constants';
import { ProcessedModuleData } from '../types';

interface ChartsSectionProps {
  data: ProcessedModuleData[];
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e1b4b] border border-white/20 p-3 rounded-lg shadow-xl">
        <p className="text-white font-medium">{label}</p>
        <p className="text-cyan-400 text-sm">
          {payload[0].value} {unit}
        </p>
      </div>
    );
  }
  return null;
};

export const ChartsSection: React.FC<ChartsSectionProps> = ({ data }) => {
  const timeData = data.filter(d => d.resolutionTime > 0 && d.name !== 'SLA Analysis');
  const slaData = data.filter(d => d.sla > 0 && d.name !== 'SLA Analysis');
  const ticketData = data.filter(d => d.tickets > 0);
  
  // Prepare Gauge Data
  const slaAnalysis = data.find(d => d.name === 'SLA Analysis');
  const overallSla = slaAnalysis ? slaAnalysis.sla : 99;
  const gaugeData = [
    { name: 'Achieved', value: overallSla },
    { name: 'Lost', value: 100 - overallSla },
  ];

  return (
    <>
      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Resolution Time Bar Chart */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
            <span className="text-cyan-400 mr-2">⏱</span> Resolution Time by Module
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  tick={{ fill: '#9ca3af', fontSize: 10 }} 
                  tickFormatter={(val) => val.split(' ')[0]} 
                />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip unit="min" />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                <Bar dataKey="resolutionTime" fill="#06b6d4" radius={[4, 4, 0, 0]}>
                  {timeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SLA Compliance Donut */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
            <span className="text-purple-400 mr-2">📊</span> SLA Compliance by Module
          </h3>
          <div className="h-[300px] w-full relative">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="sla"
                >
                  {slaData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e1b4b', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}
                   itemStyle={{ color: '#fff' }}
                   formatter={(value: number) => [`${value}%`, 'Compliance']}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Tickets Distribution */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
            <span className="text-green-400 mr-2">🎫</span> Ticket Vol.
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="tickets"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                    return percent > 0.1 ? (
                      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10}>
                        {(percent * 100).toFixed(0)}%
                      </text>
                    ) : null;
                  }}
                >
                  {ticketData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e1b4b', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}
                   itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Radar */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
            <span className="text-orange-400 mr-2">🎯</span> Radar View
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={slaData.slice(0, 5)}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={(val) => val.split(' ')[0]} />
                <PolarRadiusAxis angle={30} domain={[90, 100]} tick={false} axisLine={false} />
                <Radar
                  name="SLA %"
                  dataKey="sla"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.4}
                />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e1b4b', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}
                   itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SLA Gauge */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center relative">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-white self-start w-full">
            <span className="text-pink-400 mr-2">⚡</span> SLA Overview
          </h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="70%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-4xl font-bold text-white">{overallSla}%</p>
              <p className="text-gray-400 text-sm mt-1">Overall SLA</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};