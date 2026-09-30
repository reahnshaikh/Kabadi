import React from 'react';

interface BrutalistCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'acid' | 'orange' | 'blue';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  borderWidth?: 'thick' | 'regular';
  className?: string;
  headerTag?: string;
  headerBadge?: React.ReactNode;
}

export const BrutalistCard: React.FC<BrutalistCardProps> = ({
  children,
  variant = 'default',
  shadow = 'md',
  borderWidth = 'regular',
  className = '',
  headerTag,
  headerBadge
}) => {
  const variantStyles = {
    default: 'bg-[#FFFFFF] text-[#121316]',
    dark: 'bg-[#121316] text-[#F4F1EA]',
    acid: 'bg-[#CCFF00] text-[#121316]',
    orange: 'bg-[#FF5500] text-white',
    blue: 'bg-[#0044FF] text-white'
  };

  const shadowStyles = {
    none: '',
    sm: 'shadow-[2px_2px_0px_#121316]',
    md: 'shadow-[4px_4px_0px_#121316]',
    lg: 'shadow-[7px_7px_0px_#121316]'
  };

  const borderStyles = borderWidth === 'thick' ? 'border-4 border-[#121316]' : 'border-3 border-[#121316]';

  return (
    <div className={`relative ${borderStyles} ${shadowStyles[shadow]} ${variantStyles[variant]} ${className}`}>
      {(headerTag || headerBadge) && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b-3 border-[#121316] bg-[#121316] text-[#CCFF00] font-mono-industrial text-xs tracking-wider uppercase font-bold">
          <span className="truncate">{headerTag}</span>
          {headerBadge && <div className="shrink-0">{headerBadge}</div>}
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
};
