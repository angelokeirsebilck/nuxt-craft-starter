interface IField {
  [key: string]: string | number | any;
}

export const usetGetDefaultValue = (field: IField) => {
  if (
    (field.defaultValue == null || field.defaultValue == "") &&
    !field.options
  )
    return null;

  switch (useGetFieldName(field.typeName)) {
    case "SingleLineText":
      return field.defaultValue;
    case "Email":
      return field.defaultValue;
    case "Agree":
      return true;
    case "Checkboxes":
      return field.options.map((option: any) => {
        if (option.isDefault) return option.value;
      });
    case "Radio":
      const defaultOption = field.options.filter((option: any) => {
        if (option.isDefault) return true;
      });
      return defaultOption[0]?.value || null;
  }
};
