import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from './App';

describe('testing the search function', () => {

  it('should show description of word when e´searched for', async () => {
    render(<App/>)
    const input = screen.getByRole('textbox')
    const button = screen.getByText('Look up this word!')
    await userEvent.type(input, 'hello')
    await userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('To greet with "hello".')).toBeInTheDocument()
    })
  })

  it('should show an error message when not a word is searched', async () => {
    const input = screen.getByRole('textbox')
    const button = screen.getByText('Look up this word!')
    await userEvent.type(input, 'jf349')
    await userEvent.click(button)

    await waitFor(() => {
      
      expect(screen.getByText("Sorry pal, we couldn't find definitions for the word you were looking for.")).toBeInTheDocument()
      screen.debug()
    })
  })
});