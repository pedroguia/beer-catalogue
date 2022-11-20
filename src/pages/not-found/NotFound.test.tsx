import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from ".";

const component = (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

test("renders NotFound correctly", () => {
  render(component);
  expect(screen.getByText(/404/i)).toBeInTheDocument();
  expect(screen.getByText(/This page does not exist!/i)).toBeInTheDocument();
});
