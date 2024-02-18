<script lang="ts" setup>
interface IProps {
  fieldData: any;
}
const props = defineProps<IProps>();
</script>

<template>
  <FormKit type="checkbox">
    <template #label>
      <div v-html="props.fieldData.descriptionHtml"></div>
    </template>
  </FormKit>
</template>
