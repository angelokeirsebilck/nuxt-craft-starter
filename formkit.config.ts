import { nl, en, de, fr } from "@formkit/i18n";
import { defineFormKitConfig } from "@formkit/vue";

export default defineFormKitConfig(() => {
  return {
    locales: { nl, en, de, fr },
    locale: "nl",
  };
});
