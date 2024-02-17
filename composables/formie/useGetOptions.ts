export const useGetOptions = (options: []): any => {
  return options.map((option: any) => {
    return {
      label: option.label,
      value: option.value,
      // attrs:{
      //   disabled: option.diabled
      // }
    };
  });
};
