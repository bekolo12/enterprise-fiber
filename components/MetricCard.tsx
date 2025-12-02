import React, { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  statusText: string;
  statusIcon: ReactNode;
  statusColorClass: string;
  icon: ReactNode;
  iconBgClass: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  statusText,
  statusIcon,
  statusColorClass,
  icon,
  iconBgClass
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <h2 className="text-3xl font-bold mt-2 text-white">
            {value}
            {unit && <span className="text-lg ml-1 text-gray-300">{unit}</span>}
          </h2>
          <p className={`text-sm mt-2 flex items-center ${statusColorClass}`}>
            {statusIcon}
            <span className="ml-1">{statusText}</span>
          </p>
        </div>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${iconBgClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};
