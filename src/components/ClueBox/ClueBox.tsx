import { motion } from "framer-motion";
import { Data } from "../../data/types";
import { useAppContext } from "../../store/context";
import "./ClueBox.scss";

type ClueValue = string | string[] | number;

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

const handleClueValue = (clueValue: ClueValue) => {
  if (!clueValue) {
    return "?";
  }

  if (Array.isArray(clueValue)) {
    if (clueValue.length === 0) {
      return "?";
    }

    return clueValue.map((value, index) => <p key={index}>{value}</p>);
  }

  if (typeof clueValue === "number" && clueValue < 1900) {
    if (clueValue > 12 && clueValue < 24) {
      return "12+";
    }

    if (clueValue > 24) {
      return "24+";
    }

    return clueValue;
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
  const shouldDisplayArrowUp =
    // todo: remove any
    typeof todaysAnime[dataKey] === "number" &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (todaysAnime as any)[dataKey] > value;
  const shouldDisplayArrowDown =
    typeof todaysAnime[dataKey] === "number" &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (todaysAnime as any)[dataKey] < value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ delay: animationDelay / 1000 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="clue-box"
      style={{
        backgroundImage: isImageBox ? getImageUrl(imageUrl) : "",
        backgroundColor,
      }}
    >
      {(shouldDisplayArrowUp || shouldDisplayArrowDown) && (
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
