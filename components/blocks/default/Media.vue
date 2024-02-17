<script lang="ts" setup>
import type { DefaultBlock } from "~/types/craft";

defineProps<{
  blockData: Extract<
    DefaultBlock["itemDefaultColumns"][0]["itemColumn"][0],
    {
      __typename: "itemColumn_typeMedia_BlockType";
    }
  >;
}>();
</script>

<template>
  <BaseMedia sizes="100vw md:960px lg:804px" :media="blockData.itemMedia[0]" />
</template>
