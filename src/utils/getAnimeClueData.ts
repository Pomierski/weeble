import { AnimeData, Data } from "../data/types";

export const getAnimeClueData = (data: Data): AnimeData => {
  const {
    episodes,
    genres,
    imageUrl,
    rating,
    releaseYear,
    themes,
    type,
    studios,
  } = { ...data };

  return {
    imageUrl,
    episodes,
    releaseYear,
    type,
    genres,
    rating,
    themes,
    studios,
  };
};
