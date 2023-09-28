import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import LikedWordsContextProvider from "../reducer/LikedWordsContextProvider";
import { rest } from "msw";
import { setupServer } from "msw/node";
import mockWords from "../mockWords.json";
import mockStrong from "../mockStrong.json";

const server = setupServer(
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/word",
    (_req, res, ctx) => {
      return res(ctx.json(mockWords));
    }
  ),
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/strong",
    (_req, res, ctx) => {
      return res(ctx.json(mockStrong));
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

describe("some basic tests", () => {
  it("should show Dictionary as header", () => {
    render(<App />);
    expect(screen.getByText("Dictionary")).toBeInTheDocument();
  });

  it("should write in inputfield", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hejsan");

    expect(input).toHaveValue("hejsan");
  });

  it("should show the light/dark mode toggle", () => {
    render(<App />);
    expect(screen.getByText("light/dark mode")).toBeInTheDocument();
  });
});

describe("testing the search function", () => {
  it("should show description of word strong when strong is searched for", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Look up this word!");
    await userEvent.type(input, "strong");
    await userEvent.click(button);

    expect(screen.getByText("adjective")).toBeInTheDocument();
    expect(
      screen.getByText("Having an offensive or intense odor or flavor.")
    ).toBeInTheDocument();
    expect(screen.getAllByText("Antonyms")).toHaveLength(2);
    expect(screen.getByText("fragile")).toBeInTheDocument();
    expect(screen.getAllByText("Synonyms")).toHaveLength(2);
    expect(screen.getByText("ardent")).toBeInTheDocument();
    expect(screen.getByText("adverb")).toBeInTheDocument();
    expect(screen.getByText("In a strong manner.")).toBeInTheDocument();
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
      screen.getByText("You have not liked any words!")
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
