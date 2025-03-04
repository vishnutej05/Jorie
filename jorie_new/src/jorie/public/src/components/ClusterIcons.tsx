import React from "react";

interface IconProps {
  className?: string;
}

export const KidneyIcon: React.FC<IconProps> = ({ className = "w-16 h-16 text-yellow-500" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="25" fill="currentColor" fillOpacity="0.8" />
    <path d="M50 25 C60 35, 75 35, 75 50 C75 65, 60 75, 50 75 C40 75, 25 65, 25 50 C25 35, 40 35, 50 25" 
      stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M40 40 L60 60 M60 40 L40 60" stroke="#fff" strokeWidth="3" />
  </svg>
);

export const ObesityIcon: React.FC<IconProps> = ({ className = "w-16 h-16 text-gray-700" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="40" r="15" fill="currentColor" />
    <path d="M30 55 C30 70, 70 70, 70 55 L70 40 C70 25, 30 25, 30 40 Z" fill="currentColor" />
    <path d="M35 65 L30 85 M65 65 L70 85" stroke="currentColor" strokeWidth="4" />
  </svg>
);