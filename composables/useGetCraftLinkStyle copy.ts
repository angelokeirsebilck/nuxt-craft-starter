export const useGetCraftLinkStyle = (linkStyle: string) => {
  switch (linkStyle) {
    case "special":
      return "special";
    default:
      return "default";
  }
};
