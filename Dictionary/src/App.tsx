import './App.scss'
import getDescription from './api/getDescription.ts'
import { useState } from 'react'
import WordComp from './components/wordComp/WordComp.tsx'
import { returnedWords, wordDescription } from './interfaces'
import LightDark from './components/lightDark/LightDark.tsx'

function App() {
  const [inputWord, setInputWord] = useState<string>('')
  const [searchedWord, setSearchedWord] = useState<returnedWords | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>()
  const [lightOrDark, setLightOrDark] = useState<string>('')

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
    <div className={`App ${lightOrDark}`}>
      <header className={`header ${lightOrDark}`}>
        <h1>Dictionary</h1>
        <LightDark setLightOrDark={ setLightOrDark }/>
      </header>
      <main className={`${lightOrDark}`}>
        <input type="text" onChange={e => setInputWord(e.target.value)}/>
        <button onClick={ handleGetWord }>Look up this word!</button>
        {showDesc &&  showDesc }
        {errorMsg && <p>{ errorMsg }</p>}
        
      </main>
    </div>
  )
}

export default App
