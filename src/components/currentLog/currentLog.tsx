import React, { FormEvent, useContext, useState } from "react";
import { AppContext } from "../../utils/context";
import { createLog, deleteLog, updateLog } from "./../../utils/travelLogApi";

interface currentLogProps {}

const CurrentLog: React.FC<currentLogProps> = () => {
  const { token, currentLog, changeContext, ...context } = useContext(
    AppContext
  );
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState("");
  const [edit, setEdit] = useState(false);

  const [log, setLog] = useState({
    title: currentLog.title,
    description: currentLog.description,
    rating: currentLog.rating,
    visitedDate: new Date(currentLog.visitedDate).toISOString().slice(0, 10),
    id: currentLog._id,
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
    console.log(log);
    const res = await updateLog(token!, log as any);
    setSubmitting(false);
    if (res.data.error) {
      setFailed(res.data.error);
    } else {
      changeContext!({
        ...context,
        token,
        currentLog: null,
      });
    }
  };

  return (
    <div className="addLog">
      <form className="addLog-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="item">
          <label htmlFor="title"> Title</label>
          <input
            type="text"
            value={log.title || ""}
            onChange={(e) => handleValueSet("title", e.target.value)}
            required={true}
            readOnly={!edit}
          />
        </div>
        <div className="item">
          <label htmlFor="description"> description</label>
          <input
            type="text"
            value={log.description}
            onChange={(e) => handleValueSet("description", e.target.value)}
            readOnly={!edit}
          />
        </div>
        <div className="item">
          <label htmlFor="rating"> rating</label>
          <input
            type="number"
            value={log.rating}
            onChange={(e) => handleValueSet("rating", parseInt(e.target.value))}
            readOnly={!edit}
          />
        </div>
        <div className="item">
          <label htmlFor="visitedDate"> Visited Date</label>
          <input
            type="date"
            value={log.visitedDate}
            onChange={(e) => handleValueSet("visitedDate", e.target.value)}
            required={true}
            readOnly={!edit}
          />
        </div>
        {edit ? (
          <button className="mainBtn" type="submit" disabled={submitting}>
            Update Log
          </button>
        ) : null}
        <p className="errorMessage">{failed.length > 0 ? failed : null}</p>
      </form>

      <div className="btnContainer">
        <button
          className="mainBtn"
          onClick={() => {
            changeContext!({
              ...context,
              token,
              currentLog: null,
            });
          }}
        >
          Back
        </button>
        {edit ? null : (
          <>
            <button
              className="mainBtn"
              onClick={async () => {
                const res = await deleteLog(token!, log.id);
                if (res) {
                  changeContext!({
                    ...context,
                    token,
                    currentLog: null,
                  });
                }
              }}
            >
              Delete Log
            </button>

            <button
              className="mainBtn"
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit Log
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default CurrentLog;
