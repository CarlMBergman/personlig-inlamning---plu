import { useReducer, createContext } from 'react'
import { wordDescription } from '../interfaces'

interface context {
    list?: wordDescription[],
    dispatch?: React.Dispatch<Action> 
}

interface Action {
    type: string,
    payload: wordDescription
}
export const LikedWordsContext = createContext<context | string>('');

function LikedWordsContextProvider({children}: any) {
    const [likedWords, likedWordsDispatcher] = useReducer(likedWordsReducer, [])

    console.log(likedWords);

    return (
        <LikedWordsContext.Provider 
        value={{ list: likedWords, dispatch: likedWordsDispatcher }}>
            {children}
        </LikedWordsContext.Provider>
    )
}

interface action {
    payload: wordDescription,
    type: string
}

const likedWordsReducer = (likedWords: wordDescription[], action: action) => {

    switch (action.type) {
        case "added": 
            return [...likedWords, action.payload];
        case "removed": 
            return likedWords.filter((word) => {
                if (word.word !== action.payload.word) {
                    return word
                }
            })
        default: 
            return likedWords
    }
}

export default LikedWordsContextProvider