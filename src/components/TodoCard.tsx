import React from 'react';
import Link from 'next/link';
import { TodoItem } from '@/types/todo';

interface TodoCardProps {
  todo: TodoItem;
  onToggleComplete: (id: number, currentStatus: boolean) => void;
}

export default function TodoCard({ todo, onToggleComplete }: TodoCardProps) {
  return (
    <div className={`flex items-center p-3 mb-4 border-2 rounded-full border-black ${
      todo.isCompleted 
        ? 'bg-[#EDE9FE]' // violet-100
        : 'bg-white'
    }`}>
      {/* 체크박스 (토글 버튼) */}
      <button 
        onClick={() => onToggleComplete(todo.id, todo.isCompleted)}
        className={`w-8 h-8 flex-shrink-0 rounded-full border-2 border-black flex items-center justify-center mr-4 transition-colors ${
          todo.isCompleted 
            ? 'bg-[#7C3AED] text-white' 
            : 'bg-[#FEFCE8]'
        }`}
        aria-label={todo.isCompleted ? "완료 취소" : "할 일 완료"}
      >
        {todo.isCompleted && (
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L5.5 10.5L14.5 1.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* 할 일 제목 (클릭 시 상세 페이지로 이동) */}
      <Link 
        href={`/items/${todo.id}`} 
        className={`flex-grow text-lg font-bold truncate ${
          todo.isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'
        }`}
      >
        {todo.name}
      </Link>
    </div>
  );
}
