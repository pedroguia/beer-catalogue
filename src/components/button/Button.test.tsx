import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

test("renders Button correctly", () => {
  render(<Button onClick={() => {}} label="Primary button" />);
  expect(screen.getByTestId(/button/i)).toBeInTheDocument();
  expect(screen.getByText(/Primary button/i)).toBeInTheDocument();
  expect(screen.getByText(/Primary button/i).classList.contains("btn-primary")).toBe(true);

  render(<Button onClick={() => {}} label="Secondary button" color="secondary" />);
  expect(screen.getByText(/Secondary button/i).classList.contains("btn-secondary")).toBe(true);

  render(<Button onClick={() => {}} label="Danger button" color="danger" />);
  expect(screen.getByText(/Danger button/i).classList.contains("btn-danger")).toBe(true);
});

test("calls onClick prop when clicked", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} label="Primary button" />);
  fireEvent.click(screen.getByText(/Primary button/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("renders button disabled", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} label="Primary button" disabled />);
  expect(screen.getByText(/Primary button/i)).toBeDisabled();
  fireEvent.click(screen.getByText(/Primary button/i));
  expect(handleClick).toHaveBeenCalledTimes(0);
});
