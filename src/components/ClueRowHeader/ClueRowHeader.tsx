import { useAppContext } from "../../store/context";
import { SliceRange } from "../../types/sliceRange";
import { getAnimeClueData } from "../../utils/getAnimeClueData";
import { splitOnUppercase } from "../../utils/splitOnUppercase";
import "./ClueRowHeader.scss";

interface Props {
  sliceRange?: SliceRange;
}

export const ClueRowHeader = ({ sliceRange = [0, undefined] }: Props) => {
  const {
    state: { todaysAnime },
  } = useAppContext();
  const keys = Object.keys(getAnimeClueData(todaysAnime)).map((key) =>
    key === "imageUrl" ? "Anime" : key
  );

  return (
    <>
      {keys.slice(...sliceRange).map((key) => (
        <div className="clue-row-header__item" key={key}>
          {splitOnUppercase(key)}
        </div>
      ))}
    </>
  );
};
