import React, { useContext, useState } from "react";
import "./app.scss";
import Maps from "./components/maps/maps";
import SideSection from "./components/sideSection/sideSection";
import { AppContext, IAppContext } from "./utils/context";
import Navbar from "./components/navbar/navbar";

function App() {
  const context = useContext(AppContext);
  const changeContext = (newContext: IAppContext) => {
    setState(newContext);
  };
  const [state, setState] = useState(context);
  return (
    <div className="App">
      <AppContext.Provider value={{ ...state, changeContext }}>
        <Navbar />
        <div className="App-container">
          <Maps />
          <SideSection />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
