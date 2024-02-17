<script lang="ts" setup>
defineProps<{
  style: ButtonParams;
  label: string;
}>();
</script>

<template>
  <div :class="useGetButtonStyle(style)">
    {{ label }}
  </div>
</template>

<style scoped>
.btn {
  cursor: pointer;
  width: fit-content;
  &:hover {
    background: transparent;
  }
}

.btn-md {
  padding: 2rem;
}

.btn-sm {
  padding: 1rem;
}

.btn-default {
  background: red;
}

.btn-special {
  background: green;
}
</style>
