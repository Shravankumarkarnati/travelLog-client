import { createContext } from "react";

export interface cords {
  longitude: number;
  latitude: number;
}

export interface IAppContext {
  changeContext?: (newContext: IAppContext) => void;
  flyTo: { longitude: number; latitude: number } | null;
  token: string | null;
  username: string | null;
  search: {
    inputText: string;
    results: any;
  };
  focused?: cords | null;
  selected?: null | cords;
  logs?: any[];
  login: Boolean;
  addLog: {
    cord: cords;
    suggest: string[];
  } | null;
}

export const AppContext = createContext<IAppContext>({
  flyTo: null,
  token: null,
  username: null,
  search: {
    inputText: "",
    results: null,
  },
  login: false,
  addLog: null,
});
