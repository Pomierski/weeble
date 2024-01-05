import { BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";
import "./Header.scss";

export const Header = (): JSX.Element => {
  return (
    <div className="app-header padding-top-xl">
      <h1 className="app-header__heading">WEEBLE</h1>
      <p>Made by Piotr Pomierski</p>
      <div className="flex justify-center align-center app-header__icons">
        <a
          target="_blank"
          href="https://github.com/Pomierski"
          aria-label="Github profile"
        >
          <BiLogoGithub />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/piotr-pomierski-5078781b1/"
          aria-label="Linkedin profile"
        >
          <BiLogoLinkedinSquare />
        </a>
      </div>
    </div>
  );
};
