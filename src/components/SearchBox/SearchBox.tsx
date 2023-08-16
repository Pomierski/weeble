import Select from "react-select";

import { useState } from "react";
import Countdown from "react-countdown";
import { SearchBoxEntries } from "../../data/types";
import { useCachedData } from "../../hooks/useCachedData";
import { useHandleUserWin } from "../../hooks/useHandleUserWin";
import { useAppContext } from "../../store/context";
import { getTomorrowsDate } from "../../utils/getTommorowsDate";
import { SearchBoxHints } from "../SearchBoxHints/SearchBoxHints";
import "./SearchBox.scss";

export const SearchBox = () => {
  const [searchBoxData, setSearchBoxData] = useState<SearchBoxEntries[]>([]);
  const {
    state: { todaysAnime, userGuesses },
    addUserGuessIndex,
  } = useAppContext();

  const cachedData = useCachedData();
  const searchBoxEntries = cachedData?.searchBoxEntries;

  const userGuessedRight = userGuesses.includes(todaysAnime.id);
  const { setUserWin, userWon } = useHandleUserWin();

  const handleSelect = (entry: SearchBoxEntries | null) => {
    if (!entry) {
      return;
    }
    addUserGuessIndex(entry.value);

    if (entry.value === todaysAnime.id) {
      setUserWin();
    }
  };

  const handleOnSearchInput = (searchValue: string) => {
    if (!searchBoxEntries) {
      return;
    }

    const input = searchValue.toLowerCase();

    if (!input) {
      setSearchBoxData([]);
      return;
    }

    if (input.length === 1) {
      const trimmedData = searchBoxEntries
        .filter((entry) => entry.label.toLowerCase().startsWith(input))
        .slice(0, 19);

      setSearchBoxData(trimmedData);
      return;
    }

    if (input.length > 1) {
      const trimmedData = searchBoxEntries
        .filter((entry) => entry.label.toLowerCase().startsWith(input))
        .slice(0, 19);

      if (trimmedData.length < 19)
        trimmedData.concat(
          ...searchBoxEntries
            .filter(
              (entry) =>
                !trimmedData.find((el) => el.label === entry.label) &&
                entry.label.toLowerCase().includes(input),
            )
            .slice(0, 19 - trimmedData.length),
        );

      return setSearchBoxData(trimmedData);
    }
  };

  return (
    <div className="search-box">
      {!userWon ? (
        <>
          <h2 className="search-box__header">Guess today's anime</h2>

          <label className="search-box__label">Type any anime to begin</label>

          <div className="search-box__input-wrapper">
            <Select
              isDisabled={userGuessedRight}
              options={searchBoxData}
              isOptionDisabled={(option) =>
                option?.value ? userGuesses.includes(option.value) : false
              }
              isSearchable
              onInputChange={handleOnSearchInput}
              value={null}
              onChange={handleSelect}
              noOptionsMessage={({ inputValue }) =>
                inputValue.length ? "No results" : "Start typing to see results"
              }
            />
          </div>

          <SearchBoxHints />
        </>
      ) : (
        <>
          <h2>YOU GUESSED CORRECTLY!</h2>
          <p>Next anime will be avaliable in</p>
          <Countdown date={getTomorrowsDate()} />
        </>
      )}
    </div>
  );
};
