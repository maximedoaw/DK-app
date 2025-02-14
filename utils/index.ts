export type Team = {
    id: string;
    name: string;
    image: string;
    description: string;
};

export const replaceHyphensAndSpaces = (input: string): string => {
    return input.replace(/[- ]/g, (match) => (match === '-' ? ' ' : '-'));
  };