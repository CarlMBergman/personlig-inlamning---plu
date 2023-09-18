import './App.css'
import getDescription from './api/getDescription.ts'

function App() {

  function handleGetWord() {
    getDescription('fucker')
  }

  return (
    <>
      <header>
        <h1>Dictionary</h1>
      </header>
      <main>
        <button onClick={ handleGetWord }>Look up this word!</button>
      </main>
    </>
  )
}

export default App
