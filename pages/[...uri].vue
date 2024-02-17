<script setup lang="ts">
import type { PageInfo } from "@/composables/useResolvePageComponent";
import type { Localized, Entry } from "~~/types/craft";
const route = useRoute();

const siteStore = useSiteStore();
const { currentSite } = storeToRefs(siteStore);
const { setLocalized, setCurrentsite } = siteStore;

const matchingSite = useGetCurrentSiteData(route.fullPath as string);
const primarySite = useGetPrimarySiteData();
const finalSite = matchingSite ? matchingSite : primarySite;

if (!finalSite)
  throw createError({
    statusCode: 500,
    message: "No matching site found",
  });

setCurrentsite(finalSite);

if (!currentSite.value) {
  throw createError({
    statusCode: 500,
    message: "No matching site found",
  });
}

const {
  params: { uri },
} = route;

// Check if we are on homepage or not
// finalUri will be uri from url or __home__ (craft special index uri)
//@ts-expect-error
const finalUri = uri.length > 0 ? uri.join("/") : "__home__";

let pageInfo: Entry | null = null;

const {
  token,
  "x-craft-preview": xCraftPreview,
  "x-craft-live-preview": xCraftLivePreview,
} = route.query;

if (token && xCraftPreview) {
  useGqlHeaders({ "X-Craft-Token": `${token}` }, "craft");
  useGqlHeaders({ "x-craft-live-preview": `${xCraftPreview}` }, "craft");
}

if (token && xCraftLivePreview) {
  useGqlHeaders({ "X-Craft-Token": `${token}` }, "craft");
  useGqlHeaders({ "x-craft-live-preview": `${xCraftLivePreview}` }, "craft");
}

if (!currentSite)
  throw createError({
    statusCode: 500,
    message: "No currentSite id found",
  });

const { data: entryData, error: entryError } = await useAsyncGql("entry", {
  uri: finalUri,
  siteId: currentSite.value?.siteId,
});

// no uri/entry found -> throw 404
if (entryData.value?.entry == null) {
  throw createError({
    message: "This is not the page you're looking for.",
    name: "Not Found",
    fatal: true,
    statusCode: 404,
  });
}

pageInfo = entryData.value?.entry as Entry;

if (!pageInfo.sectionHandle || !pageInfo.typeHandle) {
  throw createError({
    message: "No graphql query set for this section and/or type.",
    name: "Query not found",
    fatal: true,
    statusCode: 500,
  });
}

const pageResolveInfo = computed<PageInfo | null>(() => {
  if (pageInfo) {
    return {
      sectionHandle: pageInfo.sectionHandle,
      typeHandle: pageInfo.typeHandle,
    };
  }

  return null;
});

if (pageInfo && pageInfo.localized)
  setLocalized(pageInfo.localized as Localized[]);

if (pageInfo) {
  const parsedSEO = parseSeoMatic(pageInfo.seo);

  useHeadSafe({
    title: parsedSEO.title,
    meta: parsedSEO.meta,
    link: parsedSEO.links,
  });
}
</script>

<template>
  <component
    v-if="pageResolveInfo"
    :is="useResolvePageComponent(pageResolveInfo)"
    :entry="pageInfo"
  ></component>
</template>
