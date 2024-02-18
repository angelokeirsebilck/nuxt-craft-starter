<script lang="ts" setup>
interface IProps {
  fieldData: any;
}
const props = defineProps<IProps>();
</script>

<template>
  <FormKit type="textarea" rows="6" />
</template>
