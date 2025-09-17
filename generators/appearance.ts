import { PROFESSION_CLOTHING } from 'data/appearanceDescriptors';
import { RACE_APPEARANCES } from 'data/raceAppearance';
import { getRandom } from '../utils/getRandom';
import { Profession } from 'data/professions';

export const generateAppearance = (
  race: string,
  profession: Profession,
): string => {
  const raceDescs = RACE_APPEARANCES[race] ?? [];
  const profDescs =
    PROFESSION_CLOTHING[profession.name as keyof typeof PROFESSION_CLOTHING] ??
    [];

  const appearanceParts = [getRandom(raceDescs), getRandom(profDescs)].filter(
    Boolean,
  );

  return appearanceParts.join(', ');
};
