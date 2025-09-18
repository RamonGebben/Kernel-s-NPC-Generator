/**
 * Scales a base dice expression (e.g., "1d8") based on CR.
 */
export const scaleCantripDamage = (baseDice: string, cr: number): string => {
  let multiplier = 1;

  if (cr >= 17) multiplier = 4;
  else if (cr >= 11) multiplier = 3;
  else if (cr >= 5) multiplier = 2;

  const match = baseDice.match(/^1d(\d+)$/);
  if (!match) return baseDice;

  const dieSize = match[1];
  return `${multiplier}d${dieSize}`;
};
