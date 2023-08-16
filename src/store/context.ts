import { useContext } from "react";
import { AppContext } from "./provider";
import { Store } from "./store";

export const useAppContext = () => useContext(AppContext) as Store;
