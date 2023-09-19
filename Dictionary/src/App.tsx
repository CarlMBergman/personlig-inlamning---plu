import './App.css'
import getDescription from './api/getDescription.ts'
import { useState } from 'react'
import WordComp from './components/wordComp/WordComp.tsx'
import { returnedWords, wordDescription } from './interfaces'

function App() {
  const [inputWord, setInputWord] = useState<string>('')
  const [searchedWord, setSearchedWord] = useState<returnedWords | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>()

  async function handleGetWord() {
      const word = await getDescription(inputWord)
      if (word.title) {
        setErrorMsg(word.message)
        setSearchedWord(null)
      } else {
        setSearchedWord(word)
        setErrorMsg(null)
      }
  }

  let showDesc: JSX.Element[] | JSX.Element | null = null
  if (searchedWord && Array.isArray(searchedWord)) {
    showDesc = searchedWord.map((word: wordDescription, index: number) => {
      
      return <WordComp wordDescription={ word } key={index}/>
    })
  }
  
  return (
    <>
      <header>
        <h1>Dictionary</h1>
      </header>
      <main>
        <input type="text" onChange={e => setInputWord(e.target.value)}/>
        <button onClick={ handleGetWord }>Look up this word!</button>
        {showDesc &&  showDesc }
        {errorMsg && <p>{ errorMsg }</p>}
        
      </main>
    </>
  )
}

export default App
