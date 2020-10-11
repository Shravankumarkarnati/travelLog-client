import React from "react";
import "./sideSection.scss";
import SideHeader from "./sideHeader";
// import SideFooter from "./sideFooter";

interface sideSectionProps {}

const SideSection: React.FC<sideSectionProps> = () => {
  return (
    <div className="sideSection">
      <SideHeader />
      {/* <SideBody /> */}
      {/* <SideFooter></SideFooter> */}
    </div>
  );
};
export default SideSection;
