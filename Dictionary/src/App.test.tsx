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

    it('should hide the liked words when you search for a new word', async () => {
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

      await userEvent.type(input, 's')
      await userEvent.click(button)
    
      await waitFor(() => {
        expect(screen.queryByText('The smallest unit of language that has a particular meaning and can be expressed by itself; the smallest discrete, meaningful unit of language. (contrast morpheme.)')).not.toBeInTheDocument()
      })
      
      })
 
})

  describe('error messages', () => {
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

    it('should show an error when nothing is typed when searching', async () => {
      render(<App/>)
      const button = screen.getByText('Look up this word!')
      await userEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText("please type something")).toBeInTheDocument()
      })
    })
  
  
describe('light or dark mode', () => {
  it('should toggle to dark-mode when checkbox is clicked', async () => {
    const { container } = render(<App/>)
    const checkbox = screen.getByText('light/dark mode')
    await userEvent.click(checkbox)
    expect(container.firstChild).toHaveClass('dark')
  })

  it('should toggle to light-mode when checkbox is clicked again', async () => {
    const { container } = render(<App/>)
    const checkbox = screen.getByText('light/dark mode')
    await userEvent.click(checkbox)
    await waitFor(() => {
      expect(container.firstChild).not.toHaveClass('dark')
    })
    
  })

  it('should be dark when entering page if user has toggled dark previously', () => {
    sessionStorage.setItem('lightOrDark', 'dark')
    const { container } = render(<App/>)
    expect(container.firstChild).toHaveClass('dark')
  })

  it('should be light when entering page if user has toggled light previously', () => {
    sessionStorage.setItem('lightOrDark', '')
    const { container } = render(<App/>)
    expect(container.firstChild).not.toHaveClass('dark')
  })
})




describe('add and remove functions', () => {
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

  it('should remove "word" from liked words', async () => {
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

    const removeLiked = screen.getByText('Remove this word from favourites!')
    await userEvent.click(removeLiked)
    
    expect(screen.getByText('You Have not liked any words!')).toBeInTheDocument()
  })

  it('should remove only one word', async () => {
    renderWithContext()
    const input = screen.getByRole('textbox')
    const button = screen.getByText('Look up this word!')
    await userEvent.type(input, 'word')
    await userEvent.click(button)

    await waitFor(() => {
      const likeBtn = screen.getAllByText('Add to favourites!')
      userEvent.click(likeBtn[0])
    })

    // await userEvent.type(input, '')
    await userEvent.clear(input)
    await userEvent.type(input, 'words')
    await userEvent.click(button)
    screen.debug()
    await waitFor(() => {
      const likeBtn = screen.getAllByText('Add to favourites!')
      userEvent.click(likeBtn[0])
      
    })
    const showLikedBtn = screen.getByText('Show my liked words!')
    await userEvent.click(showLikedBtn)
    
    
    const removeLiked = screen.getAllByText('Remove this word from favourites!')
    await userEvent.click(removeLiked[0])
    
    expect(screen.getByText('To flatter with words, to cajole.')).toBeInTheDocument()
  })
})


