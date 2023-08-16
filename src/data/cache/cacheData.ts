import { Data, SearchBoxEntries } from "../types";

const LOCAL_STORAGE_KEY = "weeble.data";

export type LocalStorageData = {
  data: Data[];
  searchBoxEntries: SearchBoxEntries[];
  updated: string;
};

const getDataToCache = async (): Promise<LocalStorageData> => {
  const { default: searchBoxEntries } = await import(
    "../searchBoxEntries.json"
  );
  const { default: data } = await import("../fullData.json");
  return {
    data,
    searchBoxEntries,
    updated: new Date().toUTCString(),
  };
};

export const cacheData = async (
  storageData?: LocalStorageData,
  overwrite?: boolean,
) => {
  const data = storageData || (await getDataToCache());

  if (localStorage.getItem(LOCAL_STORAGE_KEY) && !overwrite) {
    return;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const readCachedData = async (): Promise<LocalStorageData> => {
  const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (cachedData) {
    return JSON.parse(cachedData) as LocalStorageData;
  }

  const dataToCache = await getDataToCache();

  void cacheData(dataToCache);

  return dataToCache;
};
