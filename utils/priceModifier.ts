import type { ProfessionName } from '../data/professions';

export const getPriceModifier = (
  population = 3000,
  profession: ProfessionName,
): number => {
  const BASE = 3000;
  const MIN = 0.8;
  const MAX = 1.3;

  const ratio = Math.log10(population + 10) / Math.log10(BASE + 10);
  let modifier = 1 / ratio;

  switch (profession) {
    case 'alchemist':
    case 'merchant':
      modifier *= 1.05;
      break;
    case 'blacksmith':
    case 'tanner':
    case 'weaver':
      modifier *= 0.95;
      break;
  }

  const rand = Math.random() * 0.1 - 0.05;
  modifier += rand;

  modifier = Math.max(MIN, Math.min(MAX, modifier));
  return Math.round(modifier * 100) / 100;
};
