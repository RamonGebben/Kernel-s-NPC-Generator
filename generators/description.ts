import { generateAppearance } from './appearance';
import { generateClothing } from './clothing';
import type { Profession } from '../data/professions';

export const generateDescription = (
  race: string,
  profession: Profession,
  culture: string,
): string => {
  const appearance = generateAppearance(race, profession);
  const clothing = generateClothing(profession, culture);
  return `${appearance}, and ${clothing}.`;
};
