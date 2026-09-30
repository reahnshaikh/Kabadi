import React from 'react';
import { sounds } from '../../utils/audio';

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sounds.playClick();
    if (onClick) onClick(e);
  };

  const variantStyles = {
    primary: 'bg-[#CCFF00] text-[#121316] hover:bg-[#b8e600]',
    secondary: 'bg-[#F4F1EA] text-[#121316] hover:bg-[#e4e0d5]',
    accent: 'bg-[#0044FF] text-white hover:bg-[#0033cc]',
    danger: 'bg-[#EE1111] text-white hover:bg-[#cc0f0f]',
    warning: 'bg-[#FF5500] text-white hover:bg-[#e04b00]',
    dark: 'bg-[#121316] text-[#F4F1EA] hover:bg-[#22242a]'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-bold tracking-tight',
    md: 'px-4 py-2.5 text-sm font-extrabold tracking-tight',
    lg: 'px-6 py-3.5 text-base font-black tracking-tight',
    xl: 'px-8 py-5 text-xl font-black tracking-tight'
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center gap-2.5
        border-3 border-[#121316] font-mono-industrial uppercase
        transition-all duration-100 ease-out select-none
        shadow-[4px_4px_0px_#121316] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
        hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_#121316]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[2px_2px_0px_#121316]
        whitespace-nowrap min-h-[44px]
        ${fullWidth ? 'w-full' : ''}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
};
