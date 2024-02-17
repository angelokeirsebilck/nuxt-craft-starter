import { configSites } from "~/config/sites";

export const useGetCurrentSiteData = (uri: string) => {
  const [_, locale] = uri.split("/");

  return configSites.find((site) => site.locale === locale);
};
