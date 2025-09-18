export const parseCR = (input: string): number => {
  if (input.includes('/')) {
    const [num, denom] = input.split('/').map(Number);
    return num / denom;
  }
  return parseFloat(input);
};
