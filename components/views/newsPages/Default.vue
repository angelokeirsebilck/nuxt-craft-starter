<script lang="ts" setup>
import type { NewsPagesDefault } from "~~/types/craft";

const siteStore = useSiteStore();
const { currentSite } = storeToRefs(siteStore);

const craftStore = useCraftStore();
const { newsEntryUri } = storeToRefs(craftStore);

const props = defineProps<{
  entry: NewsPagesDefault;
}>();

let postDate: Ref<Date | undefined> = ref();

onMounted(() => {
  if (props.entry.postDate) {
    //@ts-expect-error
    postDate.value = new Date(props.entry.postDate);
  }
});
</script>

<template>
  <div class="">
    <BaseContainer>
      <h1>{{ entry.title }}</h1>
      <NuxtLink :to="`${currentSite?.urlPrefix}/${newsEntryUri}`">
        <UiButton
          :style="{
            style: 'default',
            size: 'md',
          }"
          :label="$t('global.newsOverview')"
        />
      </NuxtLink>
    </BaseContainer>
    <BaseContainer>
      <div v-if="postDate">
        {{ postDate.getDate() }}
        {{ $t(`global.months.${postDate.getMonth() + 1}`) }}
        {{ postDate.getFullYear() }}
      </div>
      <div
        v-if="
          entry.fieldImage[0].__typename == 'images_Asset' &&
          entry.fieldImage[0].url
        "
      >
        <NuxtPicture
          format="avif, webp"
          height="580"
          :src="entry.fieldImage[0].url"
        />
      </div>
    </BaseContainer>

    <BaseContentBuilder
      v-if="entry"
      :content="entry.fieldContentBuilder"
      v-show="entry"
    />
  </div>
</template>
