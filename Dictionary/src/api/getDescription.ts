import { returnedWords } from "../interfaces";

/**
 * Where i fetch for a word
 */

async function getDescription(word: string) {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    try {
        const response = await fetch(URL)
        const data: returnedWords = await response.json()
        console.log(data);
        
        return data
    } catch (error) {
        return {
            title: 'this is an error',
            message: 'something went wrong, try search for something again!'
        }
    }
    
}

export default getDescription