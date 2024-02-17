type GetUri = {
  matchingSite: object | null | undefined;
  uri: string | string[];
  locale: string;
  path: string;
};

export const useGetUri = (params: GetUri) => {
  const { matchingSite, uri, locale, path } = params;
  let _uri: string;

  if (matchingSite) {
    if (uri.length > 0) {
      _uri = [...uri].join("/");
    } else {
      _uri = [""].join("/");
    }
  }

  if (!matchingSite) {
    if (uri.length > 0) {
      _uri = [locale, ...uri].join("/");
    } else {
      _uri = [locale].join("/");
    }
  }

  _uri = path.endsWith("/") ? _uri.slice(0, -1) : _uri;

  return _uri || "__home__";
};
