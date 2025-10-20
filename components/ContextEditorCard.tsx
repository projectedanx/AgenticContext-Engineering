import React from 'react';

interface ContextEditorCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  statusIndicator?: React.ReactNode;
}

export const ContextEditorCard: React.FC<ContextEditorCardProps> = ({ title, icon, children, statusIndicator }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="text-violet-400">{icon}</div>
          <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
        </div>
        {statusIndicator}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};