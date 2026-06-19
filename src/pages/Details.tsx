import { useQuery } from '@tanstack/react-query';
import todosQuery from '../queries/todos';
import { useParams } from 'react-router';

export default function Details() {
  const routeParams = useParams();
  const { data: todo, isLoading: isTodoLoading } = useQuery({
    ...todosQuery.detail(+routeParams.id!),
    enabled: !!routeParams.id
  });

  return (
    <section>
      <h1>Details</h1>
      {isTodoLoading ? (
        <p>Loading todo...</p>
      ) : (
        <pre>{JSON.stringify(todo, null, 2)}</pre>
      )}
    </section>
  );
}
