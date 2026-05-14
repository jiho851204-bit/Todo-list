export interface TodoItem {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

export interface CreateTodoDto {
  name: string;
}

export interface UpdateTodoDto {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}
