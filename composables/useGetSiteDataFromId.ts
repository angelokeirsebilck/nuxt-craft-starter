import { configSites, type ConfigSite } from "~/config/sites";

export const useGetSiteDataFromId = (id: number) => {
  return configSites.find((site: ConfigSite) => site.siteId === id);
};
