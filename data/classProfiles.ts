import { NPCClass } from './npcClasses';

export type WeaponProfile = {
  name: string;
  type: 'melee' | 'ranged' | 'spell';
  damage: string; // e.g., '1d8 + STR'
  ability: 'str' | 'dex' | 'int' | 'cha' | 'wis';
};

export type Trait = {
  name: string;
  desc: string;
};

export type ClassProfile = {
  ac: number; // base AC
  weapons: WeaponProfile[];
  traits: Trait[];
  spellcaster?: boolean;
};

export const npcClassProfiles: Record<NPCClass, ClassProfile> = {
  Fighter: {
    ac: 17,
    weapons: [
      { name: 'Longsword', type: 'melee', damage: '1d8 + STR', ability: 'str' },
      {
        name: 'Heavy Crossbow',
        type: 'ranged',
        damage: '1d10 + DEX',
        ability: 'dex',
      },
    ],
    traits: [
      {
        name: 'Second Wind',
        desc: `Once per short rest, the fighter can regain 1d10 + level HP as a bonus action.`,
      },
    ],
  },

  Rogue: {
    ac: 15,
    weapons: [
      { name: 'Rapier', type: 'melee', damage: '1d8 + DEX', ability: 'dex' },
      { name: 'Dagger', type: 'ranged', damage: '1d4 + DEX', ability: 'dex' },
    ],
    traits: [
      {
        name: 'Sneak Attack',
        desc: 'Once per turn, deals an extra 1d6 damage on a hit if they have advantage or an ally is within 5 ft.',
      },
    ],
  },

  Wizard: {
    ac: 12,
    weapons: [
      {
        name: 'Fire Bolt',
        type: 'spell',
        damage: '1d10 + INT',
        ability: 'int',
      },
    ],
    traits: [
      {
        name: 'Spellcasting',
        desc: 'The wizard is a 5th-level spellcaster (DC 13, +5 to hit).',
      },
    ],
    spellcaster: true,
  },

  Barbarian: {
    ac: 15,
    weapons: [
      { name: 'Greataxe', type: 'melee', damage: '1d12 + STR', ability: 'str' },
      { name: 'Handaxe', type: 'melee', damage: '1d6 + STR', ability: 'str' },
    ],
    traits: [
      {
        name: 'Rage',
        desc: 'Once per long rest, the barbarian can enter a rage as a bonus action. While raging, it gains advantage on Strength checks and saves, and deals +2 melee damage.',
      },
    ],
  },

  Bard: {
    ac: 14,
    weapons: [
      { name: 'Rapier', type: 'melee', damage: '1d8 + DEX', ability: 'dex' },
      {
        name: 'Crossbow, light',
        type: 'ranged',
        damage: '1d8 + DEX',
        ability: 'dex',
      },
    ],
    traits: [
      {
        name: 'Bardic Inspiration (3/day)',
        desc: `Bonus action: give a creature within 60 ft. a 1d6 inspiration die.`,
      },
    ],
    spellcaster: true,
  },

  Cleric: {
    ac: 16,
    weapons: [
      { name: 'Mace', type: 'melee', damage: '1d6 + STR', ability: 'str' },
      {
        name: 'Sacred Flame',
        type: 'spell',
        damage: '1d8 + WIS',
        ability: 'wis',
      },
    ],
    traits: [
      {
        name: 'Channel Divinity (1/rest)',
        desc: `Use divine energy for effects such as Turn Undead or bonus damage.`,
      },
    ],
    spellcaster: true,
  },

  Druid: {
    ac: 15,
    weapons: [
      { name: 'Scimitar', type: 'melee', damage: '1d6 + DEX', ability: 'dex' },
      {
        name: 'Produce Flame',
        type: 'spell',
        damage: '1d8 + WIS',
        ability: 'wis',
      },
    ],
    traits: [
      {
        name: 'Wild Shape (2/rest)',
        desc: `Transform into a CR 1/4 beast for up to 1 hour.`,
      },
    ],
    spellcaster: true,
  },

  Monk: {
    ac: 16,
    weapons: [
      {
        name: 'Unarmed Strike',
        type: 'melee',
        damage: '1d6 + DEX',
        ability: 'dex',
      },
      {
        name: 'Shortsword',
        type: 'melee',
        damage: '1d6 + DEX',
        ability: 'dex',
      },
    ],
    traits: [
      {
        name: 'Martial Arts',
        desc: `Can use DEX for attacks and roll 1d6 for unarmed strikes.`,
      },
      {
        name: 'Unarmored Defense',
        desc: `AC = 10 + DEX + WIS.`,
      },
    ],
  },

  Paladin: {
    ac: 18,
    weapons: [
      { name: 'Longsword', type: 'melee', damage: '1d8 + STR', ability: 'str' },
      { name: 'Javelin', type: 'ranged', damage: '1d6 + STR', ability: 'str' },
    ],
    traits: [
      {
        name: 'Divine Smite',
        desc: `On melee hit, expend a spell slot to deal +2d8 radiant damage.`,
      },
      {
        name: 'Lay on Hands (10 HP)',
        desc: `Restore up to 10 HP per long rest.`,
      },
    ],
    spellcaster: true,
  },

  Ranger: {
    ac: 15,
    weapons: [
      { name: 'Longbow', type: 'ranged', damage: '1d8 + DEX', ability: 'dex' },
      {
        name: 'Shortsword',
        type: 'melee',
        damage: '1d6 + DEX',
        ability: 'dex',
      },
    ],
    traits: [
      {
        name: 'Favored Enemy',
        desc: `Advantage on tracking and lore checks against one chosen enemy type.`,
      },
      {
        name: 'Natural Explorer',
        desc: `Ignore difficult terrain in chosen terrain type.`,
      },
    ],
    spellcaster: true,
  },

  Sorcerer: {
    ac: 13,
    weapons: [
      {
        name: 'Fire Bolt',
        type: 'spell',
        damage: '1d10 + CHA',
        ability: 'cha',
      },
    ],
    traits: [
      {
        name: 'Sorcery Points (2)',
        desc: `Spend sorcery points to cast spells or apply metamagic.`,
      },
    ],
    spellcaster: true,
  },

  Warlock: {
    ac: 15,
    weapons: [
      {
        name: 'Eldritch Blast',
        type: 'spell',
        damage: '1d10 + CHA',
        ability: 'cha',
      },
    ],
    traits: [
      {
        name: 'Pact Magic',
        desc: `Cast limited spells using Charisma. Recovers on short rest.`,
      },
      {
        name: 'Eldritch Invocations',
        desc: `Special magical features like Agonizing Blast.`,
      },
    ],
    spellcaster: true,
  },

  Artificer: {
    ac: 16,
    weapons: [
      {
        name: 'Thunder Cannon',
        type: 'ranged',
        damage: '1d8 + INT',
        ability: 'int',
      },
      {
        name: 'Light Hammer',
        type: 'melee',
        damage: '1d4 + STR',
        ability: 'str',
      },
    ],
    traits: [
      {
        name: 'Infuse Item',
        desc: `Can imbue objects with magical properties.`,
      },
      {
        name: 'Tinkering',
        desc: `Can create magical trinkets with minor effects.`,
      },
    ],
    spellcaster: true,
  },

  Guard: {
    ac: 16,
    weapons: [
      { name: 'Spear', type: 'melee', damage: '1d6 + STR', ability: 'str' },
      {
        name: 'Heavy Crossbow',
        type: 'ranged',
        damage: '1d10 + DEX',
        ability: 'dex',
      },
    ],
    traits: [
      {
        name: 'Watchful',
        desc: `Advantage on Perception checks to spot threats.`,
      },
    ],
    spellcaster: false,
  },

  Commoner: {
    ac: 10,
    weapons: [
      { name: 'Club', type: 'melee', damage: '1d4 + STR', ability: 'str' },
    ],
    traits: [
      {
        name: 'Peasant Resilience',
        desc: `Disadvantage on death saves, but advantage against exhaustion.`,
      },
    ],
    spellcaster: false,
  },
};
