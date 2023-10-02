import { BiAlignLeft, BiImageAlt } from "react-icons/bi";
import { useAppContext } from "../../store/context";

import { Hint } from "../Hint/Hint";
import "./SearchBoxHints.scss";

export const SearchBoxHints = (): JSX.Element => {
  const {
    state: { todaysAnime, userGuesses },
  } = useAppContext();

  const synopsisHintId = "synopsis-hint";
  const imageHintId = "image-hint";

  return (
    <div className="search-box-hints">
      <Hint
        content={todaysAnime.synopsis}
        icon={<BiAlignLeft />}
        id={synopsisHintId}
        tries={userGuesses.length}
        triesToUnlock={5}
        label="Synopsis hint"
      />
      <Hint
        imageUrl={todaysAnime.imageUrl}
        icon={<BiImageAlt />}
        id={imageHintId}
        tries={userGuesses.length}
        triesToUnlock={10}
        label="Image hint"
      />
    </div>
  );
};
