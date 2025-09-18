/**
 * Returns the modifier for a given ability score.
 * Example: 14 → +2, 8 → -1
 */
const getModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export default getModifier;
