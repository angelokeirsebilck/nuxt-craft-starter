import { configSites, type ConfigSite } from "~/config/sites";

export const useGetSiteDataFromLocale = (locale: string) => {
  return configSites.find((site: ConfigSite) => site.locale === locale);
};
