import { definintions, meaning, phonetics, returnedWordProps, wordDescription } from "../../interfaces"
import './WordComp.scss'
import { useContext } from "react";
import { LikedWordsContext } from "../../reducer/LikedWordsContextProvider";

function WordComp(props: returnedWordProps | null) {
    if (props === null) return // För att kringgå ts :))
    const { list, dispatch } = useContext<any>(LikedWordsContext);
    
    const word: wordDescription = props.wordDescription
    let noun: JSX.Element[] | null = null;
    let adjective: JSX.Element[] | null = null;
    let verb: JSX.Element[] | null = null;
    let adverb: JSX.Element[] | null = null;
    let interjection: JSX.Element[] | null = null;
    let sound: any = null;
    
    // Delar upp beskrivningen av ordet i adjektiv
    // adverb, etc... och mappar ut dom i sina respektive
    // platser
    word.meanings.forEach((meaning: meaning) => {
        switch (meaning.partOfSpeech) {
            case 'noun':
                noun = meaning.definitions.map((definition: definintions, index) => {
                    return <li key={index}>{ definition.definition }</li>
                })
                break;
            case 'verb':
                verb = meaning.definitions.map((definition: definintions, index) => {
                    return <li key={index}>{ definition.definition }</li>
                })
                break;
            case 'adjective':
                adjective = meaning.definitions.map((definition: definintions, index) => {
                    return <li key={index}>{ definition.definition }</li>
                })
                break;
            case 'interjection':
                interjection = meaning.definitions.map((definition: definintions, index) => {
                  return <li key={index}>{ definition.definition }</li>
                })
                break;
            case 'adverb':
                adverb = meaning.definitions.map((definition: definintions, index) => {
                    return <li key={index}>{ definition.definition }</li>
                })
        }
    })
    // Om det finns ett eller flera ljud till orden så skrivs dom ut 
    // av denna mappning
    sound = word.phonetics.map((phonetic: phonetics, index) => {
        if (phonetic.audio !== "") {
            return <audio key={index} controls src={ phonetic.audio }></audio>
        }
    })

    
    function handleAdded() {
        dispatch({
            type: "added",
            payload: word
        })
    }

    function handleRemove() {
        dispatch({
            type: "removed",
            payload: word
        })
        updateLikedDOM()
    }

    // Filtrerar bort det borttagna ordet och skickar tillbaka den nya listan
    // för att skriva ut den igen
    function updateLikedDOM() {
        const updated = list.filter((wordToKeep: wordDescription) => wordToKeep !== word)
        if (!props?.handleShowLiked) return
        props.handleShowLiked(updated)
    }

    return (
        <article className="word-card">
            <h1 className="word-card__word">{ word.word }</h1>
            <p>{ word.phonetic }</p>
            { props.liked ? 
                <button onClick={ handleRemove }>Remove this word from favourites!</button> 
                :
                <button onClick={ handleAdded }>Add to favourites!</button>
            }
            <div>
                {sound && sound }
            </div>
            
            
                {noun && 
                    <div>
                        <h3>noun</h3>
                        <ul>
                            { noun }
                        </ul>
                        
                    </div>
                }
                {verb && 
                    <div>
                        <h3>verb</h3>
                        <ul>
                            { verb }
                        </ul>
                        
                    </div>
                }
                {adjective && 
                    <div>
                        <h3>adjective</h3>
                        <ul>
                            { adjective }
                        </ul>
                        
                    </div>
                }
                {interjection && 
                    <div>
                        <h3>interjection</h3>
                        <ul>
                            { interjection }
                        </ul>
                        
                    </div>
                }
                {adverb && 
                    <div>
                        <h3>adverb</h3>
                        <ul>
                            { adverb }
                        </ul>
                        
                    </div>
                }
            
        </article>
    )
}

export default WordComp