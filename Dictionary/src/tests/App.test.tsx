import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import LikedWordsContextProvider from "../reducer/LikedWordsContextProvider";
import { rest } from "msw";
import { setupServer } from "msw/node";
import mockWords from "../mockWords.json";

const server = setupServer(
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/word",
    (_req, res, ctx) => {
      return res(ctx.json(mockWords));
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
