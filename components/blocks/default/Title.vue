<script lang="ts" setup>
import type { DefaultBlock } from "~/types/craft";

defineProps<{
  blockData: Extract<
    DefaultBlock["itemDefaultColumns"][0]["itemColumn"][0],
    {
      __typename: "itemColumn_typeTitle_BlockType";
    }
  >;
}>();
</script>

<template>
  <div>
    <div v-if="blockData.itemTitleTop" v-html="blockData.itemTitleTop" />
    <h2 v-if="blockData.itemTitle" v-html="blockData.itemTitle" />
  </div>
</template>
