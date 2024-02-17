<script lang="ts" setup>
import type { CraftImage } from "~/types/craft";

const props = defineProps<{
  image: CraftImage;
  sizes: string;
  height?: string;
}>();
</script>

<template>
  <NuxtPicture
    format="avif, webp"
    :sizes="sizes"
    :height="height"
    :src="image.url"
  />
</template>
