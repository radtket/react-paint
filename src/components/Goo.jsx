import React from "react";

const Goo = () => {
  return (
    <svg
      style={{ position: "absolute", top: "-100%", left: "-100%" }}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            result="goo"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
          />
          <feBlend in="SourceGraphic" in2="goo" result="mix" />
        </filter>
      </defs>
    </svg>
  );
};

export default Goo;
