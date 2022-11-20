interface Volume {
  unit: string;
  value: number;
}

export interface BeerComplete {
  abv: number;
  attenuation_level: number;
  boil_volume: Volume;
  brewers_tips: string;
  contributed_by: string;
  description: string;
  ebc: number;
  first_brewed: string;
  food_pairing: string[];
  ibu: number;
  id: number;
  image_url: string;
  name: string;
  ph: number;
  srm: number;
  tagline: string;
  target_fg: number;
  target_og: number;
  volume: Volume;
}

export interface Beer {
  abv: number;
  brewersTips: string;
  description: string;
  firstBrewed: string;
  foodPairing: string[];
  id: string;
  imageUrl: string;
  name: string;
}
