<script setup lang="ts">
import type { SpacingType } from "~/composables/useGetSpacing";
import type { TextBlock } from "~~/types/craft";

const props = defineProps<{
  blockData: TextBlock;
}>();
</script>

<template>
  <BaseBlock
    v-if="
      blockData.itemBgColor &&
      blockData.itemBlockSpacingBottom &&
      blockData.itemBlockSpacingTop
    "
    :bg-color="(blockData.itemBgColor as string)"
    :spacingBottom="(blockData.itemBlockSpacingBottom as SpacingType)"
    :spacingTop="(blockData.itemBlockSpacingTop as SpacingType)"
  >
    <div class="default-grid">
      <div
        class="col-span-full lg:col-span-6"
        v-for="column in blockData.itemColumns"
      >
        <h2 v-if="column.itemTitle">
          <TypoH1Style :text="column.itemTitle" />
        </h2>
        <TypoProse v-if="column.itemText" :text="(column.itemText as string)" />
        <UiCraftLinks
          v-if="column.itemLinks.length > 0"
          :links="column.itemLinks"
        />
      </div>
    </div>
  </BaseBlock>
</template>
