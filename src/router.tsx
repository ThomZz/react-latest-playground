import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Details from './pages/Details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      { path: 'details/:id', element: <Details /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);
