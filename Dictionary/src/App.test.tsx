import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from './App';
import LikedWordsContextProvider from './reducer/LikedWordsContextProvider';

const renderWithContext = () => render(<LikedWordsContextProvider>
  <App />
</LikedWordsContextProvider>)

describe('testing the search function', () => {

  it('should show description of word when hello is searched for', async () => {
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
    render(<App/>)
    const input = screen.getByRole('textbox')
    const button = screen.getByText('Look up this word!')
    await userEvent.type(input, 'jf349')
    await userEvent.click(button)

    await waitFor(() => {
      
      expect(screen.getByText("Sorry pal, we couldn't find definitions for the word you were looking for.")).toBeInTheDocument()
    })
  })
});

it('should toggle to dark-mode when checkbox is clicked', async () => {
  const { container } = render(<App/>)
  const checkbox = screen.getByText('light/dark mode')
  await userEvent.click(checkbox)
  expect(container.firstChild).toHaveClass('dark')
})

it('should add "word" to liked words', async () => {
  renderWithContext()
  const input = screen.getByRole('textbox')
  const button = screen.getByText('Look up this word!')
  await userEvent.type(input, 'word')
  await userEvent.click(button)

  await waitFor(() => {
    const likeBtn = screen.getAllByText('Add to favourites!')
    userEvent.click(likeBtn[0])
  })
  
  const showLikedBtn = screen.getByText('Show my liked words!')
  await userEvent.click(showLikedBtn)
  
  expect(screen.getByText('The smallest unit of language that has a particular meaning and can be expressed by itself; the smallest discrete, meaningful unit of language. (contrast morpheme.)')).toBeInTheDocument()
})