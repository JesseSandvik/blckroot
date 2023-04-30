import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("US-01: Create A New User", () => {
  test("Inputting valid create new user form data and successfully creating new user routes user to dashboard", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    userEvent.click(await screen.findByRole("link", { name: /sign up/i }));

    userEvent.type(
      await screen.findByLabelText("email:"),
      "test_username123@yahoo.com"
    );
    userEvent.type(await screen.findByLabelText("password:"), "Psswrd123@");
    userEvent.type(
      await screen.findByLabelText("confirm password:"),
      "Psswrd123@"
    );

    userEvent.click(
      await screen.findByRole("button", { name: /create account/i })
    );

    const currentPageHeading = await screen.findByRole("heading", {
      name: /dashboard/i,
    });

    expect(currentPageHeading).toBeInTheDocument();
  });
  test("Inputting invalid create new user 'username' form data and clicking 'Sign Up' button displays an error", async () => {});
  test("Inputting invalid create new user 'password' form data and clicking 'Sign Up' button displays an error", () => {});
  test("Inputting invalid create new user 'password match' form data and clicking 'Sign Up' button displays an error", () => {});
});
