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

export const COLORS = [
  '#06b6d4', // Cyan
  '#8b5cf6', // Purple
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#ec4899'  // Pink
];
