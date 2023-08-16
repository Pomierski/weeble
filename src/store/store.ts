import { useEffect, useReducer, useState } from "react";
import { useCachedData } from "../hooks/useCachedData";
import { getTodaysAnimeIndex } from "../utils/getTodaysAnimeIndex";
import { State, defaultState } from "./state";

export type Store = {
  state: State;
  initialized: boolean;
  addUserGuessIndex: (guess: number) => void;
};

export const useStore = (): Store => {
  const [state, setState] = useState<State>(defaultState);
  const [initialized, setInitialized] = useReducer(() => true, false);
  const cachedData = useCachedData();

  useEffect(() => {
    if (cachedData) {
      setState({
        ...defaultState,
        todaysAnime: cachedData.data[getTodaysAnimeIndex()],
      });
      setInitialized();
    }
  }, [cachedData]);

  const addUserGuessIndex = (guess: number) => {
    setState((prevState) => ({
      ...prevState,
      userGuesses: [guess, ...prevState.userGuesses],
    }));
  };

  return {
    state,
    initialized,
    addUserGuessIndex,
  };
};
