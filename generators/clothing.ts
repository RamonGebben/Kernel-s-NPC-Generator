import type { Profession } from '../data/professions';

export const generateClothing = (
  profession: Profession,
  culture: string,
): string => {
  // Simple matching by profession
  if (profession.name.includes('blacksmith'))
    return 'wears a soot-stained apron over thick leathers';
  if (profession.name.includes('alchemist'))
    return 'is wrapped in layered robes stained with various substances';
  if (profession.name.includes('merchant'))
    return 'dresses in fine but practical fabrics with polished boots';
  if (profession.name.includes('priest') || profession.name.includes('oracle'))
    return 'is adorned with ceremonial robes and religious iconography';
  if (
    profession.name.includes('guard') ||
    profession.name.includes('soldier') ||
    profession.name.includes('mercenary')
  )
    return 'is clad in rugged armor bearing the marks of their service';
  if (
    profession.name.includes('innkeeper') ||
    profession.name.includes('baker')
  )
    return 'sports rolled-up sleeves and an apron with faint food stains';
  if (profession.name.includes('hunter') || profession.name.includes('tracker'))
    return 'wears rough leathers and a hood to blend into the wilds';
  if (profession.name.includes('noble'))
    return 'is dressed in embroidered silks and ornate jewelry';
  if (
    profession.name.includes('warlock') ||
    profession.name.includes('cultist')
  )
    return 'is draped in tattered, arcane vestments with mysterious sigils';

  // Fallback by culture
  if (culture.includes('Elfish'))
    return 'wears elegant, flowing garments of forest hues';
  if (culture.includes('Dwarven'))
    return 'wears sturdy, practical clothes with metal accents';
  if (culture.includes('Orkish'))
    return 'wears mismatched leathers and bone charms';
  if (culture.includes('Human'))
    return 'wears a simple tunic and belt of local make';
  if (culture.includes('Wildlands'))
    return 'is wrapped in hides and patchwork cloaks';

  return 'wears nondescript, travel-worn clothing';
};
