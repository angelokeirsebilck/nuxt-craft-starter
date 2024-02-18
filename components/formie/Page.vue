<script setup lang="ts">
import type { FormiePage } from "~~/types/formie";

interface IProps {
  pageData: FormiePage;
  formData: IFormData;
  isSubmitting: boolean;
  settings: any;
  showDefaultButton: boolean;
}

interface IFormData {
  [key: string]: string | number;
}

const props = defineProps<IProps>();

const submitting = computed(() => {
  return props.isSubmitting;
});
</script>

<template>
  <div>
    <div>
      <div
        v-if="pageData && settings"
        :key="rowIndex"
        v-for="(row, rowIndex) in pageData.rows"
      >
        <FormieField
          :settings="settings"
          :formData="formData"
          v-for="(field, fieldIndex) in row?.rowFields"
          :field="field"
          :key="fieldIndex"
        />
      </div>
    </div>
    <FormKit v-if="showDefaultButton" type="submit">
      <UiFormButton
        :style="{
          style: 'default',
          size: 'md',
        }"
        :loading="submitting"
      >
        <template #label>
          <span
            v-if="pageData"
            :class="{
              'opacity-0': submitting,
              hidden: submitting && settings.loadingIndicator == 'text',
            }"
          >
            {{ pageData.settings?.submitButtonLabel }}</span
          >

          <UiLoader
            v-if="submitting && settings.loadingIndicator == 'spinner'"
            color="black"
            :loading="submitting"
          />
          <div
            class=""
            v-if="isSubmitting && settings.loadingIndicator == 'text'"
          >
            {{ settings.loadingIndicatorText }}
          </div>
        </template>
      </UiFormButton>
    </FormKit>
  </div>
</template>

<style scoped>
.opacity-0 {
  opacity: 0;
}
</style>
