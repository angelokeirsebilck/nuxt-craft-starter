export const useGetFieldName = (typeName: string): string => {
  return typeName.replace("Field_", "");
};
