import React, { useMemo } from 'react';
import { RAW_DATA, processData } from './constants';
import { MetricCard } from './components/MetricCard';
import { ChartsSection } from './components/ChartsSection';
import { DashboardTable } from './components/DashboardTable';
import { Insights } from './components/Insights';
import { 
  BarChart2, 
  Calendar, 
  Ticket, 
  Hourglass, 
  ShieldCheck, 
  AlertTriangle,
  ArrowUp,
  Clock
} from 'lucide-react';

const App: React.FC = () => {
  const processedData = useMemo(() => processData(RAW_DATA), []);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Calculate Summary Metrics
  const totalTickets = 382; // From JSON
  const avgResolution = 153; // From HTML mock
  const overallSla = 99.21; // From JSON
  const avgBreach = 458; // From JSON

  return (
    <div className="min-h-screen p-4 md:p-8 text-white max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center">
            <BarChart2 className="mr-3 text-cyan-400" size={36} />
            Support Analytics Dashboard
          </h1>
          <p className="text-gray-400 mt-2 ml-1">Real-time performance metrics and analysis</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-200 font-medium">Live Data</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-gray-200 border border-white/20 shadow-lg flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-purple-300" />
            {today}
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total Tickets"
          value={totalTickets}
          statusText="Active"
          statusIcon={<ArrowUp size={14} />}
          statusColorClass="text-green-400"
          icon={<Ticket size={24} />}
          iconBgClass="bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/20 shadow-lg"
        />
        <MetricCard 
          title="Avg Resolution Time"
          value={avgResolution}
          unit="min"
          statusText="Average"
          statusIcon={<Clock size={14} />}
          statusColorClass="text-yellow-400"
          icon={<Hourglass size={24} />}
          iconBgClass="bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/20 shadow-lg"
        />
        <MetricCard 
          title="Overall SLA Compliance"
          value={overallSla}
          unit="%"
          statusText="Excellent"
          statusIcon={<ShieldCheck size={14} />}
          statusColorClass="text-green-400"
          icon={<ShieldCheck size={24} />}
          iconBgClass="bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/20 shadow-lg"
        />
        <MetricCard 
          title="Avg Breach Time"
          value={avgBreach}
          unit="min"
          statusText="Monitor"
          statusIcon={<AlertTriangle size={14} />}
          statusColorClass="text-red-400"
          icon={<Clock size={24} />}
          iconBgClass="bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/20 shadow-lg"
        />
      </div>

      {/* Charts Section */}
      <ChartsSection data={processedData} />

      {/* Data Table */}
      <DashboardTable data={processedData} />

      {/* Insights */}
      <Insights data={processedData} />

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Dashboard generated from support ticket data analysis</p>
      </footer>
    </div>
  );
};

export default App;
