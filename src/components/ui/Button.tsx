import React from 'react';

export const Button: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = '', children, ...props }) => (
    <button
        {...props}
        className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition
        ${className}`}>
        {children}
    </button>
);
