import { memo } from "react";
import GitHubIcon from "../../assets/img/github-icon.png";
import LinkedInIcon from "../../assets/img/linkedin-icon.png";

const Footer = (): JSX.Element => (
  <div className="footer" data-testid="footer">
    <div className="footer__text">Developed by Pedro Guia</div>
    <div className="footer__icons">
      <a
        href="https://github.com/pedroguia"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        aria-label="github link"
      >
        <img src={GitHubIcon} alt="github icon" />
      </a>
      <a
        href="https://www.linkedin.com/in/pedroguia/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        aria-label="linkedin link"
      >
        <img src={LinkedInIcon} alt="linkedin icon" />
      </a>
    </div>
  </div>
);

export default memo(Footer);
