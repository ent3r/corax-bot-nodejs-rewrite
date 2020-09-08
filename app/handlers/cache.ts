import * as nodeCache from "node-cache";

import logger from "./logging";
import axiosInstance from "./axios";

const cache = new nodeCache({ stdTTL: 60 * 60, checkperiod: 60 });

const fetchCtftimeUpcoming = async (): Promise<any | void> => {
  return await axiosInstance
    .get("https://ctftime.org/api/v1/events/?limit=10")
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      logger.warn(`Unable to fetch data from CTFTime API.\n${err}`)
    );
};

const updateCTFTimeCache = async (): Promise<any | void> => {
  const newCache = await fetchCtftimeUpcoming();

  if (!newCache) {
    logger.warn("CTFTime API returned no data");
  }

  cache.set("ctfTime", newCache);

  logger.info(
    `Updated cache. Got CTFs:${newCache
      .map((ctf) => `\n - ${ctf.title}`)
      .join("")}`
  );

  return newCache;
};

const initCache = async (): Promise<void> => {
  await updateCTFTimeCache();
  cache.on("expired", async (key, value) => {
    logger.warn("Cache item expired, updating");
    await cacheExpired(key, value);
  });
};

const cacheExpired = async (key: string, value: any): Promise<void> => {
  if (key === "ctfTime") {
    const newCtftimeCache = await updateCTFTimeCache();
    if (!newCtftimeCache) {
      logger.warn("CTFTime API returned no data. Using old cache");
      cache.set("ctfTime", value);
    }
  }
};

export { cache, updateCTFTimeCache, initCache };
