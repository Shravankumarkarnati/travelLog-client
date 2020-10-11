import React, { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { RiMapFill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { AppContext } from "../../utils/context";
import useDebouncedSearch from "./../../utils/useDebouncedSearch.hook";
import { getResultsWithText } from "../../utils/mapBoxApi";

interface navbarProps {}

const Navbar: React.FC<navbarProps> = ({}) => {
  const { token, username, changeContext, ...context } = useContext(AppContext);
  const useGetSearchResults = () =>
    useDebouncedSearch((text: string) => getResultsWithText(text));

  const { inputText, setInputText, searchResults } = useGetSearchResults();
  const loading = searchResults.loading;
  useEffect(() => {
    changeContext!({
      token,
      username,
      ...context,
      search: {
        ...context.search,
        results: searchResults,
      },
    });
  }, [loading]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="svg">
          <RiMapFill />
        </div>
        <div className="text">
          <span>Travel</span>
          <span>Log</span>
        </div>
      </div>
      <div className="navbar-search">
        <div className="svg">
          <ImSearch />
        </div>
        <input
          className="input"
          placeholder="Search a place"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="navbar-user">
        {token && username ? (
          <button className="mainBtn">{username}</button>
        ) : (
          <button className="mainBtn">LogIn</button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
