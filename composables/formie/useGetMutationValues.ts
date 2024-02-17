import { useGetFormFieldMeta } from "@/composables/formie/usetGetFormFieldMeta";
import { flatMap } from "lodash-es";

export const useGetMutationValues = (form: any) => {
  const values = flatMap(useGetFormFieldMeta(form), "handle").map((key) => {
    return `${key}: $${key}`;
  });

  // Add in any captcha tokens generated when we queried the form.
  form.captchas.forEach((captcha: any) => {
    values.push(`${captcha.handle}: $${captcha.handle}`);
  });

  return values.join(", ");
};
