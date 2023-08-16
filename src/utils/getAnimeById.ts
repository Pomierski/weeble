import { Data } from "../data/types";

export const getAnimeById = (data: Data[], id: number): Data | undefined => {
  const animeData = data.find((anime) => anime.id === id);

  return animeData;
};
