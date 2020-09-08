import * as nodeCache from "node-cache";

import logger from "./logging";
import axiosInstance from "./axios";

const cache = new nodeCache({ stdTTL: 60 * 60, checkperiod: 60 });

const fetchCtftimeUpcoming = async (): Promise<any | null> => {
  return await axiosInstance
    .get("https://ctftime.org/api/v1/events/?limit=10")
    .then((response) => {
      return response.data ? response.data : null;
    })
    .catch((err) => {
      logger.warn(`Unable to fetch data from CTFTime API. Axios error: \n${err}`);
      return null;
    });
};

const updateCTFTimeCache = async (oldCache?: any): Promise<any | void> => {
  const newCache = (await fetchCtftimeUpcoming()) || oldCache || null;

  if (!newCache && !oldCache) {
    logger.warn(
      "CTFTime API returned no data. Old cache doesn't exist. Setting cache to null"
    );
    cache.set("ctfTime", null);
  } else if (!newCache && oldCache) {
    logger.warn("CTFTime API returned no data. Setting cache to old value");
    cache.set("ctfTime", oldCache);
  } else {
    cache.set("ctfTime", newCache);
    logger.info(
      `Updated cache. Got CTFs:${newCache
        .map((ctf) => `\n - ${ctf.title}`)
        .join("")}`
    );
  }
  return newCache ? newCache : oldCache;
};

const initCache = async (): Promise<void> => {
  await updateCTFTimeCache();
  cache.on("expired", async (key, value) => {
    await cacheExpired(key, value);
  });
};

const cacheExpired = async (key: string, value: any): Promise<void> => {
  logger.warn("Cache item expired, updating");
  if (key === "ctfTime") {
    const newCtftimeCache = await updateCTFTimeCache();
    if (!newCtftimeCache) {
      logger.warn("CTFTime API returned no data. Using old cache");
      cache.set("ctfTime", value);
    }
  }
};

export { cache, updateCTFTimeCache, initCache };
