<script lang="ts" setup>
import type { CraftLinkWrapper } from "~/types/craft";
defineProps<{
  links: CraftLinkWrapper[];
}>();
</script>

<template>
  <div class="">
    <div v-for="link in links">
      <UiCraftLink
        v-if="link.itemLink && link.itemLinkStyle"
        :link="link.itemLink"
        :style="{
          style: useGetCraftLinkStyle(link.itemLinkStyle),
          size: 'md',
        }"
      />
    </div>
  </div>
</template>
