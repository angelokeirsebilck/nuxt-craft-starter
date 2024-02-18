<script lang="ts" setup>
import type { DefaultBlock } from "~/types/craft";

defineProps<{
  blockData: Extract<
    DefaultBlock["itemDefaultColumns"][0]["itemColumn"][0],
    {
      __typename: "itemColumn_typeForm_BlockType";
    }
  >;
}>();
</script>

<template>
  <FormieForm
    v-if="blockData.itemForm && blockData.itemForm"
    :form="blockData.itemForm"
  />
</template>
