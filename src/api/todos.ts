export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  return res.json();
}

export async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return res.json();
}
