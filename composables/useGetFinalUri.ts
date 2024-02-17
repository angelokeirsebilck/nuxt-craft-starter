import type { Localized } from "~~/types/craft";

export const useGetFinalUri = (localized: Localized) => {
  const primateSite = useGetPrimarySiteData();
  if (localized.uri == "__home__") {
    if (localized.siteId == primateSite?.siteId) return `/`;

    return `/${localized.language}`;
  }

  if (localized.siteId == primateSite?.siteId) return `/${localized.uri}`;

  return `/${localized.language}/${localized.uri}`;
};
