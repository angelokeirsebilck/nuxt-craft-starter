<script setup lang="ts">
import { useSiteStore } from "@/stores/useSiteStore";
const siteStore = useSiteStore();
const { localized } = storeToRefs(siteStore);

const langSwitcherHandler = (siteId: number) => {
  const selectedSite = useGetSiteDataFromId(siteId);
  if (selectedSite) siteStore.setCurrentsite(selectedSite);
};
</script>

<template>
  <div>
    <ul class="list">
      <li v-for="link in localized" @click="langSwitcherHandler(link.siteId)">
        <NuxtLink :to="useGetFinalUri(link)">
          {{ link.language }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list {
  list-style-type: none;
  display: flex;
}
</style>
