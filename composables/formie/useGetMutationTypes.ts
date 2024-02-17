import { useGetFormFieldMeta } from "@/composables/formie/usetGetFormFieldMeta";

export const useGetMutationTypes = (form: any) => {
  const types = useGetFormFieldMeta(form).map(({ handle, inputTypeName }) => {
    return `$${handle}: ${inputTypeName}`;
  });

  // Add in any captcha tokens generated when we queried the form.
  form.captchas.forEach((captcha: any) => {
    types.push(`$${captcha.handle}: FormieCaptchaInput`);
  });

  return types.join(", ");
};
