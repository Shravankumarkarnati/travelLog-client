import React, { FormEvent, useContext, useState } from "react";
import { AppContext } from "../../utils/context";
import { createLog } from "./../../utils/travelLogApi";
import "./addLog.scss";

interface addLogProps {}

const AddLog: React.FC<addLogProps> = () => {
  const { token, addLog, search, changeContext, ...context } = useContext(
    AppContext
  );
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState("");
  const [log, setLog] = useState({
    title: addLog?.title || null,
    description: "",
    rating: 1,
    visitedDate: new Date().toISOString().slice(0, 10),
    location: { type: "Point", coordinates: addLog!.cord } as any,
  });

  const handleValueSet = (key: any, value: any) => {
    setLog({
      ...log,
      [key]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    setSubmitting(true);
    e.preventDefault();
    const date = log.visitedDate.split("-");
    const newDate = `${date[1]}/${date[2]}/${date[0]}`;
    log.visitedDate = newDate;
    console.log(log, "log");
    const res = await createLog(token!, log as any);
    console.log(res, "fin");
    setSubmitting(false);
    if (res.data.error) {
      setFailed(res.data.error);
    } else {
      changeContext!({
        token,
        addLog: null,
        search: {
          inputText: "",
          loading: false,
          results: null,
        },
        ...context,
      });
    }
  };

  return (
    <div className="addLog">
      {log.title === null ? (
        <div className="addLog-suggest">
          {addLog?.suggest.map((cur, index) => (
            <p onClick={() => handleValueSet("title", cur)} key={index}>
              {cur}
            </p>
          ))}
          <p onClick={() => handleValueSet("title", "")}>Custom</p>
        </div>
      ) : (
        <form className="addLog-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="item">
            <label htmlFor="title"> Title</label>
            <input
              type="text"
              value={log.title || ""}
              onChange={(e) => handleValueSet("title", e.target.value)}
              required={true}
            />
          </div>
          <div className="item">
            <label htmlFor="description"> description</label>
            <input
              type="text"
              value={log.description}
              onChange={(e) => handleValueSet("description", e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="rating"> rating</label>
            <input
              type="number"
              value={log.rating}
              onChange={(e) =>
                handleValueSet("rating", parseInt(e.target.value))
              }
            />
          </div>
          <div className="item">
            <label htmlFor="visitedDate"> Visited Date</label>
            <input
              type="date"
              value={log.visitedDate}
              onChange={(e) => handleValueSet("visitedDate", e.target.value)}
              required={true}
            />
          </div>
          <button className="mainBtn" type="submit" disabled={submitting}>
            Save Log
          </button>
          <p className="errorMessage">{failed.length > 0 ? failed : null}</p>
        </form>
      )}

      <div className="btnContainer">
        <button
          className="mainBtn"
          onClick={() => {
            changeContext!({
              token,
              search: {
                inputText: "",
                loading: false,
                results: null,
              },
              addLog: null,
              ...context,
            });
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
};
export default AddLog;
