import { Data } from "../data/types";

export interface State {
  todaysAnime: Data;
  userGuesses: number[];
}

export const defaultState = {
  todaysAnime: {} as Data,
  userGuesses: [],
};
