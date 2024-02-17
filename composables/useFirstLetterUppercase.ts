interface IFirstLetterToUppercase {
  text: string | undefined;
}

export const useFirstLetterUppercase = (params: IFirstLetterToUppercase) => {
  if (!params.text) return;
  return params.text.charAt(0).toUpperCase() + params.text.slice(1);
};
