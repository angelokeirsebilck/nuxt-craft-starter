import type { FormieField } from "@/types/formie";

export const useGetValidationValue = (field: FormieField): string => {
  let validationString = "";

  if (field && field.required) validationString += "required";

  if (field && field.__typename.replace("Field_", "") == "Email")
    validationString += "|email";

  // if (field.typeName.replace("Field_", "") == "Phone")
  //   validationString +=
  //     "|matches:/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/";

  if (
    field &&
    field.__typename.replace("Field_", "") == "Agree" &&
    field.required
  ) {
    validationString += "|accepted";

    validationString = validationString.replace("required|", "");
  }

  return validationString;
};
