import { render, screen } from "@testing-library/react";
import Header from ".";

test("renders Header correctly", () => {
  render(<Header />);
  expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  expect(screen.getByText(/Beer Catalogue/i)).toBeInTheDocument();
  expect(screen.getByText(/DEUS Code Challenge/i)).toBeInTheDocument();
});
