import React, { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { RiMapFill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { AppContext } from "../../utils/context";
import useDebouncedSearch from "./../../utils/useDebouncedSearch.hook";
import { getResultsWithText } from "../../utils/mapBoxApi";
import { logout, refreshToken } from "./../../utils/travelLogApi";

interface navbarProps {}

const Navbar: React.FC<navbarProps> = () => {
  const { token, username, changeContext, ...context } = useContext(AppContext);
  const [usernameText, setUsernameText] = useState("");

  useEffect(() => {
    (async () => {
      const response = await refreshToken();
      if (response.data.success) {
        const { token, username } = response.data;
        setUsernameText(username);
        changeContext!({
          ...context,
          token,
          username,
        });
      }
    })();
  }, []);
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
        loading,
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
          <button
            title={username}
            className="mainBtn special"
            onMouseOver={() => setUsernameText("Logout")}
            onMouseLeave={() => setUsernameText(username)}
            onClick={async () => {
              await logout();
              changeContext!({
                token: null,
                username: null,
                ...context,
              });
            }}
          >
            {usernameText.length > 6 && usernameText !== "Logout"
              ? `${usernameText.slice(0, 4)}...`
              : usernameText}
          </button>
        ) : (
          <button
            className={context.login ? "mainBtn hide" : "mainBtn"}
            onClick={() => {
              changeContext!({
                ...context,
                token,
                username,
                login: true,
              });
            }}
          >
            LogIn
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
