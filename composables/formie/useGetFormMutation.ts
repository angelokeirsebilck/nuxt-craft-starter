import { useGetMutationTypes } from "@/composables/formie/useGetMutationTypes";
import { useGetMutationHandle } from "@/composables/formie/useGetMutationHandle";
import { useGetMutationValues } from "@/composables/formie/useGetMutationValues";

export const useGetFormMutation = (form: any) => {
  const mutationTypes = useGetMutationTypes(form);
  const mutationHandle = useGetMutationHandle(form.handle);
  const mutationValues = useGetMutationValues(form);

  return `
        mutation saveSubmission(${mutationTypes}) {
            ${mutationHandle}(${mutationValues}) {
                id
            }
        }
    `;
};
