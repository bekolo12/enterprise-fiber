export interface RawModuleData {
  module: string;
  "Total Tickets"?: number;
  "Average Resolution Time"?: string;
  "SLA Compliance Rate"?: string;
  "Overall SLA Compliance"?: string;
  "Average Breach Time"?: string;
}

export interface AppData {
  modules: RawModuleData[];
}

export interface ProcessedModuleData {
  name: string;
  tickets: number;
  resolutionTime: number; // in minutes
  sla: number; // percentage
  status: 'Excellent' | 'Good' | 'Needs Work' | 'N/A';
  statusColor: string;
}
