import { render, screen } from "@testing-library/react";
import EmptyState from ".";

test("renders EmptyState correctly", () => {
  render(<EmptyState subtitle="This is the subtitle" title="This is the title" />);
  expect(screen.getByTestId(/empty-state/i)).toBeInTheDocument();
  expect(screen.getByText(/This is the subtitle/i)).toBeInTheDocument();
});
