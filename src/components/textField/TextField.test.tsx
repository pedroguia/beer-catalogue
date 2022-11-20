import { render, screen, fireEvent } from "@testing-library/react";
import TextField from ".";

test("renders TextField correctly", () => {
  render(
    <TextField
      label="This is the label"
      name="textfield"
      onChange={() => {}}
      placeholder="This is the placeholder"
      value=""
    />,
  );
  expect(screen.getByTestId(/text-field/i)).toBeInTheDocument();
  expect(screen.getByText(/This is the label/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/This is the placeholder/i)).toBeInTheDocument();
});

test("does not render placeholder if prop is undefined", () => {
  render(
    <TextField
      label="This is the label"
      name="textfield"
      onChange={() => {}}
      placeholder={undefined}
      value=""
    />,
  );
  expect(screen.queryByPlaceholderText(/This is the placeholder/i)).not.toBeInTheDocument();
});

test("calls onChange prop when value changed", () => {
  const handleChange = jest.fn();
  render(
    <TextField
      label="This is the label"
      name="textfield"
      onChange={handleChange}
      placeholder="This is the placeholder"
      value=""
    />,
  );
  fireEvent.change(screen.getByPlaceholderText(/This is the placeholder/i), {
    target: { value: "value" },
  });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
