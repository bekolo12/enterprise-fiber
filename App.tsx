import React, { useMemo, useState } from 'react';
import { MONTHS, getDataForMonth } from './constants';
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
  Clock,
  ChevronDown
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("October 2025");
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  // Fetch data based on selected month
  const processedData = useMemo(() => getDataForMonth(selectedMonth), [selectedMonth]);

  // Calculate Summary Metrics dynamically based on the processed data
  const summaryMetrics = useMemo(() => {
    // SLA Analysis module contains the "Overall" stats in the data structure
    const slaAnalysis = processedData.find(d => d.name === "SLA Analysis");
    
    // Total tickets is roughly the max of individual modules (as per raw data structure where 382 is repeated)
    const totalTickets = Math.max(...processedData.map(d => d.tickets));

    // Calculate Average Resolution Time from modules that have actual resolution times (excluding SLA analysis which holds breach time)
    const timeModules = processedData.filter(d => 
      d.resolutionTime > 0 && 
      d.name !== "SLA Analysis" && 
      d.name !== "Status Analysis"
    );
    
    const avgResolution = timeModules.length > 0 
      ? timeModules.reduce((acc, curr) => acc + curr.resolutionTime, 0) / timeModules.length 
      : 0;

    return {
      totalTickets,
      avgResolution: Math.round(avgResolution),
      overallSla: slaAnalysis ? slaAnalysis.sla : 0,
      // In processed data, the SLA Analysis 'resolutionTime' field maps to 'Average Breach Time' from raw data
      avgBreach: slaAnalysis ? Math.round(slaAnalysis.resolutionTime) : 0
    };
  }, [processedData]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-white max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between z-20 relative">
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
          
          {/* Month Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsMonthOpen(!isMonthOpen)}
              className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-gray-200 border border-white/20 shadow-lg flex items-center hover:bg-white/20 transition-colors w-48 justify-between"
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-purple-300" />
                {selectedMonth}
              </div>
              <ChevronDown className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${isMonthOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isMonthOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#1e1b4b]/95 border border-white/20 rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-xl">
                <div className="max-h-64 overflow-y-auto custom-scrollbar p-1">
                  {MONTHS.map(month => (
                    <button
                      key={month}
                      onClick={() => {
                        setSelectedMonth(month);
                        setIsMonthOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
                        selectedMonth === month 
                          ? 'bg-cyan-500/20 text-cyan-400 font-medium' 
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total Tickets"
          value={summaryMetrics.totalTickets}
          statusText="Active"
          statusIcon={<ArrowUp size={14} />}
          statusColorClass="text-green-400"
          icon={<Ticket size={24} />}
          iconBgClass="bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/20 shadow-lg"
        />
        <MetricCard 
          title="Avg Resolution Time"
          value={summaryMetrics.avgResolution}
          unit="min"
          statusText="Average"
          statusIcon={<Clock size={14} />}
          statusColorClass="text-yellow-400"
          icon={<Hourglass size={24} />}
          iconBgClass="bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/20 shadow-lg"
        />
        <MetricCard 
          title="Overall SLA Compliance"
          value={summaryMetrics.overallSla.toFixed(2)}
          unit="%"
          statusText={summaryMetrics.overallSla >= 99 ? "Excellent" : "Good"}
          statusIcon={<ShieldCheck size={14} />}
          statusColorClass={summaryMetrics.overallSla >= 99 ? "text-green-400" : "text-yellow-400"}
          icon={<ShieldCheck size={24} />}
          iconBgClass="bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/20 shadow-lg"
        />
        <MetricCard 
          title="Avg Breach Time"
          value={summaryMetrics.avgBreach}
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