import React, { useContext } from "react";
import { AppContext } from "../../utils/context";
import AllLogs from "../allLogs/allLogs";
import SearchResults from "../searchResults/searchResults";
import "./sideSection.scss";
import LoginPage from "./../loginPage/loginPage";

interface sideSectionProps {}

const SideSection: React.FC<sideSectionProps> = () => {
  const { search, login } = useContext(AppContext);
  return (
    <div className="sideSection">
      {login ? (
        <LoginPage />
      ) : search.inputText ? (
        <SearchResults />
      ) : (
        <AllLogs />
      )}
    </div>
  );
};
export default SideSection;
