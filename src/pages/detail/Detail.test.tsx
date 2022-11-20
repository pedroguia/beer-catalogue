import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
// @ts-ignore
import { createMockStore } from "redux-test-utils";
import Detail from "./Detail";

const beersList = [
  {
    abv: 4.5,
    brewersTips: "Beer brewers tips",
    description: "Beer description",
    firstBrewed: "09/2007",
    foodPairing: ["Beer Food pairing"],
    id: "1",
    imageUrl: "https://images.punkapi.com/v2/keg.png",
    name: "Beer name",
  },
];

const store = createMockStore({
  beers: {
    beersList,
    addedBeers: [],
    removedBeers: [],
  },
});

beforeAll(() => {
  window.history.pushState({}, "Beer detail", "/beers/1");
});

const component = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/beers/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

test("renders Detail correctly", () => {
  render(component);
  expect(screen.getByTestId(/go-back-button/i)).toBeInTheDocument();
  expect(screen.getByTestId(/remove-button/i)).toBeInTheDocument();
  expect(screen.getByTestId(/edit-button/i)).toBeInTheDocument();
  expect(screen.getByText(/Beer name/i)).toBeInTheDocument();
  expect(screen.getByText(/Beer description/i)).toBeInTheDocument();
  expect(screen.getByText(/Beer brewers tips/i)).toBeInTheDocument();
  expect(screen.getByText(/Beer Food pairing/i)).toBeInTheDocument();
  expect(screen.getByText(/09\/2007/i)).toBeInTheDocument();
  expect(screen.getByText(/4.5%/i)).toBeInTheDocument();
});

test("renders edit modal correctly", async () => {
  render(component);
  fireEvent.click(screen.getByTestId(/edit-button/i));
  expect(screen.getByTestId(/modal/i)).toBeInTheDocument();
  expect(screen.getByText(/Edit beer/i)).toBeInTheDocument();
  expect(screen.getByTestId(/name-text-field/i)).toBeInTheDocument();
  expect(screen.getByTestId(/first-brewed-text-field/i)).toBeInTheDocument();
  expect(screen.getByTestId(/abv-text-field/i)).toBeInTheDocument();
  expect(screen.getByTestId(/cancel-button/i)).toBeInTheDocument();
  expect(screen.getByTestId(/confirm-edit-button/i)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId(/cancel-button/i));

  await waitFor(() => {
    expect(screen.queryByTestId(/modal/i)).not.toBeInTheDocument();
  });
});

test("renders remove modal correctly", async () => {
  render(component);
  fireEvent.click(screen.getByTestId(/remove-button/i));
  expect(screen.getByTestId(/modal/i)).toBeInTheDocument();
  expect(screen.getByText(/Remove beer/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Are you sure that you want to remove this beer from the catalogue?/i),
  ).toBeInTheDocument();
  expect(screen.getByTestId(/cancel-button/i)).toBeInTheDocument();
  expect(screen.getByTestId(/confirm-remove-button/i)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId(/cancel-button/i));

  await waitFor(() => {
    expect(screen.queryByTestId(/modal/i)).not.toBeInTheDocument();
  });
});
