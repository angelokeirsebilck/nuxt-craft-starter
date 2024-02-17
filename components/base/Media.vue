<script lang="ts" setup>
import type { CraftMedia } from "~/types/craft";

defineProps<{
  media: CraftMedia;
  sizes: string;
  height?: string;
}>();
</script>

<template>
  <BaseMediaImage
    v-if="media.__typename == 'images_Asset'"
    :sizes="sizes"
    :image="media"
    :height="height"
  />
  <BaseMediaVideo
    v-if="media.__typename == 'videos_Asset'"
    :sizes="sizes"
    :video="media"
    :height="height"
  />
</template>
