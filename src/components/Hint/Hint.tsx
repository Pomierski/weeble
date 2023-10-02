import { ReactNode } from "react";
import { Tooltip } from "react-tooltip";
import { stringToId } from "../../utils/stringToId";
import "./Hint.scss";

interface Props {
  id: string;
  triesToUnlock: number;
  tries: number;
  content?: ReactNode;
  imageUrl?: string;
  icon: ReactNode;
  label?: string;
}

export const Hint = ({
  tries,
  triesToUnlock,
  id,
  content,
  icon,
  imageUrl,
  label,
}: Props) => {
  const isUnlocked = tries >= triesToUnlock;

  return (
    <div className="hint-wrapper">
      <Tooltip anchorSelect={stringToId(id)}>
        {!isUnlocked ? (
          `Hint will be unlocked in ${triesToUnlock - tries} tries`
        ) : (
          <div className="hint__tooltip">
            {imageUrl ? (
              <img className="hint__tooltip-image" src={imageUrl} />
            ) : (
              content
            )}
          </div>
        )}
      </Tooltip>
      <div className={`hint ${isUnlocked ? "hint--unlocked" : ""}`} id={id}>
        {icon}
      </div>
      {label}
    </div>
  );
};
