import { Beer, BeerComplete } from "../../../types";

const trimBeerObject = (beer: BeerComplete): Beer => {
  const { abv, brewers_tips, description, first_brewed, food_pairing, id, image_url, name } = beer;

  return {
    abv,
    brewersTips: brewers_tips,
    description,
    firstBrewed: first_brewed,
    foodPairing: food_pairing,
    id: String(id),
    imageUrl: image_url,
    name,
  };
};

export default trimBeerObject;
