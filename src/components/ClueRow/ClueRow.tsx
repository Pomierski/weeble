import { AnimeData, Data } from "../../data/types";
import { useAppContext } from "../../store/context";
import { getAnimeClueData } from "../../utils/getAnimeClueData";
import { ClueBackgroundColor, ClueBox } from "../ClueBox/ClueBox";

interface Props {
  data: Data;
}

export const ClueRow = ({ data }: Props) => {
  const {
    state: { todaysAnime },
  } = useAppContext();

  const handleValueBackground = (key: keyof AnimeData, value: unknown) => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return ClueBackgroundColor.grey;
      }
      const todaysAnimeValue = todaysAnime[key] as unknown[];
      const todaysAnimeSimilarity = todaysAnimeValue.filter((answerValue) =>
        value.includes(answerValue),
      );
      const isExact = todaysAnimeSimilarity.length === todaysAnimeValue.length;
      const isWrong = todaysAnimeSimilarity.length === 0;
      const isNotExact =
        todaysAnimeSimilarity.length !== todaysAnimeValue.length &&
        todaysAnimeSimilarity.length !== 0;

      if (isExact) {
        return ClueBackgroundColor.green;
      }

      if (isWrong) {
        return ClueBackgroundColor.red;
      }

      if (isNotExact) {
        return ClueBackgroundColor.yellow;
      }
    }

    if (value !== todaysAnime[key]) {
      return ClueBackgroundColor.red;
    }

    if (value === todaysAnime[key]) {
      return ClueBackgroundColor.green;
    }

    return ClueBackgroundColor.yellow;
  };

  const clue = getAnimeClueData(data);

  return Object.entries(clue).map(([key, value], index) => {
    const imageUrl = clue["imageUrl"];

    return (
      <ClueBox
        imageUrl={imageUrl}
        value={value}
        valueKey={key}
        backgroundColor={handleValueBackground(key as keyof AnimeData, value)}
        animationDelay={index * 250}
        key={key}
      />
    );
  });
};
