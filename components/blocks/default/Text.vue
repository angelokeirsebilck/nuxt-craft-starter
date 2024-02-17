<script lang="ts" setup>
import type { DefaultBlock } from "~/types/craft";

defineProps<{
  blockData: Extract<
    DefaultBlock["itemDefaultColumns"][0]["itemColumn"][0],
    {
      __typename: "itemColumn_typeText_BlockType";
    }
  >;
}>();
</script>

<template>
  <div v-html="blockData.itemText" />
</template>
