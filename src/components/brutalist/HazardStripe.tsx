import React from 'react';

interface HazardStripeProps {
  color?: 'green' | 'orange' | 'black';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const HazardStripe: React.FC<HazardStripeProps> = ({
  color = 'green',
  height = 'sm',
  className = ''
}) => {
  const heightStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  const patternStyles = {
    green: 'bg-hazard-stripes',
    orange: 'bg-hazard-stripes-orange',
    black: 'bg-hazard-stripes-subtle'
  };

  return (
    <div
      className={`w-full border-y-2 border-[#121316] ${heightStyles[height]} ${patternStyles[color]} ${className}`}
      aria-hidden="true"
    />
  );
};
