import React, { useContext } from "react";
import { AppContext } from "../../utils/context";
import "./allLogs.scss";

interface allLogsProps {}

const AllLogs: React.FC<allLogsProps> = ({}) => {
  const { logs, changeContext, ...context } = useContext(AppContext);
  return (
    <div className="allLogs">
      {logs && logs.length > 0 ? (
        <div className="logs">
          {logs.map((cur: any, index: number) => (
            <div
              className="result"
              key={index}
              onClick={() => {
                changeContext!({
                  ...context,
                  focused: null,
                  selected: {
                    longitude: cur.geometry.coordinates[0],
                    latitude: cur.geometry.coordinates[1],
                  },
                });
              }}
              onMouseEnter={() => {
                changeContext!({
                  ...context,
                  focused: {
                    longitude: cur.geometry.coordinates[0],
                    latitude: cur.geometry.coordinates[1],
                  },
                });
              }}
              onMouseLeave={() => {
                changeContext!({
                  ...context,
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
          ))}
        </div>
      ) : (
        <div className="usageTip">
          {context.token && context.username ? (
            <>
              <p>You currently have no logs.</p>
              <p>
                Double click on the map to select a location or use the search
                bar to find a location and create a log.
              </p>
            </>
          ) : (
            <p>Login or Register to see your Logs</p>
          )}
        </div>
      )}
    </div>
  );
};
export default AllLogs;
