import { definintions, meaning, phonetics, returnedWordProps, wordDescription } from "../../interfaces"
import './WordComp.scss'

function WordComp(props: returnedWordProps | null) {
    if (props === null) return
    console.log(props?.wordDescription);
    const word: wordDescription = props.wordDescription
    let noun: JSX.Element[] | null = null;
    let adjective: JSX.Element[] | null = null;
    let verb: JSX.Element[] | null = null;
    let adverb: JSX.Element[] | null = null;
    let interjection: JSX.Element[] | null = null;
    let sound: any = null;
    
    word.meanings.forEach((meaning: meaning) => {
        if (meaning.partOfSpeech === 'noun') {
            noun = meaning.definitions.map((definition: definintions, index) => {
                return <li key={index}>{ definition.definition }</li>
            })
        } else if (meaning.partOfSpeech === 'verb') {
            verb = meaning.definitions.map((definition: definintions, index) => {
                return <li key={index}>{ definition.definition }</li>
            })
        } else if (meaning.partOfSpeech === 'adjective') {
            adjective = meaning.definitions.map((definition: definintions, index) => {
                return <li key={index}>{ definition.definition }</li>
            })
        } else if (meaning.partOfSpeech === 'interjection') {
            interjection = meaning.definitions.map((definition: definintions, index) => {
                return <li key={index}>{ definition.definition }</li>
            })
        } else if (meaning.partOfSpeech === 'adverb') {
            adverb = meaning.definitions.map((definition: definintions, index) => {
                return <li key={index}>{ definition.definition }</li>
            })
        }
    })

    sound = word.phonetics.map((phonetic: phonetics, index) => {
        if (phonetic.audio !== "") {
            return <audio key={index} controls src={ phonetic.audio }></audio>
        }
    })


    return (
        <article className="word-card">
            <h1 className="word-card__word">{ word.word }</h1>
            {sound && sound }
            
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