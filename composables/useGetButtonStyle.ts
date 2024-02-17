import { cva } from "class-variance-authority";

declare global {
  type ButtonParams = {
    style: "default" | "special";
    size?: "md" | "sm";
  };
}

const buttonStyle = cva("btn", {
  variants: {
    style: {
      default: "btn-default",
      special: "btn-special",
    },

    size: {
      md: "btn-md",
      sm: "btn-sm",
    },
  },
  defaultVariants: {},
});
const useGetButtonStyle = (params: ButtonParams): string => {
  return buttonStyle(params);
};

export default useGetButtonStyle;
