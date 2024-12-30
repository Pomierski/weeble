import { ClueRowHeader } from "../ClueRowHeader/ClueRowHeader";
import { ClueRow } from "../ClueRow/ClueRow";
import { Data } from "../../data/types";

import "./CluesWrapper.scss";

interface Props {
  isMobile: boolean;
  data: Data[],
}

export const CluesWrapper = ({ isMobile, data }: Props): JSX.Element => {
  if (isMobile) {
    return <div className="clues-mobile-wrapper">
      {data.map((entry) => entry && (<div className="clues-wrapper margin-bottom-md" key={entry.id}>
        <ClueRowHeader sliceRange={[0, 4]} />
        <ClueRow sliceRange={[0, 4]} data={entry} />
        <ClueRowHeader sliceRange={[4, 8]} />
        <ClueRow sliceRange={[4, 8]} data={entry} />
      </div>))
      }
    </div>
  }

  return <div className="clues-wrapper margin-bottom-xl">
    <ClueRowHeader />
    {data.map((entry) => entry && <ClueRow data={entry} key={entry.id} />)}
  </div>;
};
