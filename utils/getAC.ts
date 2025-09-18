import type { AbilityScores, NPCClass } from 'data/npcClasses';
import type { ClassProfile } from 'data/classProfiles';
import getModifier from './getModifier';

export const getAC = (
  cls: NPCClass,
  stats: AbilityScores,
  detail: ClassProfile,
): number => {
  const base = detail.ac ?? 12;

  // Use class-specific scaling logic
  if (cls === 'Barbarian') {
    // Barbarian: base AC is unarmored defense = 10 + DEX + CON
    return base + getModifier(stats.dex) + getModifier(stats.con);
  }

  if (cls === 'Monk') {
    // Monk: base AC is unarmored defense = 10 + DEX + WIS
    return base + getModifier(stats.dex) + getModifier(stats.wis);
  }

  // Default scaling: base AC + DEX modifier
  return base + getModifier(stats.dex);
};
