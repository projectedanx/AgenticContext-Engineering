
import React from 'react';
import { BrainCircuitIcon } from './IconComponents';

/**
 * The header component for the application.
 * @returns {React.ReactElement} The rendered header component.
 */
export const Header: React.FC = () => {
    return (
        <header className="p-4 md:p-6 border-b border-gray-700 flex items-center gap-4">
            <BrainCircuitIcon className="w-8 h-8 text-violet-400" />
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Agentic Context Engineering Workbench</h1>
                <p className="text-sm text-gray-400">A foundation for building deterministic AI coding agents.</p>
            </div>
        </header>
    );
};
