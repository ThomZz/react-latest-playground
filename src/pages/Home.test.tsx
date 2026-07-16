import { screen } from '@testing-library/react';
import Home from './Home';
import { renderWithDefaultProviders } from '../utils/test';

describe('Home', () => {
  it('renders the heading', () => {
    renderWithDefaultProviders(<Home />);
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
  });
});
