import { render, screen } from "@testing-library/react";
import Modal from ".";

test("renders Modal correctly", () => {
  render(
    <Modal
      title="This is the title"
      body={<p>This is the body</p>}
      footer={<p>This is the footer</p>}
    />,
  );
  expect(screen.getByTestId(/modal/i)).toBeInTheDocument();
  expect(screen.getByText(/This is the title/i)).toBeInTheDocument();
  expect(screen.getByText(/This is the body/i)).toBeInTheDocument();
  expect(screen.getByText(/This is the footer/i)).toBeInTheDocument();
});
