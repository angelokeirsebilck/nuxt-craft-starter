<script setup lang="ts">
import { toPlainObject } from "lodash-es";
import { load } from "recaptcha-v3";
import { FormKitMessages } from "@formkit/vue";
import { reset } from "@formkit/core";
import type { DefaultBlock } from "~~/types/craft";
import { useSiteStore } from "@/stores/useSiteStore";
import type { FormieCaptchas, FormieForm } from "@/types/formie";
const { t } = useI18n();

interface IProps {
  form: Extract<
    DefaultBlock["itemDefaultColumns"][0]["itemColumn"][0],
    {
      __typename: "itemColumn_typeForm_BlockType";
    }
  >["itemForm"];
  showDefaultButton?: boolean;
}

interface IFormData {
  [key: string]: string | number;
}
const config = useRuntimeConfig();

const props = withDefaults(defineProps<IProps>(), {
  showDefaultButton: true,
});

const siteStore = useSiteStore();

const formData = ref({});

const formState = reactive({
  submitted: false,
  showErrors: false,
  isSubmitting: false,
});

const customErrorMessage: Ref<string | null> = ref(null);

// Add element if it does not yet exist
function upsert(array: FormieCaptchas[], element: FormieForm) {
  const i = array.findIndex((el) => {
    return el.handle === element.handle;
  });

  if (i > -1) {
    array[i] = element;
  } else {
    array.push(element);
  }
}

const submitHandler = async (formData: IFormData) => {
  formState.isSubmitting = true;
  formState.submitted = false;
  customErrorMessage.value = null;

  if (
    props.form &&
    props.form[0].captchas &&
    props.form[0].captchas.length > 0
  ) {
    for (let index = 0; index < props.form[0].captchas.length; index++) {
      const captcha = props.form[0].captchas[index];
      if (captcha && captcha.handle == "recaptchaCaptcha") {
        const recaptcha = await load(config.public.recaptcha_site_key);
        const token = await recaptcha.execute();

        if (token) {
          if (props.form[0]) {
            // Only add recpatchaToken if it does not yet exist
            //@ts-expect-error
            upsert(form.value?.form.captchas, {
              handle: "recaptchaCaptcha",
              //@ts-expect-error
              name: "g-recaptcha-response",
              value: token,
            });
          }
        }
      }
    }
  }
  if (props.form && props.form[0]) {
    const formMutation = useGetFormMutation(props.form[0]);
    const formVariables = await usetGetMutationVariables(
      props.form[0],
      formData
    );

    try {
      const { data: mutationData, error } = await useFetch(
        "/api/craft/formieMutation",
        {
          method: "POST",
          body: {
            query: formMutation,
            variables: toPlainObject(formVariables),
          },
        }
      );

      formState.showErrors = false;
      formState.isSubmitting = false;

      if (error.value !== null) {
        customErrorMessage.value = t("form.customErrorMessage");
        return;
      }
      if (
        mutationData.value.result &&
        mutationData.value.result.errors &&
        mutationData.value.result.errors.length > 0
      ) {
        customErrorMessage.value = t("form.customErrorMessage");
        return;
      }

      formState.submitted = true;

      reset(`form${props.form[0].id}`, {});

      if (settings.value?.submitAction == "entry") {
        //@ts-expect-error
        const { uri, siteId } = settings.value.redirectEntry;
        if (uri && siteId) {
          if (siteId == siteStore.currentSite?.siteId) {
            await navigateTo(`/${uri}`);
          } else {
            await navigateTo(`/${siteStore.currentSite?.locale}/${uri}`);
          }
        }
      }

      if (settings.value?.submitAction == "url") {
        if (settings.value.submitActionTab == "same-tab") {
          await navigateTo(`${settings.value.redirectUrl}`, {
            external: true,
          });
        } else {
          window.open(`${settings.value.redirectUrl}`, "_blank");
        }
      }
    } catch (error) {
      formState.isSubmitting = false;
      console.log(error);
    }
  }
};

const invalidHandler = () => {
  formState.showErrors = true;
  formState.submitted = false;
};

const settings = computed(() => {
  if (props.form) return props.form[0].settings;
});

const errorMessageTop = computed(() => {
  if (settings.value?.errorMessagePosition == "bottom-form") return false;
  return true;
});

const successMessageTop = computed(() => {
  if (settings.value?.submitActionMessagePosition == "bottom-form")
    return false;
  return true;
});

const validationVisibility = computed(() => {
  if (settings.value?.validationOnFocus) return "blur";
  return "submit";
});
</script>

<template>
  <div v-if="form && form[0]">
    <UiAlert
      :auto-close="5"
      intent="danger"
      v-if="customErrorMessage !== null"
      >{{ customErrorMessage }}</UiAlert
    >
    <UiAlert
      :auto-close="false"
      intent="danger"
      v-if="formState.showErrors && errorMessageTop && form && form[0]"
      >{{ form[0].settings?.errorMessageHtml }}</UiAlert
    >
    <UiAlert
      intent="success"
      :auto-close="settings?.submitActionMessageTimeout"
      v-if="
        formState.submitted &&
        successMessageTop &&
        form &&
        form[0] &&
        form[0].settings?.submitAction == 'message'
      "
      >{{ form[0].settings?.submitActionMessageHtml }}
    </UiAlert>
    <FormKit
      type="form"
      :id="`form${form[0].id}`"
      :form-class="{
        hidden:
          formState.submitted &&
          form &&
          form[0] &&
          form[0].settings?.submitActionFormHide,
      }"
      @submit-invalid="invalidHandler"
      @submit="submitHandler"
      :actions="false"
      v-model="formData"
      :incomplete-message="false"
      :config="{ validationVisibility }"
    >
      <FormKitMessages />
      <FormiePage
        :showDefaultButton="showDefaultButton"
        :isSubmitting="formState.isSubmitting"
        :settings="form[0].settings"
        :formData="formData"
        :pageData="page"
        :key="pageIndex"
        v-for="(page, pageIndex) in form[0].pages"
      />
    </FormKit>
    <UiAlert
      :auto-close="false"
      intent="danger"
      v-if="formState.showErrors && !errorMessageTop && form && form[0]"
      >{{ form[0].settings?.errorMessageHtml }}</UiAlert
    >
    <UiAlert
      intent="success"
      :auto-close="
        form && form[0] && form[0].settings?.submitActionMessageTimeout
      "
      v-if="
        formState.submitted &&
        !successMessageTop &&
        form &&
        form[0] &&
        form[0].settings?.submitAction == 'message'
      "
      >{{ form[0].settings?.submitActionMessageHtml }}
    </UiAlert>
  </div>
</template>
