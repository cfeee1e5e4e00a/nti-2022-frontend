import { useRoutes } from 'react-router-dom';
import { routes } from 'router/routes';

export const App = () => {
  const router = useRoutes(routes);

  return <>{router}</>;
};
