import { skipHydrate } from "pinia";
import type {
  AllNewsPages,
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

  const allNewsPages: Ref<AllNewsPages | undefined> = ref();
  const latestNewsPages: Ref<AllNewsPages | undefined> = ref();
  const newsEntryUri: Ref<string | undefined> = ref();

  const activeNewsPaginationPage: Ref<number> = ref(1);
  const newsPageLimit: Ref<number> = ref(4);
  const totalNewsPagesCount: Ref<number> = ref(0);

  // async function loadMainNav() {
  //   const { data: mainNavData, error: mainNavError } = await useAsyncData(
  //     `mainNav`,
  //     () =>
  //       GqlMainNav({
  //         siteId: currentSite.value?.siteId,
  //       })
  //   );

  //   if (mainNavError.value == null) {
  //     if (mainNavData.value && mainNavData.value.navigationNodes) {
  //       mainNav.value = mainNavData.value.navigationNodes;
  //     }
  //   }
  // }

  const setMainNav = (mainNavValue: MainNav) => {
    mainNav.value = mainNavValue;
  };

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

  async function loadAllNewsPages() {
    const { data: allNewsPagesData, error: allNewsPagesError } =
      await useAsyncData(`allNewsPages`, () =>
        GqlAllNewsPages({
          siteId: currentSite.value?.siteId,
          offset:
            activeNewsPaginationPage.value == 1
              ? 0
              : newsPageLimit.value * (activeNewsPaginationPage.value - 1),
          limit: newsPageLimit.value,
          latestCount: 3,
        })
      );
    if (allNewsPagesData.value != null) {
      if (allNewsPagesData.value.entries)
        setAllNewsPages(allNewsPagesData.value.entries as AllNewsPages);
      if (allNewsPagesData.value.entryCount)
        totalNewsPagesCount.value = allNewsPagesData.value.entryCount?.length;
      if (allNewsPagesData.value.latestNews)
        latestNewsPages.value = allNewsPagesData.value
          .latestNews as AllNewsPages;
    }
  }

  watch(activeNewsPaginationPage, () => {
    loadAllNewsPages();
  });

  const setNewsActivePage = (page: number) => {
    activeNewsPaginationPage.value = page;
  };

  const setAllNewsPages = (newsPages: AllNewsPages) => {
    allNewsPages.value = newsPages;
  };

  async function loadNewsEntry() {
    const { data: newsEntryData, error: newsEntryError } = await useAsyncData(
      `newsEntry`,
      () =>
        GqlNewsEntry({
          siteId: currentSite.value?.siteId,
        })
    );
    if (newsEntryData.value != null) {
      if (
        newsEntryData.value.newsEntries &&
        newsEntryData.value.newsEntries[0]?.uri
      )
        newsEntryUri.value = newsEntryData.value.newsEntries[0]?.uri;
    }
  }

  watch(currentSite, () => {
    loadCraftData();
  });

  const loadCraftData = () => {
    Promise.all([
      // loadMainNav(),
      loadFooterNav(),
      loadGlobalCompanyInfo(),
      loadGlobalGeneral(),
      loadAllNewsPages(),
      loadNewsEntry(),
    ]);
  };

  return {
    loadCraftData,
    mainNav: skipHydrate(mainNav),
    footerNav: skipHydrate(footerNav),
    globalCompanyInfo,
    globalGeneral,
    allNewsPages,
    newsEntryUri,
    totalNewsPagesCount,
    newsPageLimit,
    activeNewsPaginationPage,
    setNewsActivePage,
    latestNewsPages,
    setMainNav,
  };
});
