<script setup lang="ts">
import type { NewsOverviewBlock } from "~~/types/craft";

const { t } = useI18n();

const siteStore = useSiteStore();
const { currentSite } = storeToRefs(siteStore);
const craftStore = useCraftStore();
const { allNewsPages } = storeToRefs(craftStore);

defineProps<{
  blockData: NewsOverviewBlock;
}>();

const postDate = (postDateString: any) => {
  const postDate = new Date(postDateString);

  return `${postDate.getDate()} ${t(
    `global.months.${postDate.getMonth() + 1}`
  )} ${postDate.getFullYear()}`;
};
</script>

<template>
  <BaseContainer>
    <div v-for="newsItem in allNewsPages">
      <NuxtLink :to="`${currentSite?.urlPrefix}/${newsItem.uri}`" class="">
        <NuxtPicture
          v-if="
            newsItem.fieldThumbnail[0].__typename == 'images_Asset' &&
            newsItem.fieldThumbnail[0].url
          "
          format="avif, webp"
          height="289"
          :src="newsItem.fieldThumbnail[0].url"
        />
        <div class="">
          {{ newsItem.title }}
        </div>
        <div v-if="newsItem.postDate">
          {{ postDate(newsItem.postDate) }}
        </div>
      </NuxtLink>
    </div>
  </BaseContainer>
</template>
