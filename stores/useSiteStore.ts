import type { ConfigSite } from "~~/config/sites";
import type { Localized } from "~~/types/craft";
import { skipHydrate } from "pinia";

export const useSiteStore = defineStore("site", () => {
  const currentSite: Ref<ConfigSite | null> = ref(null);
  const localized: Ref<Localized[]> = ref([]);

  function setCurrentsite(newCurrentSite: ConfigSite) {
    currentSite.value = newCurrentSite;
  }

  function setLocalized(newLocalized: Localized[]) {
    localized.value = newLocalized;
  }

  return {
    currentSite: skipHydrate(currentSite),
    setCurrentsite,
    localized: skipHydrate(localized),
    setLocalized,
  };
});
