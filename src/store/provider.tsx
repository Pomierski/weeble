import { createContext, PropsWithChildren } from "react";
import { Store, useStore } from "./store";

export const AppContext = createContext<Store | undefined>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const store = useStore();

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
