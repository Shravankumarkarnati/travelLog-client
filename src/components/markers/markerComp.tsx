import React, { useContext } from "react";
import { FaMapPin } from "react-icons/fa";
import { Marker } from "react-map-gl";
import { AppContext } from "../../utils/context";
import "./markerComp.scss";

const MarkerComp = () => {
  const { focused, logs, changeContext, ...context } = useContext(AppContext);
  return (
    <div className="markers">
      {focused ? (
        <Marker
          className="marker focused"
          longitude={focused[0]}
          latitude={focused[1]}
        >
          <div className="svg-container">
            <FaMapPin />
          </div>
        </Marker>
      ) : null}

      {logs.map((cur: any, index: number) => (
        <Marker
          className="marker"
          key={index}
          longitude={cur.location.coordinates[0]}
          latitude={cur.location.coordinates[1]}
        >
          <div className="svg-container">
            <FaMapPin />
          </div>
        </Marker>
      ))}
    </div>
  );
};

export default MarkerComp;
