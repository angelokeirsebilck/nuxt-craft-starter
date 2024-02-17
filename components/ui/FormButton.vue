<script setup lang="ts">
defineProps<{
  style: ButtonParams;
  loading?: boolean;
}>();
</script>
<template>
  <div :class="useGetButtonStyle(style)">
    <slot name="label" />
  </div>
</template>
