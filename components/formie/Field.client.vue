<script lang="ts" setup>
import type { FormieField } from "~~/types/formie";

interface IProps {
  field: FormieField;
  formData: IFormData;
  settings: any;
}

interface IFormData {
  [key: string]: any;
}

const props = defineProps<IProps>();

const showField = computed(() => {
  return useGetConditionalValue(props.field, props.formData);
});

const labelValue = computed(() => {
  if (
    props.field &&
    props.field.labelPosition !== "verbb\\formie\\positions\\Hidden"
  )
    return props.field.label;
  return false;
});

const instructionsAboveInput = computed(() => {
  const [defaultFormInstructionsPosition] =
    props.settings.defaultInstructionsPosition.split("\\").slice(-1);
  if (props.field && props.field.instructionsPosition == null)
    return defaultFormInstructionsPosition;

  if (props.field && props.field.instructionsPosition) {
    const [fieldInstructionPosition] = props.field.instructionsPosition
      .split("\\")
      .slice(-1);
    return fieldInstructionPosition;
  }
});

const extraClasses = computed((): string => {
  let extraClasses = "";
  //@ts-expect-error
  if (props.field && props.field.layout && props.field.layout == "horizontal")
    extraClasses += " layout-horizontal";

  return extraClasses;
});
</script>

<template>
  <div class="group w-full" v-if="field" :class="extraClasses">
    <div
      v-if="
        instructionsAboveInput == 'AboveInput' && field.instructions !== null
      "
    >
      {{ field.instructions }}
    </div>
    <component
      v-if="showField && field.visibility !== 'hidden'"
      :fieldData="field"
      :is="`${field.__typename.replace('Field_', 'FormieUi')}`"
      :id="field.handle"
      :name="field.handle"
      :validation="useGetValidationValue(field)"
      :validation-messages="useGetValidationMessages(field)"
      :value="usetGetDefaultValue(field)"
      :label="labelValue"
      :placeholder="field.placeholder"
      :help="
        instructionsAboveInput == 'BelowInput' && field.instructions !== null
          ? field.instructions
          : null
      "
    ></component>
  </div>
</template>
