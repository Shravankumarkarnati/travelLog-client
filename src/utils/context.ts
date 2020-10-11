import { createContext } from "react";

export interface IAppContext {
  changeContext?: (newContext: IAppContext) => void;
  flyTo: { longitude: number; latitude: number } | null;
  token: string|null;
}

export const AppContext = createContext<IAppContext>({
  flyTo: null,
  token:null
});
