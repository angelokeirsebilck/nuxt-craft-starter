import { isPlainObject, isArray } from "lodash-es";
import { useGetFormFieldMeta } from "@/composables/formie/usetGetFormFieldMeta";

interface IFormData {
  [key: string]: string | number | any;
}

export const usetGetMutationVariables = async (
  form: any,
  object: IFormData
) => {
  let returnObject: any[] = [];

  // Get the mutation types to ensure we cast everything properly
  const mutationTypes = useGetFormFieldMeta(form);

  for (let index = 0; index < mutationTypes.length; index++) {
    const inputTypeName = mutationTypes[index]["inputTypeName"];
    const handle = mutationTypes[index]["handle"];

    let value = object[handle];

    if (typeof value === "undefined") {
      continue;
    }

    if (value === null) {
      continue;
    }

    // Fix up any objects that look like arrays
    if (isPlainObject(value)) {
      if (typeof value[0] !== "undefined") {
        value = Object.values(value);
      }
    }

    if (inputTypeName === "Int") {
      value = parseInt(object[handle], 10);
    }

    if (inputTypeName === "[Int]") {
      if (isPlainObject(value)) {
        value = Object.values(value);
      }
      if (isArray(value)) {
        value = value.map((item: any) => {
          return parseInt(item, 10);
        });
      }

      if (!isArray(value)) {
        value = parseInt(value, 10);
      }
    }

    if (inputTypeName === "Number") {
      value = Number(object[handle]);
    }

    if (inputTypeName === "[Number]") {
      if (isPlainObject(value)) {
        value = Object.values(value);
      }

      value = value.map((item: any) => {
        return Number(item);
      });
    }

    if (inputTypeName === "String") {
      value = object[handle].toString();
    }

    if (inputTypeName === "[String]") {
      if (isPlainObject(value)) {
        value = Object.values(value);
      }
      value = value.filter((item: any) => item !== undefined);
    }

    if (inputTypeName === "[FileUploadInput]") {
      value = await Promise.all(
        value.map((f: any) => {
          return readAsDataURL(f.file);
        })
      );
    }

    returnObject[handle] = value;
  }

  // Add in any captcha tokens generated when we queried the form.
  form.captchas.forEach((captcha: any) => {
    returnObject[captcha.handle] = {
      name: captcha.name,
      value: captcha.value,
    };
  });

  return returnObject;
};

function readAsDataURL(file: any) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      return resolve({
        fileData: fileReader.result,
        filename: file.name,
      });
    };
    fileReader.readAsDataURL(file);
  });
}
