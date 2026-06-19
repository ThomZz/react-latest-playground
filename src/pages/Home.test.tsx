import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'

describe('Home', () => {
  it('renders the heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
  })

  it('increments the counter when clicked', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const button = screen.getByRole('button', { name: /count is 0/i })
    await user.click(button)

    expect(
      screen.getByRole('button', { name: /count is 1/i })
    ).toBeInTheDocument()
  })
})
