import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'outlined' | 'secondary';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  let variantStyles = '';
  
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-violet-600 text-white shadow-[4px_4px_0_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none';
      break;
    case 'danger':
      variantStyles = 'bg-rose-500 text-white shadow-[4px_4px_0_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none';
      break;
    case 'outlined':
      variantStyles = 'bg-white text-slate-900 shadow-[4px_4px_0_#0F172A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none';
      break;
    case 'secondary':
      variantStyles = 'bg-[#E2E8F0] text-slate-900 shadow-[4px_4px_0_#0F172A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none';
      break;
  }

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`font-bold py-3 px-6 rounded-full border-2 border-black transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
