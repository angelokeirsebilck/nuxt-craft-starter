<script setup lang="ts">
import type { TextBlock } from "~~/types/craft";

defineProps<{
  blockData: TextBlock;
}>();
</script>

<template>
  <BaseContainer>
    <div v-for="column in blockData.itemColumns">
      <h2 v-if="column.itemTitle">
        {{ column.itemTitle }}
      </h2>
      <div class="" v-if="column.itemText" v-html="column.itemText" />
      <UiCraftLinks
        v-if="column.itemLinks.length > 0"
        :links="column.itemLinks"
      />
    </div>
  </BaseContainer>
</template>
