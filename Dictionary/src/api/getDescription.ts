import { returnedWords } from "../interfaces";

async function getDescription(word: string) {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    const response = await fetch(URL)
    const data: returnedWords = await response.json()

    console.log(data);
    return data
}

export default getDescription