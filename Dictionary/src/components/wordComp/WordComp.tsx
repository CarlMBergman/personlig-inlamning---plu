import {
  meaning,
  phonetics,
  returnedWordProps,
  wordDescription,
} from "../../interfaces";
import "./WordComp.scss";
import { useContext, useState, useEffect } from "react";
import { LikedWordsContext } from "../../reducer/LikedWordsContextProvider";
import PartOfSpeech from "../PartOfSpeechComp/PartOfSpeech";

/**
 * The component that displays our searched word/words
 */

function WordComp(props: returnedWordProps | null) {
  if (props === null) return; // För att kringgå ts :))
  const { list, dispatch } = useContext<any>(LikedWordsContext);
  const [likeBtnText, setLikeBtnText] = useState<string>("Add to favourites!");
  const [disabledLikeBtn, setDisabledLikeBtn] = useState<boolean>(false);

  const word: wordDescription = props.wordDescription;
  let sound: any = null;

  useEffect(() => {
    setLikeBtnText("Add to favourites!");
    setDisabledLikeBtn(false);
  }, [word]);

  const meaning = word.meanings.map((meaning: meaning, index: number) => {
    return <PartOfSpeech meaning={meaning} key={index} />;
  });

  // Om det finns ett eller flera ljud till orden så skrivs dom ut
  // av denna mappning
  sound = word.phonetics.map((phonetic: phonetics, index) => {
    if (phonetic.audio !== "") {
      return <audio key={index} controls src={phonetic.audio}></audio>;
    }
  });

  function handleAdded() {
    dispatch({
      type: "added",
      payload: word,
    });
    setLikeBtnText("Added! <3");
    setDisabledLikeBtn(true);
  }

  function handleRemove() {
    dispatch({
      type: "removed",
      payload: word,
    });
    updateLikedDOM();
  }

  // Filtrerar bort det borttagna ordet och skickar tillbaka den nya listan
  // för att skriva ut den igen
  function updateLikedDOM() {
    const updated = list.filter(
      (wordToKeep: wordDescription) => wordToKeep.id !== word.id
    );
    if (!props?.handleShowLiked) return;
    props.handleShowLiked(updated);
  }

  return (
    <article className="word-card">
      <h1 className="word-card__word">{word.word}</h1>
      <p>{word.phonetic}</p>
      {props.liked ? (
        <button className="word-card__btn" onClick={handleRemove}>
          Remove this word from favourites!
        </button>
      ) : (
        <button
          className="word-card__btn"
          disabled={disabledLikeBtn}
          onClick={handleAdded}
        >
          {likeBtnText}
        </button>
      )}
      <div>{sound && sound}</div>

      {meaning && (
        <div>
          <h2>Definitions</h2>
          {meaning}
        </div>
      )}
    </article>
  );
}

export default WordComp;
