import { useReducer, createContext } from "react";
import { wordDescription } from "../interfaces";

interface context {
  list?: wordDescription[];
  dispatch?: React.Dispatch<Action>;
}

interface Action {
  type: string;
  payload: wordDescription;
}
export const LikedWordsContext = createContext<context | string>("");

function LikedWordsContextProvider({ children }: any) {
  const [likedWords, likedWordsDispatcher] = useReducer(likedWordsReducer, []);

  return (
    <LikedWordsContext.Provider
      value={{ list: likedWords, dispatch: likedWordsDispatcher }}
    >
      {children}
    </LikedWordsContext.Provider>
  );
}

interface action {
  payload: wordDescription;
  type: string;
}

const likedWordsReducer = (likedWords: wordDescription[], action: action) => {
  let id: number = likedWords.length;
  action.payload.id = id + 1;

  switch (action.type) {
    case "added":
      return [...likedWords, action.payload];
    case "removed":
      return likedWords.filter((word) => {
        if (word.id !== action.payload.id) {
          return word;
        }
      });
    default:
      return likedWords;
  }
};

export default LikedWordsContextProvider;
