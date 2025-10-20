import React from 'react';

/**
 * Renders a brain circuit icon.
 * @param {object} props - The component props.
 * @param {string} [props.className='w-6 h-6'] - The CSS class name for the icon.
 * @returns {React.ReactElement} The rendered icon.
 */
export const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5a3 3 0 1 0-5.993.129M12 5a3 3 0 1 1 5.993.129M12 19a3 3 0 1 0-5.993-.129M12 19a3 3 0 1 1 5.993.129M5 12a3 3 0 1 0-3.129 5.993M5 12a3 3 0 1 1-3.129-5.993M19 12a3 3 0 1 0 3.129 5.993M19 12a3 3 0 1 1 3.129-5.993M12 5v14M5 12h14" />
  </svg>
);

/**
 * Renders a book icon.
 * @param {object} props - The component props.
 * @param {string} [props.className='w-6 h-6'] - The CSS class name for the icon.
 * @returns {React.ReactElement} The rendered icon.
 */
export const BookIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v2H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 17.5Z" />
  </svg>
);

/**
 * Renders a wrench icon.
 * @param {object} props - The component props.
 * @param {string} [props.className='w-6 h-6'] - The CSS class name for the icon.
 * @returns {React.ReactElement} The rendered icon.
 */
export const WrenchIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

/**
 * Renders a memory icon.
 * @param {object} props - The component props.
 * @param {string} [props.className='w-6 h-6'] - The CSS class name for the icon.
 * @returns {React.ReactElement} The rendered icon.
 */
export const MemoryIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M12 2v2" />
    <path d="M22 12h-2" />
    <path d="M12 22v-2" />
    <path d="M2 12h2" />
    <path d="m19.07 4.93-1.41 1.41" />
    <path d="m4.93 19.07 1.41-1.41" />
    <path d="m19.07 19.07-1.41-1.41" />
    <path d="m4.93 4.93 1.41 1.41" />
  </svg>
);

/**
 * Renders a server icon.
 * @param {object} props - The component props.
 * @param {string} [props.className='w-6 h-6'] - The CSS class name for the icon.
 * @returns {React.ReactElement} The rendered icon.
 */
export const ServerIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);

/**
 * Renders a wand icon.
 * @param {object} props - The component props.
 * @param {string} [props.className='w-6 h-6'] - The CSS class name for the icon.
 * @returns {React.ReactElement} The rendered icon.
 */
export const WandIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 4V2" />
    <path d="M15 16v-2" />
    <path d="M8 9h2" />
    <path d="M20 9h2" />
    <path d="M17.8 11.8 19 13" />
    <path d="M15 9h.01" />
    <path d="M17.8 6.2 19 5" />
    <path d="m3 21 9-9" />
    <path d="M12.2 6.2 11 5" />
  </svg>
);

/**
 * Renders a file text icon.
 * @param {object} props - The component props.
 * @param {string} [props.className='w-6 h-6'] - The CSS class name for the icon.
 * @returns {React.ReactElement} The rendered icon.
 */
export const FileTextIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
