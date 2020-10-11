import React, { useContext } from "react";
import "./navbar.scss";
import { RiMapFill } from "react-icons/ri";
import { AppContext } from "../../utils/context";

interface navbarProps {}

const Navbar: React.FC<navbarProps> = ({}) => {
  const { token } = useContext(AppContext);
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
      <div className="user">{token ? <p>Logged In</p> : <p>Login</p>}</div>
    </nav>
  );
};
export default Navbar;
