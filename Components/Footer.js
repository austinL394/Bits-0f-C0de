import { SiTwitter, SiGithub, SiInstagram } from "react-icons/si";
import { FiLinkedin } from "react-icons/fi";

/**
 * @description Creates a footer section with copyright information and social media
 * links. It gets the current year and displays it along with the name "Bits-Of-C0de"
 * and a Twitter handle. The footer is then rendered with flexbox layout and uses
 * various icons for social media platforms.
 * 
 * @returns {JSX.Element} A React component that represents an HTML footer element
 * with a complex structure containing multiple child elements and nested tags.
 */
function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="absolute w-full -bottom-0">
      <div className="bg-indigo-600 dark:bg-indigo-900">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-50 text-sm text-center sm:text-left">
            © {year} Bits-Of-C0de —
            <a
              href="https://twitter.com/austinL394"
              rel="noopener noreferrer"
              className="text-gray-50 ml-1"
              target="_blank"
            >
              @Soumyajit
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a
              className="text-gray-50"
              href="https://twitter.com/austinL394"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiTwitter />
            </a>
            <a
              className="ml-4 text-gray-50"
              href="https://github.com/austinL394"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiGithub />
            </a>
            <a
              className="ml-4 text-gray-50"
              href="https://www.instagram.com/austinL394/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiInstagram />
            </a>
            <a
              className="ml-4 text-gray-50"
              href="https://www.linkedin.com/in/austinL394/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FiLinkedin />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
