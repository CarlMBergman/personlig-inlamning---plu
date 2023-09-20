import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import LikedWordsContextProvider from './reducer/LikedWordsContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LikedWordsContextProvider>
      <App />
    </LikedWordsContextProvider>
  </React.StrictMode>,
)
