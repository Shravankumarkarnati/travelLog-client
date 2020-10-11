import React, { useContext } from "react";
import { AppContext } from "../../utils/context";
import { GoPerson } from "react-icons/go";

interface sideHeaderProps {}

const SideHeader: React.FC<sideHeaderProps> = () => {
  const { changeContext, ...context } = useContext(AppContext);
  return (
    <div className="header">
      <div
        className="floater"
        title="Login"
        // onClick={floaterClicked}
      >
        <GoPerson title="Login" />
      </div>
    </div>
  );
};
export default SideHeader;
