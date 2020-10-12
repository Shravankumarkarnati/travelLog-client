import React, { useContext, useEffect } from "react";
import { AppContext } from "../../utils/context";
import "./allLogs.scss";
import { getLogs } from "./../../utils/travelLogApi";

interface allLogsProps {}

const AllLogs: React.FC<allLogsProps> = () => {
  const { logs, changeContext, ...context } = useContext(AppContext);
  useEffect(() => {
    (async () => {
      if (context.token && context.username) {
        const res = await getLogs(context.token);
        changeContext!({
          ...context,
          logs: res.data,
        });
      }
    })();
  }, [context.username]);

  return (
    <div className="allLogs">
      <div className="allLogs-title">Your Logs</div>
      {logs && logs.length > 0 ? (
        <div className="logs">
          {logs.map((cur: any, index: number) => (
            <div
              className="result"
              key={index}
              data-longitude={cur.location.coordinates[0]}
              data-latitude={cur.location.coordinates[1]}
              onClick={() => {
                changeContext!({
                  ...context,
                  focused: null,
                  logs,
                  selected: {
                    longitude: cur.location.coordinates[0],
                    latitude: cur.location.coordinates[1],
                  },
                });
              }}
              onMouseEnter={() => {
                changeContext!({
                  ...context,
                  logs,
                  focused: {
                    longitude: cur.location.coordinates[0],
                    latitude: cur.location.coordinates[1],
                  },
                });
              }}
              onMouseLeave={() => {
                changeContext!({
                  ...context,
                  logs,
                  focused: null,
                });
              }}
            >
              <p className="title">{cur.title}</p>
              <p className="date">
                {new Date(cur.visitedDate).toLocaleDateString("en-US")}
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

// createdAt: "2020-10-12T01:27:00.492Z"
// description: ""
// location: {coordinates: Array(2), type: "Point"}
// rating: 1
// title: "Effingham, Illinois 62401, United States"
// updatedAt: "2020-10-12T01:27:00.492Z"
// visitedDate: "2020-10-11T04:00:00.000Z"
