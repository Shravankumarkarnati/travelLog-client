import React, { useContext } from "react";
import { AppContext } from "../../utils/context";
import AllLogs from "../allLogs/allLogs";
import SearchResults from "../searchResults/searchResults";
import "./sideSection.scss";
import LoginPage from "./../loginPage/loginPage";
import AddLog from "../addLogs/addLog";

interface sideSectionProps {}

const SideSection: React.FC<sideSectionProps> = () => {
  const { search, login, addLog } = useContext(AppContext);
  return (
    <div className="sideSection">
      {login ? (
        <LoginPage />
      ) : search.inputText ? (
        <SearchResults />
      ) : addLog ? (
        <AddLog />
      ) : (
        <AllLogs />
      )}
    </div>
  );
};
export default SideSection;
