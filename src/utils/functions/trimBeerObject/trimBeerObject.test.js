import "@testing-library/jest-dom";
import trimBeerObject from ".";

const beer = {
  abv: 10,
  brewers_tips: "Beer tips",
  description: "Beer description",
  first_brewed: "10/2022",
  food_pairing: ["Beer food pairing"],
  id: 1,
  image_url: "",
  name: "Beer name",
};

test("trimBeerObject", () => {
  const expectedBeer = {
    abv: 10,
    brewersTips: "Beer tips",
    description: "Beer description",
    firstBrewed: "10/2022",
    foodPairing: ["Beer food pairing"],
    id: "1",
    imageUrl: "",
    name: "Beer name",
  };
  expect(trimBeerObject(beer)).toEqual(expectedBeer);
});
