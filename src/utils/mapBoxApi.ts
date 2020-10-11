import axios from "axios";

export type ICordinatesArray = [number, number];

export const getResultsWithText = async (text: string) => {
  const results = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      text
    )}.json?access_token=${process.env.REACT_APP_MAPBOXACCESSKEY}&country=US,CA`
  );
  return results.data.features;
};

export const getAddressWithCord = async (cor: ICordinatesArray) => {
  const place = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${cor[0]},${cor[1]}.json?access_token=${process.env.REACT_APP_MAPBOXACCESSKEY}`
  );
  const data = place.data.features;
  data.forEach((cur: any) => {
    cur.id = cur.id.split(".")[0];
  });
  return data;
};
