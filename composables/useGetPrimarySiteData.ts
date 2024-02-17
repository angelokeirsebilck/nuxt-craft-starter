import { configSites, type ConfigSite } from "~/config/sites";

export const useGetPrimarySiteData = () => {
  return configSites.find((site: ConfigSite) => site.primary == true);
};
