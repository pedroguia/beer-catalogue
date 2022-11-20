import { render, screen } from "@testing-library/react";
import Loading from ".";

test("renders Loading correctly", () => {
  render(<Loading />);
  expect(screen.getByTestId(/loading-container/i)).toBeInTheDocument();
});
