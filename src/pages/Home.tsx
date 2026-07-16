import { useQuery } from '@tanstack/react-query';
import todosQuery from '../queries/todos';
import styles from './Home.module.css';
import Todo from '../components/Todo';

export default function Home() {
  const { data: todos, isLoading: areTodosLoading } = useQuery(todosQuery.list);

  return (
    <section>
      {areTodosLoading ? (
        <p>Loading todos...</p>
      ) : (
        <>
          <div className={styles.todos}>
            {todos?.map((todo) => (
              <Todo todo={todo} />
            ))}
          </div>
          <p>Number of todos: {todos?.length ?? 0}</p>
        </>
      )}
    </section>
  );
}
