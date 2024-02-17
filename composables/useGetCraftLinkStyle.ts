export const useGetLinkStyle = (linkStyle: string) => {
  switch (linkStyle) {
    case "default":
      return "default";
    case "special":
      return "special";
  }
};
