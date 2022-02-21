import React from "react";
import { render, screen, userEvent, waitFor } from "../lib/testUtils";
import App from "../App";
import { rest } from "msw";
import { setupServer } from "msw/node";

const fs = require("fs");

let rawdata = fs.readFileSync("./public/cards.json");
let testData = JSON.parse(rawdata);
const handlers = [
  rest.get("/cards.json", (req, res, ctx) => {
    return res(ctx.json(testData), ctx.delay(150));
  }),
];
const server = setupServer(...handlers);

describe("list card tests", () => {
  beforeAll(() => server.listen());
  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());
  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  test("results showing", async () => {
    render(<App />);
    await waitFor(
      () => {
        expect(screen.getByText("Anonymous")).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    expect(screen.getAllByRole("article")).toHaveLength(72);
  });

  test("filter", async () => {
    render(<App />);
    await waitFor(
      () => {
        expect(screen.getByText("Anonymous")).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    userEvent.type(screen.getByRole("textbox"), "anonymous");
    await waitFor(
      () => {
        expect(screen.getAllByRole("article")).toHaveLength(1);
      },
      { timeout: 1500 }
    );
  });
});
