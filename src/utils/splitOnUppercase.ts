export const splitOnUppercase = (str: string): string =>
  str.split(/(?=[A-Z])/)?.join(" ");
