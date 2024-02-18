<script lang="ts" setup>
interface IProps {
  fieldData: any;
}

const props = defineProps<IProps>();

const displayType = computed(() => {
  switch (props.fieldData.displayType) {
    case "dropdown":
      return "FormieUiDropdown";
    case "radio":
      return "FormieUiRadio";
    default:
      return "FormieUiCheckboxes";
  }
});

const options = computed(() => {
  return props.fieldData.entries.map((option: any) => {
    return {
      label: option.title,
      value: option.id,
    };
  });
});
</script>

<template>
  <component :fieldData="fieldData" :is="displayType" :options="options">
  </component>
</template>
