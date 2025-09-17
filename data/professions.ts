const RAW_PROFESSIONS = [
  { name: 'blacksmith', category: 'artisan' },
  { name: 'tanner', category: 'artisan' },
  { name: 'weaver', category: 'artisan' },
  { name: 'herbalist', category: 'artisan' },
  { name: 'carpenter', category: 'artisan' },
  { name: 'alchemist', category: 'artisan' },

  { name: 'innkeeper', category: 'commoner' },
  { name: 'farmer', category: 'commoner' },
  { name: 'fisher', category: 'commoner' },
  { name: 'baker', category: 'commoner' },
  { name: 'stablehand', category: 'commoner' },
  { name: 'merchant', category: 'commoner' },

  { name: 'guard', category: 'military' },
  { name: 'captain of the watch', category: 'military' },
  { name: 'mercenary', category: 'military' },
  { name: 'veteran soldier', category: 'military' },
  { name: 'paladin', category: 'military' },

  { name: 'priest', category: 'religious' },
  { name: 'oracle', category: 'religious' },
  { name: 'monk', category: 'religious' },
  { name: 'scribe', category: 'religious' },
  { name: 'shaman', category: 'religious' },
  { name: 'cultist', category: 'religious' },
  { name: 'warlock', category: 'religious' },

  { name: 'noble heir', category: 'noble' },
  { name: 'retired noble', category: 'noble' },
  { name: 'duelist', category: 'noble' },
  { name: 'courtier', category: 'noble' },

  { name: 'thief', category: 'criminal' },
  { name: 'fence', category: 'criminal' },
  { name: 'smuggler', category: 'criminal' },
  { name: 'assassin', category: 'criminal' },

  { name: 'hunter', category: 'wilds' },
  { name: 'scout', category: 'wilds' },
  { name: 'beastmaster', category: 'wilds' },
  { name: 'tracker', category: 'wilds' },
  { name: 'bard', category: 'wilds' },
  { name: 'ranger', category: 'wilds' },
  { name: 'ranger', category: 'wilds' },
] as const;

export const PROFESSIONS: Profession[] = RAW_PROFESSIONS.map(p => ({
  ...p,
  keywords: [],
}));

export type ProfessionName = (typeof RAW_PROFESSIONS)[number]['name'];

export type ProfessionCategory = (typeof RAW_PROFESSIONS)[number]['category'];

export type Profession = {
  name: ProfessionName;
  category: ProfessionCategory;
  keywords?: string[];
};

export const SHOPKEEPER_PROFESSIONS: ProfessionName[] = [
  'blacksmith',
  'alchemist',
  'merchant',
  'tanner',
  'weaver',
  'fisher',
  'baker',
  'herbalist',
  'innkeeper',
] as const;
