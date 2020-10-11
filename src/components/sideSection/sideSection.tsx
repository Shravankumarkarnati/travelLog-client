import React, { useContext } from "react";
import { AppContext } from "../../utils/context";
import SearchResults from "../searchResults/searchResults";
import "./sideSection.scss";

interface sideSectionProps {}

const SideSection: React.FC<sideSectionProps> = () => {
  const { search } = useContext(AppContext);
  return (
    <div className="sideSection">
      {search.inputText ? <SearchResults /> : <p>Logs</p>}
    </div>
  );
};
export default SideSection;
