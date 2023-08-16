import { PropsWithChildren } from "react";
import "./CluesWrapper.scss";

export const CluesWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  return <div className="clues-wrapper">{children}</div>;
};
