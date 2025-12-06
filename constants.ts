import { AppData, ProcessedModuleData } from './types';

export const RAW_DATA: AppData = {
  "modules": [
      {
          "module": "Agent Performance",
          "Total Tickets": 381,
          "Average Resolution Time": "146.08 minutes",
          "SLA Compliance Rate": "99.40%"
      },
      {
          "module": "Team Leader Summary",
          "Total Tickets": 382,
          "Average Resolution Time": "139.05 minutes",
          "SLA Compliance Rate": "99.55%"
      },
      {
          "module": "Issue Type Breakdown",
          "Total Tickets": 382,
          "Average Resolution Time": "141.24 minutes",
          "SLA Compliance Rate": "99.85%"
      },
      {
          "module": "SLA Analysis",
          "Overall SLA Compliance": "99.21%",
          "Average Breach Time": "458.67 minutes"
      },
      {
          "module": "Requester Part Analysis",
          "Total Tickets": 382,
          "Average Resolution Time": "141.24 minutes",
          "SLA Compliance Rate": "99.85%"
      },
      {
          "module": "Shift Analysis",
          "Total Tickets": 382,
          "Average Resolution Time": "198.32 minutes",
          "SLA Compliance Rate": "93.87%"
      },
      {
          "module": "Status Analysis",
          "Total Tickets": 382
      }
  ]
};

export const MONTHS = [
  "January 2025", "February 2025", "March 2025", "April 2025",
  "May 2025", "June 2025", "July 2025", "August 2025",
  "September 2025", "October 2025", "November 2025"
];

// Helper functions to parse the raw string data
export const parseTime = (str?: string): number => parseFloat(str?.replace(' minutes', '') || '0');
export const parsePercent = (str?: string): number => parseFloat(str?.replace('%', '') || '0');

export const processData = (data: AppData): ProcessedModuleData[] => {
  return data.modules.map(m => {
    const sla = parsePercent(m["SLA Compliance Rate"] || m["Overall SLA Compliance"]);
    let status: ProcessedModuleData['status'] = 'N/A';
    let statusColor = 'text-gray-400';

    if (sla >= 99) {
      status = 'Excellent';
      statusColor = 'text-green-400';
    } else if (sla >= 95) {
      status = 'Good';
      statusColor = 'text-yellow-400';
    } else if (sla > 0) {
      status = 'Needs Work';
      statusColor = 'text-red-400';
    }

    return {
      name: m.module,
      tickets: m["Total Tickets"] || 0,
      resolutionTime: parseTime(m["Average Resolution Time"] || m["Average Breach Time"]),
      sla: sla,
      status,
      statusColor
    };
  });
};

export const getDataForMonth = (month: string): ProcessedModuleData[] => {
  const baseData = processData(RAW_DATA);
  
  // Return exact original data for the specified current month
  if (month === "October 2025") {
    return baseData;
  }

  const monthIndex = MONTHS.indexOf(month);
  
  // Generate deterministic mock variations for other months
  return baseData.map(item => {
    // Create a seed based on month index and item name to ensure consistent random-like values
    const seed = monthIndex + item.name.length + item.name.charCodeAt(0);
    const variationFactor = Math.sin(seed); // Value between -1 and 1

    // Vary tickets by +/- 20%
    const newTickets = Math.max(10, Math.round(item.tickets * (1 + variationFactor * 0.2)));

    // Vary resolution/breach time by +/- 15%
    // Inverse correlation: usually more tickets might mean slower time, but let's just randomize for demo
    const newResTime = Math.max(0, item.resolutionTime * (1 + Math.cos(seed) * 0.15));

    // Vary SLA slightly (+/- 2%), keeping it within realistic bounds (80-100)
    let newSla = item.sla + (variationFactor * 2);
    newSla = Math.min(100, Math.max(85, newSla));

    // Re-evaluate status based on new SLA
    let status: ProcessedModuleData['status'] = 'N/A';
    let statusColor = 'text-gray-400';

    if (newSla >= 99) {
      status = 'Excellent';
      statusColor = 'text-green-400';
    } else if (newSla >= 95) {
      status = 'Good';
      statusColor = 'text-yellow-400';
    } else if (newSla > 0) {
      status = 'Needs Work';
      statusColor = 'text-red-400';
    }

    return {
      ...item,
      tickets: newTickets,
      resolutionTime: newResTime,
      sla: parseFloat(newSla.toFixed(2)),
      status,
      statusColor
    };
  });
};

export const COLORS = [
  '#06b6d4', // Cyan
  '#8b5cf6', // Purple
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#ec4899'  // Pink
];