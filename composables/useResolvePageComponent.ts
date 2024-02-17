export type PageInfo = {
  sectionHandle: string;
  typeHandle: string;
};

import { getCurrentInstance } from "vue";

export const useResolvePageComponent = (params: PageInfo) => {
  const instance = getCurrentInstance();

  const sectionHandle = useFirstLetterUppercase({
    text: params.sectionHandle,
  });
  const typeHandle = useFirstLetterUppercase({
    text: params.typeHandle,
  });
  let compToResolve = `${sectionHandle}${typeHandle}`;

  if (sectionHandle == typeHandle) {
    compToResolve = `${sectionHandle}`;
  }

  if (
    typeof instance?.appContext.components === "object" &&
    compToResolve in instance.appContext.components
  )
    return compToResolve;

  throw createError({
    message: `No view component found for section: ${sectionHandle} with type: ${typeHandle}`,
    statusMessage: "Internal Server Error",
    name: "Internal Server Error",
    fatal: true,
    statusCode: 500,
  });
};
