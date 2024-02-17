<script lang="ts" setup>
import type { Home } from "~~/types/craft";

defineProps<{
  entry: Home;
}>();
</script>

<template>
  <BaseContainer>
    <h1>{{ entry.title }}</h1>
  </BaseContainer>
  <BaseContentBuilder
    v-if="entry"
    :content="entry.fieldContentBuilder"
    v-show="entry"
  />
</template>
