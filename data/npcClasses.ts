export type NPCClass =
  | 'Barbarian'
  | 'Bard'
  | 'Cleric'
  | 'Druid'
  | 'Fighter'
  | 'Monk'
  | 'Paladin'
  | 'Ranger'
  | 'Rogue'
  | 'Sorcerer'
  | 'Warlock'
  | 'Wizard'
  | 'Artificer'
  | 'Guard'
  | 'Commoner';
export type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type AbilityScores = Record<AbilityKey, number>;

export const npcClasses: Record<NPCClass, AbilityScores> = {
  Barbarian: { str: 1.2, dex: 1.0, con: 1.1, int: 0.6, wis: 0.8, cha: 0.7 },
  Bard: { str: 0.7, dex: 1.0, con: 0.9, int: 0.9, wis: 0.8, cha: 1.2 },
  Cleric: { str: 0.9, dex: 0.8, con: 1.0, int: 0.8, wis: 1.2, cha: 0.8 },
  Druid: { str: 0.8, dex: 0.9, con: 1.0, int: 0.8, wis: 1.2, cha: 0.7 },
  Fighter: { str: 1.2, dex: 1.1, con: 1.0, int: 0.7, wis: 0.8, cha: 0.7 },
  Monk: { str: 0.9, dex: 1.2, con: 1.0, int: 0.8, wis: 1.1, cha: 0.7 },
  Paladin: { str: 1.1, dex: 0.8, con: 1.0, int: 0.7, wis: 0.9, cha: 1.2 },
  Ranger: { str: 0.9, dex: 1.2, con: 1.0, int: 0.8, wis: 1.0, cha: 0.7 },
  Rogue: { str: 0.6, dex: 1.3, con: 1.0, int: 0.9, wis: 0.9, cha: 0.8 },
  Sorcerer: { str: 0.5, dex: 0.8, con: 1.0, int: 0.7, wis: 0.9, cha: 1.3 },
  Warlock: { str: 0.6, dex: 0.9, con: 1.0, int: 0.9, wis: 0.8, cha: 1.2 },
  Wizard: { str: 0.5, dex: 0.8, con: 1.0, int: 1.3, wis: 1.0, cha: 0.7 },
  Artificer: { str: 0.6, dex: 1.0, con: 1.0, int: 1.2, wis: 0.9, cha: 0.8 },
  Guard: { str: 1.0, dex: 1.0, con: 1.0, int: 0.8, wis: 0.8, cha: 0.8 },
  Commoner: { str: 1.0, dex: 1.0, con: 1.0, int: 1.0, wis: 1.0, cha: 1.0 },
};
