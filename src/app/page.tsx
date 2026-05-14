"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { todoApi } from "@/lib/api";
import { TodoItem } from "@/types/todo";
import Input from "@/components/Input";
import Button from "@/components/Button";
import TodoCard from "@/components/TodoCard";

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [loading, setLoading] = useState(true);

  // 초기 데이터 불러오기
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 할 일 추가
  const handleAddTodo = async () => {
    if (!newTaskName.trim()) return;
    try {
      await todoApi.createTodo({ name: newTaskName });
      setNewTaskName(""); // 입력창 초기화
      fetchTodos(); // 목록 새로고침
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  // 할 일 상태 토글 (진행중 <-> 완료)
  const handleToggleComplete = async (id: number, currentStatus: boolean) => {
    try {
      // 낙관적 업데이트 (선택 사항이지만 체감 속도 향상을 위해 적용)
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isCompleted: !currentStatus } : t))
      );
      await todoApi.updateTodo(id, { isCompleted: !currentStatus });
      // 실제 데이터 동기화를 위해 다시 불러오기 (혹은 생략 가능)
    } catch (error) {
      console.error("Failed to toggle todo status", error);
      fetchTodos(); // 실패 시 롤백
    }
  };

  const todoList = todos.filter((t) => !t.isCompleted);
  const doneList = todos.filter((t) => t.isCompleted);

  return (
    <div className="flex flex-col w-full h-full max-w-[1200px] mx-auto">
      {/* 할 일 추가 영역 */}
      <div className="flex gap-4 mb-10 w-full">
        <div className="flex-grow">
          <Input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onEnter={handleAddTodo}
            placeholder="할 일을 입력해주세요"
          />
        </div>

        {/* 모바일 추가 버튼 (원형 아이콘) */}
        <button
          onClick={handleAddTodo}
          className="block tablet:hidden flex-shrink-0 active:scale-95 transition-transform"
        >
          <Image
            src={(todos.length === 0 && newTaskName.length === 0) ? "/images/buttons/Type=Add, Size=Small, State=Active.png" : "/images/buttons/Type=Add, Size=Small, State=Default.png"}
            alt="Add"
            width={56}
            height={56}
            className="w-14 h-14"
          />
        </button>

        {/* 태블릿/PC 추가 버튼 (텍스트 버튼) */}
        <button
          onClick={handleAddTodo}
          className="hidden tablet:block flex-shrink-0 active:scale-95 transition-transform"
        >
          <Image
            src={(todos.length === 0 && newTaskName.length === 0) ? "/images/buttons/Type=Add, Size=Large, State=Active.png" : "/images/buttons/Type=Add, Size=Large, State=Default.png"}
            alt="추가하기"
            width={168}
            height={56}
            className="h-14 w-auto"
          />
        </button>
      </div>

      {/* 리스트 영역 */}
      <div className="flex flex-col pc:flex-row gap-6">
        {/* TO DO 섹션 */}
        <section className="flex-1">
          <div className="mb-4">
            <span className="inline-block bg-lime-400 text-green-800 font-bold px-4 py-1 rounded-full text-base">TO DO</span>
          </div>
          
          {loading ? (
            <p className="text-slate-500 mt-10 text-center">불러오는 중...</p>
          ) : todoList.length > 0 ? (
            <div className="flex flex-col gap-1">
              {todoList.map((todo) => (
                <TodoCard key={todo.id} todo={todo} onToggleComplete={handleToggleComplete} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative w-60 h-60 mb-6">
                <Image src="/images/illustrations/todo-empty.png" alt="Empty Todo" fill className="object-contain" />
              </div>
              <p className="text-slate-400 font-normal text-base">할 일이 없어요.</p>
              <p className="text-slate-400 font-normal text-base">TODO를 새롭게 추가해주세요!</p>
            </div>
          )}
        </section>

        {/* DONE 섹션 */}
        <section className="flex-1">
          <div className="mb-4">
            <span className="inline-block bg-green-800 text-lime-400 font-bold px-4 py-1 rounded-full text-base">DONE</span>
          </div>

          {loading ? (
            <p className="text-slate-500 mt-10 text-center">불러오는 중...</p>
          ) : doneList.length > 0 ? (
            <div className="flex flex-col gap-1">
              {doneList.map((todo) => (
                <TodoCard key={todo.id} todo={todo} onToggleComplete={handleToggleComplete} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative w-60 h-60 mb-6">
                <Image src="/images/illustrations/done-empty.png" alt="Empty Done" fill className="object-contain" />
              </div>
              <p className="text-slate-400 font-normal text-base">아직 다 한 일이 없어요.</p>
              <p className="text-slate-400 font-normal text-base">해야 할 일을 체크해보세요!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
