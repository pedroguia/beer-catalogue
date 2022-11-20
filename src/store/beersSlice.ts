import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BeerComplete, Beer } from "../types";
import filterUnique from "../utils/functions/filterUnique";
import sortBy from "../utils/functions/sortBy";
import trimBeerObject from "../utils/functions/trimBeerObject";

interface BeersState {
  beersList: Beer[];
  currentPage: number;
  addedBeers: Beer[];
  removedBeers: string[];
  errorLoadingBeer: boolean;
}

interface ReducerAdd {
  abv: number;
  firstBrewed: string;
  name: string;
}

interface ReducerEdit {
  abv: number;
  firstBrewed: string;
  id: string;
  name: string;
}

const initialState: BeersState = {
  beersList: [],
  currentPage: 1,
  addedBeers: [],
  removedBeers: [],
  errorLoadingBeer: false,
};

export const getBeersList = createAsyncThunk(
  "list",
  async (page: number = initialState.currentPage) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}beers?page=${page}&per_page=20`,
    );
    return { data: response.data, page };
  },
);

export const getBeerById = createAsyncThunk("beer", async (id: number) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}beers/${id}`);
  return response.data;
});

export const beersSlice = createSlice({
  name: "beers",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ReducerAdd>) => {
      const { name, firstBrewed, abv } = action.payload;
      const id: number =
        state.addedBeers.length === 0 ? 1 : Number(state.addedBeers[0].id.substring(2)) + 1;

      const addedBeer: Beer = {
        abv,
        brewersTips: "Tips not available",
        description: "Description not available",
        firstBrewed,
        foodPairing: ["Pairing not available"],
        id: `n-${id}`,
        imageUrl: "",
        name,
      };

      state.addedBeers = [addedBeer, ...state.addedBeers];
      toast.success(`${name} added successfully!`);
    },
    edit: (state, action: PayloadAction<ReducerEdit>) => {
      const { id, name, firstBrewed, abv } = action.payload;
      const stateToChange: keyof BeersState = id.startsWith("n-") ? "addedBeers" : "beersList";
      const beerIndex: number = state[stateToChange].findIndex((item: Beer) => item.id === id);
      const beersListCopy: Beer[] = JSON.parse(JSON.stringify(state[stateToChange]));

      beersListCopy[beerIndex].name = name;
      beersListCopy[beerIndex].firstBrewed = firstBrewed;
      beersListCopy[beerIndex].abv = abv;
      state[stateToChange] = beersListCopy;
      toast.success(`Beer edited successfully!`);
    },
    remove: (state, action: PayloadAction<string>) => {
      const { payload: id } = action;
      const stateToChange: keyof BeersState = id.startsWith("n-") ? "addedBeers" : "beersList";
      const beersListCopy: Beer[] = JSON.parse(JSON.stringify(state[stateToChange]));

      state[stateToChange] = beersListCopy.filter((beer: Beer) => beer.id !== id);
      state.removedBeers.push(id);
      toast.success(`Beer removed successfully!`);
    },
    reset: (state, action: PayloadAction<keyof BeersState>) => {
      const { payload: stateName } = action;

      // @ts-ignore
      state[stateName] = initialState[stateName];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBeersList.fulfilled, (state, action: PayloadAction<any>) => {
        const { data, page } = action.payload;
        let newBeerList: Beer[] = [
          ...state.beersList,
          ...data.map((beer: BeerComplete) => trimBeerObject(beer)),
        ];
        newBeerList = newBeerList.filter((beer: Beer) => !state.removedBeers.includes(beer.id));

        state.beersList = sortBy(filterUnique(newBeerList, "id"), "id");
        state.currentPage = page;
      })
      .addCase(getBeerById.fulfilled, (state, action: PayloadAction<BeerComplete[]>) => {
        const [beer] = action.payload;
        state.beersList = [...state.beersList, trimBeerObject(beer)];
      })
      .addCase(getBeerById.rejected, (state, action: any) => {
        const {
          error: { code },
        } = action;

        if (code === "ERR_BAD_REQUEST") state.errorLoadingBeer = true;
      });
  },
});

export const { add, edit, remove, reset } = beersSlice.actions;

export default beersSlice.reducer;
