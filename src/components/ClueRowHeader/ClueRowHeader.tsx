import { useAppContext } from "../../store/context";
import { getAnimeClueData } from "../../utils/getAnimeClueData";
import { splitOnUppercase } from "../../utils/splitOnUppercase";
import "./ClueRowHeader.scss";

export const ClueRowHeader = () => {
  const {
    state: { todaysAnime },
  } = useAppContext();
  const keys = Object.keys(getAnimeClueData(todaysAnime)).map((key) =>
    key === "imageUrl" ? "Anime" : key,
  );

  return keys.map((key) => (
    <div className="clue-row-header__item" key={key}>
      {splitOnUppercase(key)}
    </div>
  ));
};
