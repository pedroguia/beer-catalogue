import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
// @ts-ignore
import { createMockStore } from "redux-test-utils";
import List from "./List";

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

const addedBeers = [
  {
    abv: 1,
    brewersTips: "Added Beer brewers tips",
    description: "Added Beer description",
    firstBrewed: "10/2022",
    foodPairing: ["Added Beer Food pairing"],
    id: "n-1",
    imageUrl: "https://images.punkapi.com/v2/keg.png",
    name: "Added Beer",
  },
];

const store = createMockStore({
  beers: {
    beersList,
    addedBeers,
    removedBeers: [],
  },
});

beforeAll(() => {
  window.history.pushState({}, "Beers list", "/beers");
});

const component = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/beers" element={<List />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

test("renders List correctly", () => {
  render(component);
  expect(screen.getByTestId(/create-button/i)).toBeInTheDocument();
  expect(screen.getByText(/Created beers/i)).toBeInTheDocument();
  expect(screen.getAllByTestId(/card/i)).toHaveLength(beersList.length + addedBeers.length);
  expect(screen.getByText(/Beer name/i)).toBeInTheDocument();
  expect(screen.getByText(/09\/2007/i)).toBeInTheDocument();
  expect(screen.getByText(/4.5%/i)).toBeInTheDocument();
  expect(screen.getByTestId(/load-button/i)).toBeInTheDocument();
});

test("renders create modal correctly", async () => {
  render(component);
  fireEvent.click(screen.getByTestId(/create-button/i));
  expect(screen.getByTestId(/modal/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Create beer/i)).toHaveLength(2);
  expect(screen.getByTestId(/name-text-field/i)).toBeInTheDocument();
  expect(screen.getByTestId(/first-brewed-text-field/i)).toBeInTheDocument();
  expect(screen.getByTestId(/abv-text-field/i)).toBeInTheDocument();
  expect(screen.getByTestId(/cancel-button/i)).toBeInTheDocument();
  expect(screen.getByTestId(/confirm-create-button/i)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId(/cancel-button/i));

  await waitFor(() => {
    expect(screen.queryByTestId(/modal/i)).not.toBeInTheDocument();
  });
});
