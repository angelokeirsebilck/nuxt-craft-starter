interface IField {
  [key: string]: string | number | any;
}

export const useGetValidationMessages = (field: IField): object => {
  const { t } = useI18n();

  let validationObject = {};

  if (field.required) {
    validationObject = {
      required: field.errorMessage,
      ...validationObject,
    };
  }

  if (field.typeName.replace("Field_", "") == "Email") {
    validationObject = {
      email: "Dit veld moet een email zijn.",
      ...validationObject,
    };
  }

  // if (field.typeName.replace("Field_", "") == "Phone")
  //   validationObject = {
  //     matches: "Dit veld moet een telefoon nummer zijn",
  //     ...validationObject
  //   };

  if (field.typeName.replace("Field_", "") == "Agree") {
    if ("required" in validationObject) delete validationObject.required;
    validationObject = {
      accepted: t("form.required"),
      ...validationObject,
    };
  }
  return validationObject;
};
