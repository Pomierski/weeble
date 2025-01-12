import { AnimeData, Data } from "../../data/types";
import { useAppContext } from "../../store/context";
import { SliceRange } from "../../types/sliceRange";
import { getAnimeClueData } from "../../utils/getAnimeClueData";
import { getIsArrayEqual } from "../../utils/getIsArrayEqual";
import { ClueBackgroundColor, ClueBox } from "../ClueBox/ClueBox";

interface Props {
  data: Data;
  sliceRange?: SliceRange;
}

export const ClueRow = ({ data, sliceRange = [0, undefined] }: Props) => {
  const {
    state: { todaysAnime },
  } = useAppContext();

  const handleArrayValueBackground = (
    key: keyof AnimeData,
    clueValue: unknown[]
  ) => {
    if (clueValue.length === 0) {
      return ClueBackgroundColor.grey;
    }

    const todaysAnimeValue = todaysAnime[key] as unknown[];
    const todaysAnimeSimilarity = todaysAnimeValue.filter((answerValue) =>
      clueValue.includes(answerValue)
    );

    const isExact = getIsArrayEqual(todaysAnimeValue, clueValue);
    const isWrong = todaysAnimeSimilarity.length === 0;
    const isSimilar = !isWrong && !isExact

    if (isExact) {
      return ClueBackgroundColor.green;
    }

    if (isWrong) {
      return ClueBackgroundColor.red;
    }

    if (isSimilar) {
      return ClueBackgroundColor.yellow;
    }

    return ClueBackgroundColor.grey;
  };

  const handleValueBackground = (key: keyof AnimeData, value: unknown) => {
    if (Array.isArray(value)) {
      return handleArrayValueBackground(key, value);
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

  return (
    <>
      {Object.entries(clue).slice(...sliceRange).map(([key, value], index) => {
        const imageUrl = clue["imageUrl"];
        const clueValue = value as AnimeData[keyof AnimeData];

        return (
          <ClueBox
            imageUrl={imageUrl}
            value={clueValue}
            valueKey={key}
            backgroundColor={handleValueBackground(
              key as keyof AnimeData,
              value
            )}
            animationDelay={index * 250}
            key={key}
          />
        );
      })}
    </>
  );
};
