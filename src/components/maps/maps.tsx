import React, { useContext, useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./maps.scss";
import { AppContext } from "../../utils/context";
import { getAddressWithCord } from "../../utils/mapBoxApi";

interface mapsProps {}

interface IviewPort {
  width: string;
  flexGrow: number;
  height: string;
  longitude: number;
  latitude: number;
  zoom: number;
}

const Maps: React.FC<mapsProps> = ({ children }) => {
  const { flyTo, addLog, changeContext, ...context } = useContext(AppContext);
  const [viewport, setViewPort] = useState<IviewPort>({
    width: "100%",
    flexGrow: 1,
    height: "100%",
    longitude: -98.35,
    latitude: 39.5,
    zoom: 4,
  });

  const _dbClick = async (e: any) => {
    const cord = e.lngLat;
    const suggest = await getAddressWithCord(cord);
    changeContext!({
      flyTo,
      addLog: {
        cord,
        suggest: suggest.map((cur: any) => cur.place_name),
      },
      ...context,
    });
  };
  useEffect(() => {
    if (flyTo) {
      setViewPort({
        ...viewport,
        longitude: flyTo.longitude,
        latitude: flyTo.latitude,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyTo]);

  return (
    <div className="maps">
      <ReactMapGL
        className="mapBox"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOXACCESSKEY}
        {...viewport}
        mapStyle="mapbox://styles/the-mutant/ckeu37zzz9mur19mgz2fda2dz"
        onViewportChange={(nextViewport: any) => {
          setViewPort(nextViewport);
        }}
        onDblClick={_dbClick}
      >
        {children}
      </ReactMapGL>
    </div>
  );
};
export default Maps;
