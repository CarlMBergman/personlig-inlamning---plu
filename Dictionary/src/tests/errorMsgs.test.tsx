import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
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

  it("should show an error when there is a problem fetching", async () => {
    render(<App />);
    const button = screen.getByText("Look up this word!");
    await userEvent.click(button);

    expect(
      screen.getByText("something went wrong, try search for something again!")
    ).toBeInTheDocument();
  });
});
