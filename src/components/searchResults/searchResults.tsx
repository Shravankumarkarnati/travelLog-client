import React, { useContext } from "react";
import { AppContext } from "../../utils/context";
import Loader from "./../loader/loader";
import "./searchResults.scss";

interface searchResultsProps {}

const SearchResults: React.FC<searchResultsProps> = () => {
  const { search, addLog, changeContext, ...context } = useContext(AppContext);
  return (
    <div className="searchResults">
      {search?.loading ? (
        <Loader />
      ) : (
        <div className="searchResults-results">
          {search?.results &&
            search?.results.result.map((cur: any, index: number) => {
              return (
                <div
                  className="result"
                  key={index}
                  onClick={() => {
                    changeContext!({
                      search,
                      focused: null,
                      addLog: {
                        cord: [
                          cur.geometry.coordinates[0],
                          cur.geometry.coordinates[1],
                        ],
                        suggest: [],
                        title: cur.place_name,
                      },
                      ...context,
                    });
                  }}
                  onMouseEnter={() => {
                    changeContext!({
                      ...context,
                      search,
                      addLog: addLog,
                      focused: [
                        cur.geometry.coordinates[0],
                        cur.geometry.coordinates[1],
                      ],
                    });
                  }}
                  onMouseLeave={() => {
                    changeContext!({
                      ...context,
                      search,
                      addLog: addLog,
                      focused: null,
                    });
                  }}
                >
                  <p
                    className="name"
                    data-longitude={cur.geometry.coordinates[0]}
                    data-latitude={cur.geometry.coordinates[1]}
                  >
                    {cur.place_name}
                  </p>
                </div>
              );
            })}
          <div>
            <button
              className="mainBtn"
              onClick={() => {
                changeContext!({
                  ...context,
                  search,
                  addLog: null,
                  focused: null,
                });
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchResults;

// bbox: (4) [-82.6756519919719, 35.4814829831733, -82.4259012603383, 35.6967590199622]
// center: (2) [-82.554, 35.6009]
// context: (2) [{…}, {…}]
// geometry:
// coordinates: (2) [-82.554, 35.6009]
// type: "Point"
// __proto__: Object
// id: "place.2310331354106450"
// place_name: "Asheville, North Carolina, United States"
// place_type: ["place"]
// properties: {wikidata: "Q648501"}
// relevance: 1
// text: "Asheville"
// type: "Feature";
