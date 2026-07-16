import { Link } from 'react-router';
import { type Todo } from '../api/todos';
import styles from './Todo.module.css';

type TodoProps = {
  todo: Todo;
};

export default function Todo({ todo }: TodoProps) {
  return (
    <Link className={styles.container} to={`/details/${todo.id}`} key={todo.id}>
      <p>{todo.title}</p>
    </Link>
  );
}
