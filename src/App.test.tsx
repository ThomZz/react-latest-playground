import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { renderWithDefaultProviders } from './utils/test';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';

// App renders <NavLink> and <Outlet />, so it needs a router context.
// MemoryRouter (the in-memory, non-data router) is the lightweight way to
// provide it in component tests — we declare the same child routes so we
// can assert on navigation between the rendered pages.
function renderWithRouter(initialPath = '/') {
  return renderWithDefaultProviders(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders the brand and the Home page at the index route', () => {
    renderWithRouter('/');
    expect(screen.getByText(/React Playground/i)).toBeInTheDocument();
  });

  it('navigates to the About page when the link is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter('/');

    await user.click(screen.getByRole('link', { name: 'About' }));

    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });
});
