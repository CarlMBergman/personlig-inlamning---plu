import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import LikedWordsContextProvider from "./reducer/LikedWordsContextProvider";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/word",
    (_req, res, ctx) => {
      return res(
        ctx.json([
          {
            word: "word",
            phonetic: "/wɜːd/",
            phonetics: [
              {
                text: "/wɜːd/",
                audio: "",
              },
              {
                text: "/wɝd/",
                audio:
                  "https://api.dictionaryapi.dev/media/pronunciations/en/word-us.mp3",
                sourceUrl:
                  "https://commons.wikimedia.org/w/index.php?curid=1197728",
                license: {
                  name: "BY-SA 3.0",
                  url: "https://creativecommons.org/licenses/by-sa/3.0",
                },
              },
            ],
            meanings: [
              {
                partOfSpeech: "noun",
                definitions: [
                  {
                    definition:
                      "The smallest unit of language that has a particular meaning and can be expressed by itself; the smallest discrete, meaningful unit of language. (contrast morpheme.)",
                    synonyms: [],
                    antonyms: [],
                  },
                  {
                    definition: "Something like such a unit of language:",
                    synonyms: [],
                    antonyms: [],
                  },
                  {
                    definition:
                      "The fact or act of speaking, as opposed to taking action. .",
                    synonyms: [],
                    antonyms: [],
                  },
                  {
                    definition:
                      "Something that someone said; a comment, utterance; speech.",
                    synonyms: [],
                    antonyms: [],
                  },
                  {
                    definition:
                      "A watchword or rallying cry, a verbal signal (even when consisting of multiple words).",
                    synonyms: [],
                    antonyms: [],
                    example: "mum's the word",
                  },
                  {
                    definition: "A proverb or motto.",
                    synonyms: [],
                    antonyms: [],
                  },
                  {
                    definition: "News; tidings (used without an article).",
                    synonyms: [],
                    antonyms: [],
                    example: "Have you had any word from John yet?",
                  },
                  {
                    definition:
                      "An order; a request or instruction; an expression of will.",
                    synonyms: [],
                    antonyms: [],
                    example: "Don't fire till I give the word",
                  },
                  {
                    definition: "A promise; an oath or guarantee.",
                    synonyms: ["promise"],
                    antonyms: [],
                    example: "I give you my word that I will be there on time.",
                  },
                  {
                    definition: "A brief discussion or conversation.",
                    synonyms: [],
                    antonyms: [],
                    example: "Can I have a word with you?",
                  },
                  {
                    definition: "(in the plural) See words.",
                    synonyms: [],
                    antonyms: [],
                    example:
                      "There had been words between him and the secretary about the outcome of the meeting.",
                  },
                  {
                    definition:
                      "(sometimes Word) Communication from God; the message of the Christian gospel; the Bible, Scripture.",
                    synonyms: ["Bible", "word of God"],
                    antonyms: [],
                    example:
                      "Her parents had lived in Botswana, spreading the word among the tribespeople.",
                  },
                  {
                    definition: "(sometimes Word) Logos, Christ.",
                    synonyms: ["God", "Logos"],
                    antonyms: [],
                  },
                ],
                synonyms: [
                  "Bible",
                  "word of God",
                  "God",
                  "Logos",
                  "promise",
                  "vocable",
                ],
                antonyms: [],
              },
              {
                partOfSpeech: "verb",
                definitions: [
                  {
                    definition:
                      "To say or write (something) using particular words; to phrase (something).",
                    synonyms: ["express", "phrase", "put into words", "state"],
                    antonyms: [],
                    example:
                      "I’m not sure how to word this letter to the council.",
                  },
                  {
                    definition: "To flatter with words, to cajole.",
                    synonyms: [],
                    antonyms: [],
                  },
                  {
                    definition: "To ply or overpower with words.",
                    synonyms: [],
                    antonyms: [],
                  },
                  {
                    definition: "To conjure with a word.",
                    synonyms: [],
                    antonyms: [],
                  },
                  {
                    definition:
                      "To speak, to use words; to converse, to discourse.",
                    synonyms: [],
                    antonyms: [],
                  },
                ],
                synonyms: ["express", "phrase", "put into words", "state"],
                antonyms: [],
              },
              {
                partOfSpeech: "interjection",
                definitions: [
                  {
                    definition:
                      'Truth, indeed, that is the truth! The shortened form of the statement "My word is my bond."',
                    synonyms: [],
                    antonyms: [],
                    example:
                      '"Yo, that movie was epic!" / "Word?" ("You speak the truth?") / "Word." ("I speak the truth.")',
                  },
                  {
                    definition:
                      "(stereotypically) An abbreviated form of word up; a statement of the acknowledgment of fact with a hint of nonchalant approval.",
                    synonyms: [],
                    antonyms: [],
                  },
                ],
                synonyms: [],
                antonyms: [],
              },
            ],
            license: {
              name: "CC BY-SA 3.0",
              url: "https://creativecommons.org/licenses/by-sa/3.0",
            },
            sourceUrls: ["https://en.wiktionary.org/wiki/word"],
          },
          {
            word: "word",
            phonetic: "/wɜːd/",
            phonetics: [
              {
                text: "/wɜːd/",
                audio: "",
              },
              {
                text: "/wɝd/",
                audio:
                  "https://api.dictionaryapi.dev/media/pronunciations/en/word-us.mp3",
                sourceUrl:
                  "https://commons.wikimedia.org/w/index.php?curid=1197728",
                license: {
                  name: "BY-SA 3.0",
                  url: "https://creativecommons.org/licenses/by-sa/3.0",
                },
              },
            ],
            meanings: [
              {
                partOfSpeech: "verb",
                definitions: [
                  {
                    definition:
                      "(except in set phrases) To be, become, betide.",
                    synonyms: [],
                    antonyms: [],
                    example: "Well worth thee, me friend.",
                  },
                ],
                synonyms: [],
                antonyms: [],
              },
            ],
            license: {
              name: "CC BY-SA 3.0",
              url: "https://creativecommons.org/licenses/by-sa/3.0",
            },
            sourceUrls: [
              "https://en.wiktionary.org/wiki/word",
              "https://en.wiktionary.org/wiki/worth",
            ],
          },
          // {
          //   "word": "words",
          //   "phonetic": "/wɜːdz/",
          //   "phonetics": [
          //   {
          //   "text": "/wɜːdz/",
          //   "audio": ""
          //   },
          //   {
          //   "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/words-us.mp3",
          //   "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=1225641",
          //   "license": {
          //   "name": "BY-SA 3.0",
          //   "url": "https://creativecommons.org/licenses/by-sa/3.0"
          //   }
          //   }
          //   ],
          //   "meanings": [
          //   {
          //   "partOfSpeech": "noun",
          //   "definitions": [
          //   {
          //   "definition": "The smallest unit of language that has a particular meaning and can be expressed by itself; the smallest discrete, meaningful unit of language. (contrast morpheme.)",
          //   "synonyms": [],
          //   "antonyms": []
          //   },
          //   {
          //   "definition": "Something like such a unit of language:",
          //   "synonyms": [],
          //   "antonyms": []
          //   },
          //   {
          //   "definition": "The fact or act of speaking, as opposed to taking action. .",
          //   "synonyms": [],
          //   "antonyms": []
          //   },
          //   {
          //   "definition": "Something that someone said; a comment, utterance; speech.",
          //   "synonyms": [],
          //   "antonyms": []
          //   },
          //   {
          //   "definition": "A watchword or rallying cry, a verbal signal (even when consisting of multiple words).",
          //   "synonyms": [],
          //   "antonyms": [],
          //   "example": "mum's the word"
          //   },
          //   {
          //   "definition": "A proverb or motto.",
          //   "synonyms": [],
          //   "antonyms": []
          //   },
          //   {
          //   "definition": "News; tidings (used without an article).",
          //   "synonyms": [],
          //   "antonyms": [],
          //   "example": "Have you had any word from John yet?"
          //   },
          //   {
          //   "definition": "An order; a request or instruction; an expression of will.",
          //   "synonyms": [],
          //   "antonyms": [],
          //   "example": "Don't fire till I give the word"
          //   },
          //   {
          //   "definition": "A promise; an oath or guarantee.",
          //   "synonyms": [
          //   "promise"
          //   ],
          //   "antonyms": [],
          //   "example": "I give you my word that I will be there on time."
          //   },
          //   {
          //   "definition": "A brief discussion or conversation.",
          //   "synonyms": [],
          //   "antonyms": [],
          //   "example": "Can I have a word with you?"
          //   },
          //   {
          //   "definition": "(in the plural) See words.",
          //   "synonyms": [],
          //   "antonyms": [],
          //   "example": "There had been words between him and the secretary about the outcome of the meeting."
          //   },
          //   {
          //   "definition": "(sometimes Word) Communication from God; the message of the Christian gospel; the Bible, Scripture.",
          //   "synonyms": [
          //   "Bible",
          //   "word of God"
          //   ],
          //   "antonyms": [],
          //   "example": "Her parents had lived in Botswana, spreading the word among the tribespeople."
          //   },
          //   {
          //   "definition": "(sometimes Word) Logos, Christ.",
          //   "synonyms": [
          //   "God",
          //   "Logos"
          //   ],
          //   "antonyms": []
          //   }
          //   ],
          //   "synonyms": [
          //   "Bible",
          //   "word of God",
          //   "God",
          //   "Logos",
          //   "promise",
          //   "vocable"
          //   ],
          //   "antonyms": []
          //   },
          //   {
          //   "partOfSpeech": "verb",
          //   "definitions": [
          //   {
          //   "definition": "To say or write (something) using particular words; to phrase (something).",
          //   "synonyms": [
          //   "express",
          //   "phrase",
          //   "put into words",
          //   "state"
          //   ],
          //   "antonyms": [],
          //   "example": "I’m not sure how to word this letter to the council."
          //   },
          //   {
          //   "definition": "To flatter with words, to cajole.",
          //   "synonyms": [],
          //   "antonyms": []
          //   },
          //   {
          //   "definition": "To ply or overpower with words.",
          //   "synonyms": [],
          //   "antonyms": []
          //   },
          //   {
          //   "definition": "To conjure with a word.",
          //   "synonyms": [],
          //   "antonyms": []
          //   },
          //   {
          //   "definition": "To speak, to use words; to converse, to discourse.",
          //   "synonyms": [],
          //   "antonyms": []
          //   }
          //   ],
          //   "synonyms": [
          //   "express",
          //   "phrase",
          //   "put into words",
          //   "state"
          //   ],
          //   "antonyms": []
          //   },
          //   {
          //   "partOfSpeech": "noun",
          //   "definitions": [
          //   {
          //   "definition": "Angry debate or conversation; argument.",
          //   "synonyms": [],
          //   "antonyms": [],
          //   "example": "After she found out the truth, she had words with him, to tell him how she felt."
          //   },
          //   {
          //   "definition": "Lines in a script for a performance.",
          //   "synonyms": [],
          //   "antonyms": [],
          //   "example": "You better get your words memorised before rehearsal next Saturday."
          //   },
          //   {
          //   "definition": "Lyrics.",
          //   "synonyms": [],
          //   "antonyms": [],
          //   "example": "The composer set the words to music."
          //   }
          //   ],
          //   "synonyms": [],
          //   "antonyms": []
          //   }
          //   ],
          //   "license": {
          //   "name": "CC BY-SA 3.0",
          //   "url": "https://creativecommons.org/licenses/by-sa/3.0"
          //   },
          //   "sourceUrls": [
          //   "https://en.wiktionary.org/wiki/word",
          //   "https://en.wiktionary.org/wiki/words"
          //   ]
          //   }
        ])
      );
    }
  ),
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/jf349",
    (_req, res, ctx) => {
      return res(
        ctx.json({
          title: "No Definitions Found",
          message:
            "Sorry pal, we couldn't find definitions for the word you were looking for.",
          resolution:
            "You can try the search again at later time or head to the web instead.",
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

const renderWithContext = () =>
  render(
    <LikedWordsContextProvider>
      <App />
    </LikedWordsContextProvider>
  );

describe("testing the search function", () => {
  it("should show description of word when word is searched for", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Look up this word!");
    await userEvent.type(input, "word");
    await userEvent.click(button);

    expect(
      screen.getByText("(except in set phrases) To be, become, betide.")
    ).toBeInTheDocument();
  });

  it("should hide the liked words when you search for a new word", async () => {
    renderWithContext();
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Look up this word!");
    await userEvent.type(input, "word");
    await userEvent.click(button);

    const likeBtn = screen.getAllByText("Add to favourites!");
    userEvent.click(likeBtn[0]);

    const showLikedBtn = screen.getByText("Show my liked words!");
    await userEvent.click(showLikedBtn);

    await userEvent.click(button);

    expect(
      screen.queryByText("Remove this word from favourites!")
    ).not.toBeInTheDocument();
  });
});

describe("error messages", () => {
  it("should show an error message when not a word is searched", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Look up this word!");
    await userEvent.type(input, "jf349");
    await userEvent.click(button);

    expect(
      screen.getByText(
        "Sorry pal, we couldn't find definitions for the word you were looking for."
      )
    ).toBeInTheDocument();
  });
});

it("should show an error when nothing is typed when searching", async () => {
  render(<App />);
  const button = screen.getByText("Look up this word!");
  await userEvent.click(button);

  expect(screen.getByText("please type something")).toBeInTheDocument();
});

describe("light or dark mode", () => {
  it("should toggle to dark-mode when checkbox is clicked", async () => {
    render(<App />);
    const checkbox = screen.getByText("light/dark mode");
    await userEvent.click(checkbox);
    expect(screen.getByRole("banner")).toHaveClass("dark");
  });

  it("should toggle to light-mode when checkbox is clicked again", async () => {
    render(<App />);
    const checkbox = screen.getByText("light/dark mode");
    await userEvent.click(checkbox);

    expect(screen.getByRole("banner")).not.toHaveClass("dark");
  });

  it("should be dark when entering page if user has toggled dark previously", () => {
    sessionStorage.setItem("lightOrDark", "dark");
    render(<App />);
    expect(screen.getByRole("banner")).toHaveClass("dark");
  });

  it("should be light when entering page if user has toggled light previously", () => {
    sessionStorage.setItem("lightOrDark", "");
    render(<App />);
    expect(screen.getByRole("banner")).not.toHaveClass("dark");
  });
});

describe("add and remove functions", () => {
  it('should add "word" to liked words', async () => {
    renderWithContext();
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Look up this word!");
    await userEvent.type(input, "word");
    await userEvent.click(button);

    const likeBtn = await screen.findAllByText("Add to favourites!");
    userEvent.click(likeBtn[0]);

    const showLikedBtn = screen.getByText("Show my liked words!");
    await userEvent.click(showLikedBtn);

    expect(
      screen.getByText(
        "The smallest unit of language that has a particular meaning and can be expressed by itself; the smallest discrete, meaningful unit of language. (contrast morpheme.)"
      )
    ).toBeInTheDocument();
  });

  it('should remove "word" from liked words', async () => {
    renderWithContext();
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Look up this word!");
    await userEvent.type(input, "word");
    await userEvent.click(button);

    const likeBtn = screen.getAllByText("Add to favourites!");
    userEvent.click(likeBtn[0]);

    const showLikedBtn = screen.getByText("Show my liked words!");
    await userEvent.click(showLikedBtn);

    const removeLiked = screen.getByText("Remove this word from favourites!");
    await userEvent.click(removeLiked);

    expect(
      screen.getByText("You Have not liked any words!")
    ).toBeInTheDocument();
  });

  it("should remove only one word", async () => {
    renderWithContext();
    const input = screen.getByRole("textbox");
    const buttonSearch = screen.getByText("Look up this word!");
    await userEvent.clear(input);
    await userEvent.type(input, "word");
    await userEvent.click(buttonSearch);

    const likeBtn = await screen.findAllByText("Add to favourites!");
    await userEvent.click(likeBtn[0]);
    await userEvent.click(likeBtn[1]);

    const showLikedBtn = screen.getByText("Show my liked words!");
    await userEvent.click(showLikedBtn);

    const removeLiked = screen.getAllByText(
      "Remove this word from favourites!"
    );
    await userEvent.click(removeLiked[0]);

    expect(
      screen.queryByText(
        "The smallest unit of language that has a particular meaning and can be expressed by itself; the smallest discrete, meaningful unit of language. (contrast morpheme.)"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("(except in set phrases) To be, become, betide.")
    ).toBeInTheDocument();
  });
});
