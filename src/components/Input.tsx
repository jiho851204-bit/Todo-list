import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onEnter?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', onKeyDown, onEnter, ...props }, ref) => {
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onEnter) {
        // 엔터키를 눌렀을 때 폼 서브밋 막기 (옵션) 및 onEnter 콜백 실행
        e.preventDefault();
        onEnter();
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <input
        ref={ref}
        onKeyDown={handleKeyDown}
        className={`w-full px-4 py-3 rounded-full border-2 border-black bg-slate-100 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white shadow-[4px_4px_0_#000000] transition-colors ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
