<script lang="ts" setup>
interface IProps {
  fieldData: any;
}

const props = defineProps<IProps>();
</script>

<template>
  <FormKit type="email" />
</template>
