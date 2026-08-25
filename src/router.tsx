import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Team from './pages/Team';
import Player from './pages/Player';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: 'team/:id',
        element: <Team />
      },
      {
        path: 'player/:playerId',
        element: <Player />
      },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);
