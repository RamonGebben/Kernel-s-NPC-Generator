import { WeaponProfile } from 'data/classProfiles';
import getModifier from './getModifier';

const extractDice = (damage: string): string => {
  const match = damage.match(/(\d+d\d+)/);
  return match ? match[1] : '1d6';
};

export const formatWeaponAction = (
  weapon: WeaponProfile,
  abilityScores: Record<'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha', number>,
  cr: number,
): string => {
  const score = abilityScores[weapon.ability];
  const mod = getModifier(score);

  const diceCount = Math.max(1, Math.floor(cr));
  const baseDice = extractDice(weapon.damage);
  const scaledDice = `${diceCount}${baseDice.slice(baseDice.indexOf('d'))}`;

  const scaledDamage = weapon.damage
    .replace(/DEX|STR|INT|WIS|CHA|STR/, `${mod >= 0 ? '+' : ''}${mod}`)
    .replace(baseDice, scaledDice);

  const toHit = mod >= 0 ? `+${mod}` : `${mod}`;
  const attackType =
    weapon.type === 'spell'
      ? 'Spell Attack'
      : weapon.type === 'ranged'
      ? 'Ranged Weapon Attack'
      : 'Melee Weapon Attack';

  const reachOrRange =
    weapon.type === 'ranged'
      ? 'range 30/120 ft.'
      : weapon.type === 'spell'
      ? 'range 60 ft.'
      : 'reach 5 ft.';

  return `${attackType}: ${toHit} to hit, ${reachOrRange}, one target. Hit: ${scaledDamage} damage.`;
};
