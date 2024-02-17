interface ICondition {
  id: string;
  field: string;
  condition: string;
  value: string;
}

interface IFormData {
  [key: string]: string | number;
}

export const useGetConditionalValue = (field: any, formData: IFormData) => {
  if (field.enableConditions == false) return true;

  const object = JSON.parse(field.conditions);
  if (object?.conditions.length == 0) return true;

  const checks: [] = object.conditions.map((condition: ICondition) => {
    return checkCondition(condition, formData);
  });

  const result = allAreTrue(checks);

  return object.showRule == "show" ? result : !result;
};

const allAreTrue = (arr: []): boolean => {
  return arr.every((element) => element === true);
};

const parseFieldHandle = (field: string): string => {
  return field.replace("{", "").replace("}", "");
};

const checkCondition = (condition: ICondition, formData: IFormData) => {
  if (condition.field == "") return undefined;
  const fieldHandle = parseFieldHandle(condition.field);

  if (formData[fieldHandle] == undefined) return undefined;

  switch (condition.condition) {
    case "=":
      if (condition.value == formData[fieldHandle]) return true;
      return false;
    case "!=":
      if (condition.value != formData[fieldHandle]) return true;
      return false;
    case "contains":
      const valueToCheck = formData[fieldHandle];
      if (
        typeof valueToCheck == "string" &&
        valueToCheck.includes(condition.value)
      )
        return true;
      return false;
    case "startsWith":
      if (formData[fieldHandle].startsWith(condition.value)) return true;
      return false;
    case "endsWith":
      if (formData[fieldHandle].endsWith(condition.value)) return true;
      return false;
    case ">":
      if (parseFloat(formData[fieldHandle]) > parseFloat(condition.value))
        return true;
      return false;
    case "<":
      if (parseFloat(formData[fieldHandle]) < parseFloat(condition.value))
        return true;
      return false;
  }
};
