<script lang="ts" setup>
import type { DefaultBlock } from "~/types/craft";

defineProps<{
  blockData: Extract<
    DefaultBlock["itemDefaultColumns"][0]["itemColumn"][0],
    {
      __typename: "itemColumn_typeLinks_BlockType";
    }
  >;
}>();
</script>

<template>
  <UiCraftLinks
    v-if="blockData.itemLinks && blockData.itemLinks.length > 0"
    :links="blockData.itemLinks"
  />
</template>
