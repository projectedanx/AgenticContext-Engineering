import React from 'react';

/**
 * Props for the ContextEditorCard component.
 * @property title - The title of the card.
 * @property icon - The icon to display next to the title.
 * @property children - The content of the card.
 * @property statusIndicator - An optional status indicator to display in the header.
 */
interface ContextEditorCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  statusIndicator?: React.ReactNode;
}

/**
 * A reusable card component for displaying context editors.
 * @param {ContextEditorCardProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered card component.
 */
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