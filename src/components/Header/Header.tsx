import { BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";
import "./Header.scss";

export const Header = (): JSX.Element => {
  return (
    <div className="app-header">
      <h1 className="app-header__heading">WEEBLE</h1>
      <p>Made by Piotr Pomierski</p>
      <div className="flex app-header__icons">
        <a target="_blank" href="https://github.com/Pomierski">
          <BiLogoGithub />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/piotr-pomierski-5078781b1/"
        >
          <BiLogoLinkedinSquare />
        </a>
      </div>
    </div>
  );
};
