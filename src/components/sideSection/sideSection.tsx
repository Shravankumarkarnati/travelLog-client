import React, { useContext } from "react";
import { AppContext } from "../../utils/context";
import AllLogs from "../allLogs/allLogs";
import SearchResults from "../searchResults/searchResults";
import "./sideSection.scss";
import LoginPage from "./../loginPage/loginPage";
import AddLog from "../addLogs/addLog";
import CurrentLog from "../currentLog/currentLog";

interface sideSectionProps {}

const SideSection: React.FC<sideSectionProps> = () => {
  const { search, login, addLog, currentLog } = useContext(AppContext);
  return (
    <div className="sideSection">
      {login ? (
        <LoginPage />
      ) : addLog ? (
        <AddLog />
      ) : search.inputText?.length > 0 ? (
        <SearchResults />
      ) : currentLog ? (
        <CurrentLog />
      ) : (
        <AllLogs />
      )}
    </div>
  );
};
export default SideSection;
