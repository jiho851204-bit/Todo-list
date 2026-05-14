import { TodoItem, CreateTodoDto, UpdateTodoDto } from '../types/todo';

const BASE_URL = 'https://assignment-todolist-api.vercel.app/api';
// TODO: 본인만의 고유한 tenantId로 변경해주세요.
const TENANT_ID = 'JHKim'; 

export const todoApi = {
  // 항목 목록 조회
  async getTodos(page: number = 1, pageSize: number = 10): Promise<TodoItem[]> {
    const res = await fetch(`${BASE_URL}/${TENANT_ID}/items?page=${page}&pageSize=${pageSize}`);
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
  },

  // 항목 상세 조회
  async getTodo(itemId: number): Promise<TodoItem> {
    const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`);
    if (!res.ok) throw new Error('Failed to fetch todo');
    return res.json();
  },

  // 항목 등록
  async createTodo(data: CreateTodoDto): Promise<TodoItem> {
    const res = await fetch(`${BASE_URL}/${TENANT_ID}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return res.json();
  },

  // 항목 수정
  async updateTodo(itemId: number, data: UpdateTodoDto): Promise<TodoItem> {
    const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return res.json();
  },

  // 항목 삭제
  async deleteTodo(itemId: number): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete todo');
    return res.json();
  },

  // 이미지 업로드 (CORS 우회를 위해 Next.js API Route 프록시 사용)
  async uploadImage(imageFile: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const detail = errData?.detail || errData?.message || `HTTP ${res.status}`;
      console.error('[uploadImage] 업로드 실패:', detail);
      throw new Error(`Failed to upload image: ${detail}`);
    }
    return res.json();
  },
};
