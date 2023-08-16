import { useEffect, useState } from "react";
import { LocalStorageData, readCachedData } from "../data/cache/cacheData";

export const useCachedData = () => {
  const [state, setState] = useState<LocalStorageData>();

  useEffect(() => {
    const loadData = async () => {
      const data = await readCachedData();
      setState(data);
    };

    void loadData();
  }, []);

  return state;
};
