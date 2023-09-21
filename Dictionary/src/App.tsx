import './App.scss'
import getDescription from './api/getDescription.ts'
import { useState } from 'react'
import WordComp from './components/wordComp/WordComp.tsx'
import { returnedWords, wordDescription } from './interfaces'
import LightDark from './components/lightDark/LightDark.tsx'
import { useContext } from "react";
import { LikedWordsContext } from './reducer/LikedWordsContextProvider.tsx'
/**
 * The main component of the app.
 */
function App() {
  const [inputWord, setInputWord] = useState<string>('')
  const [searchedWord, setSearchedWord] = useState<returnedWords | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>()
  const [lightOrDark, setLightOrDark] = useState<string>('')
  const { list } = useContext<any>(LikedWordsContext);

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

  const [showLiked, setShowLiked] = useState<JSX.Element[] | null>(null)
  function handleShowLiked(list: wordDescription[]) {
    
    if (list.length > 0) {
      const likedWordsDisplay = list.map((word: wordDescription, index: number) => {
        return <WordComp handleShowLiked={handleShowLiked} liked={ true } wordDescription={ word } key={index}/>
      })
      setShowLiked(likedWordsDisplay)
    } else {
      setShowLiked(null)
      setErrorMsg('You Have not liked any words!')
    }
    setSearchedWord(null)
  }
  
  let showDesc: JSX.Element[] | null = null
  if (searchedWord && Array.isArray(searchedWord)) {
    showDesc = searchedWord.map((word: wordDescription, index: number) => {
      return <WordComp liked={ false } wordDescription={ word } key={index}/>
    })
    if (showLiked) {
      setShowLiked(null)
    }
    
  }
  
  return (
    <div className={`App ${lightOrDark}`}>
      <header className={`header ${lightOrDark}`}>
        <h1>Dictionary</h1>
        <LightDark setLightOrDark={ setLightOrDark }/>
      </header>
      <main className={`main ${lightOrDark}`}>
        <nav className='main__nav'>
          <div className='main__nav-search'>
            <input type="text" onChange={e => setInputWord(e.target.value)}/>
            <button onClick={ handleGetWord }>Look up this word!</button>
          </div>
          <button onClick={ () => handleShowLiked(list) }>Show my liked words!</button>
        </nav>
        
        {showDesc &&  showDesc }
        {errorMsg && <p>{ errorMsg }</p>}
        { showLiked && showLiked }
      </main>
    </div>
  )
}

export default App
