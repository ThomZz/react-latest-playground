import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getTodo, getTodos } from '../api/todos';

const todos = createQueryKeys('todos', {
  list: {
    queryKey: null,
    queryFn: () => getTodos()
  },
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => getTodo(id)
  })
});

export default todos;
