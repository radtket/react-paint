import React from "react";
import classNames from "classnames";

const Intro = ({ init, isReady }) => {
  return (
    <header className={classNames("intro", { hidden: isReady })}>
      <div className="intro__content">
        <h1>Magic Painter</h1>
        <button className="blob-btn" onClick={init} type="button">
          <span className="blob-text">Start painting</span>
          <span className="blob-btn__inner">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob" />
              <span className="blob-btn__blob" />
              <span className="blob-btn__blob" />
              <span className="blob-btn__blob" />
            </span>
          </span>
        </button>
        <p>
          Created by <strong>Adrian Bece</strong>
        </p>
        <p>
          <a
            href="https://codeadrian.hashnode.dev/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Hashnode
          </a>{" "}
          |
          <a
            href="https://twitter.com/AdrianBeceDev"
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitter
          </a>{" "}
          |
          <a
            href="https://www.buymeacoffee.com/ubnZ8GgDJ"
            rel="noopener noreferrer"
            target="_blank"
          >
            Support my work
          </a>
          |
          <a
            href="https://codeadrian.github.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            Personal website
          </a>
        </p>
      </div>
    </header>
  );
};

export default Intro;
