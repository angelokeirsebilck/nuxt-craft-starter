export type ConfigSite = {
  handle: string;
  siteId: number;
  locale: string;
  language: string;
  urlPrefix?: string;
  icon?: string;
  urlParameterTrailingSlash?: string;
  primary: boolean;
};

export const configSites: ConfigSite[] = [
  {
    handle: "default",
    siteId: 1,
    locale: "en",
    language: "English",
    icon: "gb",
    urlPrefix: "/en",
    primary: false,
  },
  {
    handle: "nl",
    siteId: 4,
    locale: "nl",
    language: "Nederlands",
    urlPrefix: "",
    primary: true,
  },
  {
    handle: "fr",
    siteId: 2,
    locale: "fr",
    language: "Français",
    urlPrefix: "/fr",
    primary: false,
  },
  {
    handle: "de",
    siteId: 3,
    locale: "de",
    language: "Deutsch",
    urlPrefix: "/de",
    primary: false,
  },
];
