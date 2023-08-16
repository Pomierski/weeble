import React from "react";
import { BiAlignLeft, BiImageAlt } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { useAppContext } from "../../store/context";
import { stringToId } from "../../utils/stringToId";

import "./SearchBoxHints.scss";

export const SearchBoxHints = (): JSX.Element => {
  const {
    state: { todaysAnime, userGuesses },
  } = useAppContext();

  const synopsisHintId = "synopsis-hint";
  const imageHintId = "image-hint";

  const isSynopsisHintUnlocked = userGuesses.length >= 5;
  const isImageHintUnlocked = userGuesses.length >= 10;

  return (
    <div className="search-box-hints">
      <Tooltip anchorSelect={stringToId(synopsisHintId)}>
        {!isSynopsisHintUnlocked ? (
          `Hint will be unlocked in ${5 - userGuesses.length} tries`
        ) : (
          <div className="search-box-hints__tooltip">
            {todaysAnime.synopsis}
          </div>
        )}
      </Tooltip>
      <Tooltip anchorSelect={stringToId(imageHintId)}>
        {!isImageHintUnlocked ? (
          `Hint will be unlocked in ${10 - userGuesses.length} tries`
        ) : (
          <img
            className="search-box-hints__tooltip-image"
            src={todaysAnime.imageUrl}
          />
        )}
      </Tooltip>
      <div className="search-box-hints__hint" id={synopsisHintId}>
        <BiAlignLeft />
      </div>

      <div className="search-box-hints__hint" id={imageHintId}>
        <BiImageAlt />
      </div>
    </div>
  );
};
