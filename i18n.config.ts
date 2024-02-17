import { nl, en } from "@/translations";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "nl",
  messages: {
    en,
    nl,
  },
}));
