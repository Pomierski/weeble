import { motion } from "framer-motion";
import { Data } from "../../data/types";
import { useAppContext } from "../../store/context";
import { compareUnknownNumberValue } from "../../utils/compareNumbers";
import "./ClueBox.scss";

type ClueValue = string | string[] | number | null;

export enum ClueBackgroundColor {
  green = "darkgreen",
  red = "darkred",
  yellow = "#f9a825",
  grey = "#555",
}

interface Props {
  valueKey: string;
  value: ClueValue;
  imageUrl: string;
  backgroundColor: ClueBackgroundColor;
  animationDelay: number;
}

const handleClueValue = (clueValue: ClueValue): React.ReactNode => {
  if (!clueValue) {
    return "?";
  }

  if (Array.isArray(clueValue)) {
    if (clueValue.length === 0) {
      return "?";
    }

    return clueValue.map((value, index) => <p key={index}>{value}</p>);
  }

  return clueValue;
};

const getImageUrl = (imageUrl: string) => `url('${imageUrl}')`; // move to utils

export const ClueBox = ({
  valueKey,
  value,
  imageUrl,
  backgroundColor,
  animationDelay,
}: Props) => {
  const {
    state: { todaysAnime },
  } = useAppContext();
  const isImageBox = value === imageUrl;
  const dataKey = valueKey as keyof Data;
  const dataValue = todaysAnime[dataKey];
  const shouldDisplayArrowUp = compareUnknownNumberValue(dataValue, value);
  const shouldDisplayArrowDown = compareUnknownNumberValue(value, dataValue);
  const isArrowVisible = shouldDisplayArrowUp || shouldDisplayArrowDown

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ delay: animationDelay / 1000 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="clue-box flex align-center justify-center"
      style={{
        backgroundImage: isImageBox ? getImageUrl(imageUrl) : "",
        backgroundColor,
      }}
    >
      {isArrowVisible && (
        <div
          className={"clue-box__arrow".concat(
            shouldDisplayArrowDown ? " clue-box__arrow--down" : ""
          )}
        />
      )}

      {!isImageBox ? handleClueValue(value) : undefined}
    </motion.div>
  );
};
