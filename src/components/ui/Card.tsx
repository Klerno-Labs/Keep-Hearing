import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className = '', hover = false, glow = false }: CardProps) {
  return (
    <div
      className={`
        relative rounded-2xl bg-white/95 backdrop-blur-sm
        border border-gray-100
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        transition-all duration-300
        ${hover ? 'hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-1' : ''}
        ${glow ? 'before:absolute before:inset-0 before:rounded-2xl before:bg-blue-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
