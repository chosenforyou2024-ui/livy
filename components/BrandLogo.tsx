import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const BrandLogo: React.FC<LogoProps> = ({ className = "w-10 h-10", variant = 'dark' }) => {
  const strokeColor = variant === 'light' ? '#FDFBF7' : '#A83232';
  const goldColor = '#D4AF37';

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="心想製所 Logo"
    >
      {/* 背景菱形 (斗方) */}
      <rect 
        x="50" 
        y="12" 
        width="54" 
        height="54" 
        rx="4" 
        transform="rotate(45 50 12)" 
        className={variant === 'light' ? 'fill-white/10' : 'fill-couplet-red/5'}
        stroke={strokeColor} 
        strokeWidth="2.5"
      />
      
      {/* 內部流動線條 (無限符號的抽象化) */}
      <path 
        d="M35 50 C 35 35, 65 35, 65 50 C 65 65, 35 65, 35 50" 
        stroke={strokeColor} 
        strokeWidth="3" 
        strokeLinecap="round"
        className="opacity-90"
      />
      
      {/* 星芒 (顯化/能量點) */}
      <path 
        d="M65 35 L 67 40 L 72 42 L 67 44 L 65 49 L 63 44 L 58 42 L 63 40 Z" 
        fill={goldColor}
        className="animate-pulse-slow"
      />
      
      {/* 裝飾點 */}
      <circle cx="35" cy="50" r="3" fill={strokeColor} />
    </svg>
  );
};

export default BrandLogo;