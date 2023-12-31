interface returnedWordProps {
    wordDescription: wordDescription,
    liked: boolean,
    handleShowLiked?: (showLiked: wordDescription[]) => void
}

interface returnedWords {
    wordDescription?: wordDescription[],
    title?: string,
    message?: string,
    resoultion?: string
}

interface wordDescription {
    license: license,
    meanings: meanings,
    phonetic: string,
    phonetics: phonetics[],
    sourceUrls: string[],
    word: string
    id?: number
}

interface license {
    name: string,
    url: string
}

interface meanings {
    [x: string]: any
    // forEach(arg0: (meaning: meaning) => void): unknown
    meaning: meaning[]
}

interface meaning {
    antonyms: string[],
    definitions: definintions[],
    partOfSpeech: string,
    synonyms: string[]
}

interface definintions {
    antonyms: [],
    definition: string,
    example: string,
    synonyms: synonyms[]
}

interface synonyms {
    synonym: string
}

interface phonetics {
    audio: string,
    license: {
        name: string,
        url: string
    },
    sourceUrl: string,
    text: string
}

export { returnedWords, returnedWordProps, wordDescription, meaning, definintions, phonetics }