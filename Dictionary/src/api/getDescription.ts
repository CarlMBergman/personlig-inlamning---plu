async function getDescription(word: string) {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    const response = await fetch(URL)
    const data = await response.json()

    console.log(data);
    
}

export default getDescription