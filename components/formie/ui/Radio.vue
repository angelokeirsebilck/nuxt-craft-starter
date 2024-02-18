<script lang="ts" setup>
interface IProps {
  fieldData: any;
  options?: {
    label: string;
    value: string;
  }[];
}

const props = defineProps<IProps>();
</script>

<template>
  <FormKit
    type="radio"
    :options="props.options || useGetOptions(props.fieldData.options)"
  >
  </FormKit>
</template>
