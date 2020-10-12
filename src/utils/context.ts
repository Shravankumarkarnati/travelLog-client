import { createContext } from "react";

export type cords = number[];

export interface IAppContext {
  changeContext?: (newContext: IAppContext) => void;
  token: string | null;
  username: string | null;
  search: {
    inputText: string;
    results: any;
    loading: Boolean;
  };
  focused?: cords | null;
  selected?: null | cords;
  logs: any[];
  login: Boolean;
  addLog: {
    cord: cords;
    suggest: string[];
    title?: null | string;
  } | null;
  currentLog: any;
}

export const AppContext = createContext<IAppContext>({
  token: null,
  username: null,
  search: {
    inputText: "",
    results: null,
    loading: false,
  },
  login: false,
  addLog: null,

  logs: [],
  currentLog: null,
});
