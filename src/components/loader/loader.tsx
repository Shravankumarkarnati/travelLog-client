import React, { useState, useEffect } from "react";
import { FiMap } from "react-icons/fi";
import "./loader.scss";

const Loader = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(active > 4 ? 0 : active + 1);
    }, 250);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="loaderContainer">
      <div className="svgContainer">
        <FiMap />
      </div>
      <div className="loader">
        <span className={active === 0 ? "dots active" : "dots"}></span>
        <span className={active === 1 ? "dots active" : "dots"}></span>
        <span className={active === 2 ? "dots active" : "dots"}></span>
        <span className={active === 3 ? "dots active" : "dots"}></span>
        <span className={active === 4 ? "dots active" : "dots"}></span>
      </div>
    </div>
  );
};

export default Loader;
