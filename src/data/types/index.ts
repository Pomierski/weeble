export interface Data {
  id: number;
  imageUrl: string;
  titles: string[];
  type: string;
  episodes: number | null;
  releaseYear: number | null;
  rating: string;
  genres: string[];
  themes: string[];
  studios: string[];
  synopsis: string;
}

export interface SearchBoxEntries {
  label: string;
  value: number;
}

export interface AnimeData {
  imageUrl: string;
  type: string;
  episodes: number | null;
  releaseYear: number | null;
  rating: string;
  genres: string[];
  themes: string[];
  studios: string[];
}
