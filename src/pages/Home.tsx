import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import todosQuery from '../queries/todos';
import { Link } from 'react-router';

export default function Home() {
  const [count, setCount] = useState(0);
  const { data: todos, isLoading: areTodosLoading } = useQuery(todosQuery.list);
  const { data: todo } = useQuery({
    ...todosQuery.detail(count),
    enabled: count > 0
  });

  return (
    <section>
      <h1>Home</h1>
      <p>
        A minimal React + TypeScript + React Router starter, built with Vite.
      </p>
      {areTodosLoading ? (
        <p>Loading todos...</p>
      ) : (
        <ul>
          {todos?.map((todo) => (
            <Link to={`/details/${todo.id}`} key={todo.id}>
              <li>{todo.title}</li>
            </Link>
          ))}
        </ul>
      )}
      <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
      <p className="hint">
        Edit <code>src/pages/Home.tsx</code> and save to start playing.
      </p>
    </section>
  );
}
