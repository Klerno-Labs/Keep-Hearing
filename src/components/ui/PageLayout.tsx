import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
  centered?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  full: 'max-w-full',
};

export function PageLayout({
  children,
  title,
  subtitle,
  maxWidth = '2xl',
  centered = true,
}: PageLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-20 px-4">
      <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${centered ? 'flex flex-col items-center justify-center' : ''}`}>
        {title && (
          <div className="mb-12 text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--brand-primary)] animate-in fade-in slide-in-from-bottom-4 duration-700">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-gray-600 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {children}
        </div>
      </div>
    </div>
  );
}
