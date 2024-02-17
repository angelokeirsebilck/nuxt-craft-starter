import { flatMap } from "lodash-es";

export const useGetFormFieldMeta = (form: any) => {
  const allRows = flatMap(form.pages, "rows");
  const allFields = flatMap(allRows, "rowFields");

  const fields = flatMap(allFields, ({ handle, inputTypeName }) => {
    return { handle, inputTypeName };
  });

  return fields;
};
