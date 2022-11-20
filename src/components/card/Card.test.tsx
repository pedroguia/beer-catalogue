import { render, screen, fireEvent } from "@testing-library/react";
import Card from ".";

test("renders Card correctly", () => {
  render(<Card abv={10} firstBrewed="11/2022" id="1" imageUrl="" name="Beer" onClick={() => {}} />);
  expect(screen.getByTestId(/card/i)).toBeInTheDocument();
  expect(screen.getByText(/Beer/i)).toBeInTheDocument();
  expect(screen.getByText(/First brewed in 11\/2022/i)).toBeInTheDocument();
  expect(screen.getByText(/ABV: 10%/i)).toBeInTheDocument();
});

test("calls onClick prop when clicked", () => {
  const handleClick = jest.fn();
  render(
    <Card abv={10} firstBrewed="11/2022" id="1" imageUrl="" name="Beer" onClick={handleClick} />,
  );
  fireEvent.click(screen.getByTestId(/card/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
