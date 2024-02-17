import { skipHydrate } from "pinia";
import type {
  CompanyInfo,
  FooterNav,
  GlobalGeneral,
  MainNav,
} from "~/types/craft";

export const useCraftStore = defineStore("craft", () => {
  const siteStore = useSiteStore();
  const { currentSite } = storeToRefs(siteStore);

  const mainNav: Ref<MainNav | null> = ref(null);
  const footerNav: Ref<FooterNav | null> = ref(null);

  const globalCompanyInfo: Ref<CompanyInfo | null> = ref(null);
  const globalGeneral: Ref<GlobalGeneral | null> = ref(null);

  async function loadMainNav() {
    const { data: mainNavData, error: mainNavError } = await useAsyncData(
      `mainNav`,
      () =>
        GqlMainNav({
          siteId: currentSite.value?.siteId,
        })
    );

    if (mainNavError.value == null) {
      if (mainNavData.value && mainNavData.value.navigationNodes) {
        mainNav.value = mainNavData.value.navigationNodes;
      }
    }
  }

  async function loadFooterNav() {
    const { data: footerNavData, error: footerNavError } = await useAsyncData(
      `footerNav`,
      () =>
        GqlFooterNav({
          siteId: currentSite.value?.siteId,
        })
    );

    if (footerNavError.value == null) {
      if (footerNavData.value && footerNavData.value.navigationNodes) {
        footerNav.value = footerNavData.value.navigationNodes;
      }
    }
  }

  async function loadGlobalCompanyInfo() {
    const {
      data: globalGeneralCompInfoData,
      error: globalGeneralCompInfoError,
    } = await useAsyncData(`globalCompanyInfo`, () =>
      GqlGlobalCompanyInfo({
        siteId: currentSite.value?.siteId,
      })
    );

    if (globalGeneralCompInfoData.value != null) {
      if (globalGeneralCompInfoData.value.globalCompanyInfoEntries) {
        globalCompanyInfo.value = globalGeneralCompInfoData.value
          .globalCompanyInfoEntries[0] as CompanyInfo;
      }
    }
  }

  async function loadGlobalGeneral() {
    const { data: globalGeneralData, error: globalGeneralError } =
      await useAsyncData(`globalGeneral`, () =>
        GqlGlobalGeneral({
          siteId: currentSite.value?.siteId,
        })
      );

    if (globalGeneralData.value != null) {
      if (globalGeneralData.value.globalGeneralEntries) {
        globalGeneral.value = globalGeneralData.value
          .globalGeneralEntries[0] as GlobalGeneral;
      }
    }
  }

  watch(currentSite, () => {
    loadCraftData();
  });

  const loadCraftData = () => {
    Promise.all([
      loadMainNav(),
      loadFooterNav(),
      loadGlobalCompanyInfo(),
      loadGlobalGeneral(),
    ]);
  };

  return {
    loadCraftData,
    mainNav: skipHydrate(mainNav),
    footerNav: skipHydrate(footerNav),
    globalCompanyInfo,
    globalGeneral,
  };
});
