<script setup lang="ts">
import { useSiteStore } from "~/stores/useSiteStore";
import type { CraftLink } from "~~/types/craft";
const siteStore = useSiteStore();

const { currentSite } = storeToRefs(siteStore);

const props = defineProps<{
  link: CraftLink;
  style: ButtonParams;
}>();

const computedUrl = computed(() => {
  switch (props.link.type) {
    case "entry":
      if (currentSite.value?.primary) return `/${props.link.element?.uri}`;

      return `/${props.link.element?.language}/${props.link.element?.uri}`;
  }

  return props.link.url;
});

const getLabel = (link: CraftLink) => {
  if (link.text == "Learn More") {
    if (link.url) {
      return link.url.replace("mailto:", "").replace("tel:", "") as string;
    }
  }

  return link.text as string;
};
</script>
<template>
  <NuxtLink
    class="fit-content"
    v-if="link.url"
    :external="link.target == '_blank'"
    :to="computedUrl"
    :target="link.target"
  >
    <UiButton :label="getLabel(link)" :style="style" />
  </NuxtLink>
</template>

<style scoped>
.fit-content {
  display: inline-block;
  width: fit-content;
}
</style>
