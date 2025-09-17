export type ReligionData = {
  description?: string;
  favoredProfessions?: string[];
  traits?: string[];
  motifs?: string[];
};

export const RELIGION_DATA: Record<string, ReligionData> = {
  'Anor (Human) Spirits': {
    description: 'Ancestral spirit reverence, tied to hearth and bloodline.',
    favoredProfessions: ['priest', 'scribe', 'farmer'],
    traits: ['honorable', 'traditional', 'soft-spoken'],
    motifs: ['carved stones', 'candles', 'ancestor masks'],
  },
  Baleholdism: {
    description:
      'A fatalistic faith focused on the cycle of decay and rebirth.',
    favoredProfessions: ['monk', 'gravedigger', 'alchemist'],
    traits: ['calm', 'pessimistic', 'observant'],
    motifs: ['skulls', 'rotwood', 'bone charms'],
  },
  'Dail (Human) Forefathers': {
    description: 'Ritualistic ancestor worship with strong oral traditions.',
    favoredProfessions: ['bard', 'hunter', 'priest'],
    traits: ['proud', 'loyal', 'melancholic'],
    motifs: ['braided hair', 'runic carvings', 'story beads'],
  },
  'Dunirr (Dwarven) Forefathers': {
    description: 'Stone-bound veneration of great dwarven ancestors.',
    favoredProfessions: ['blacksmith', 'scribe', 'artisan'],
    traits: ['stoic', 'hard-working', 'gruff'],
    motifs: ['runes', 'beard rings', 'ancestral relics'],
  },
  'Faith of Ithvalya': {
    description: 'Mystic and dreamlike faith centered on divine silence.',
    favoredProfessions: ['oracle', 'scribe', 'alchemist'],
    traits: ['serene', 'cryptic', 'austere'],
    motifs: ['silver veils', 'moonlight', 'mirrors'],
  },
  'Khazadur (Dwarven) Forefathers': {
    description: 'Warrior-ancestor devotion through legacy and clan deeds.',
    favoredProfessions: ['soldier', 'smith', 'champion'],
    traits: ['fierce', 'honor-bound', 'tactical'],
    motifs: ['axes', 'ancestral banners', 'iron cuffs'],
  },
  'No religion': {
    description: 'This individual holds no known spiritual beliefs.',
    favoredProfessions: ['merchant', 'soldier', 'smuggler'],
    traits: ['pragmatic', 'independent', 'suspicious'],
    motifs: [],
  },
  'Quenian (Elfish) Spirits': {
    description: 'Elemental spirits of starlight, song, and memory.',
    favoredProfessions: ['bard', 'ranger', 'oracle'],
    traits: ['elegant', 'enigmatic', 'gentle'],
    motifs: ['starlight tattoos', 'glowing leaves', 'song crystals'],
  },
  'Ther Gods': {
    description: 'Pantheon-based faith emphasizing balance and purpose.',
    favoredProfessions: ['priest', 'paladin', 'scribe'],
    traits: ['disciplined', 'just', 'introspective'],
    motifs: ['holy symbols', 'prayer wheels', 'twin coins'],
  },
  'Trow (Dark Elfish) Beliefs': {
    description: 'Shadowy rites honoring death, secrets, and spiders.',
    favoredProfessions: ['assassin', 'oracle', 'weaver'],
    traits: ['cold', 'calculating', 'devout'],
    motifs: ['web patterns', 'obsidian charms', 'black lace'],
  },
  'Uruk (Orkish) Beliefs': {
    description: 'Raw spiritualism, often tied to beast totems and battle.',
    favoredProfessions: ['warrior', 'beastmaster', 'shaman'],
    traits: ['fierce', 'blunt', 'tribal'],
    motifs: ['scarification', 'bone jewelry', 'totem masks'],
  },
  'Verasenan Blasphemy': {
    description: 'Forbidden rites tied to chaos, corruption, or the void.',
    favoredProfessions: ['warlock', 'cultist', 'scribe'],
    traits: ['obsessive', 'unnerving', 'zealous'],
    motifs: ['black flame', 'third-eye symbols', 'whispering runes'],
  },
};
