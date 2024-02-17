<script lang="ts" setup>
import type { DefaultBlock } from "~/types/craft";

const craftStore = useCraftStore();
const { globalCompanyInfo } = storeToRefs(craftStore);

defineProps<{
  blockData: Extract<
    DefaultBlock["itemDefaultColumns"][0]["itemColumn"][0],
    {
      __typename: "itemColumn_typeContactInfo_BlockType";
    }
  >;
}>();
</script>

<template>
  <BaseContactInfo />
</template>
