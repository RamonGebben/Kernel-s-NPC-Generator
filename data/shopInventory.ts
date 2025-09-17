import { SHOPKEEPER_PROFESSIONS } from './professions';

export type ShopItem = {
  name: string;
  basePrice: number;
  unit?: 'gp' | 'sp' | 'cp';
};

export const SHOP_INVENTORIES: Partial<
  Record<(typeof SHOPKEEPER_PROFESSIONS)[number], ShopItem[]>
> = {
  blacksmith: [
    { name: 'Shortsword', basePrice: 10 },
    { name: 'Iron Mace', basePrice: 12 },
    { name: 'Set of Horseshoes', basePrice: 5 },
    { name: 'Steel Tongs', basePrice: 3 },
    { name: 'Chainmail Vest', basePrice: 75 },
  ],

  alchemist: [
    { name: 'Healing Potion (2d4+2)', basePrice: 50 },
    { name: 'Antitoxin', basePrice: 25 },
    { name: 'Vial of Acid', basePrice: 25 },
    { name: 'Smoke Bomb', basePrice: 15 },
    { name: 'Elixir of Barkskin (AC 16)', basePrice: 40 },
  ],
  merchant: [
    { name: 'Silks from Dail', basePrice: 20 },
    { name: 'Spices (pepper, clove, saffron)', basePrice: 15 },
    { name: 'Lantern (hooded)', basePrice: 5 },
    { name: 'Dyes (common colors)', basePrice: 4 },
    { name: 'Ink Set (vial + quill)', basePrice: 10 },
  ],
  tanner: [
    { name: 'Cured Leather (1 yd)', basePrice: 2 },
    { name: 'Fur Boots', basePrice: 6 },
    { name: 'Gloves with Bone Buttons', basePrice: 4 },
    { name: 'Hide Armor', basePrice: 10 },
    { name: 'Animal Pelts (various)', basePrice: 5 },
  ],
  weaver: [
    { name: 'Embroidered Tunic', basePrice: 8 },
    { name: 'Wool Cloak', basePrice: 6 },
    { name: 'Silken Thread (1 spool)', basePrice: 3 },
    { name: 'Traveler’s Blanket', basePrice: 4 },
    { name: 'Spindle Set', basePrice: 2 },
  ],
  fisher: [
    { name: 'Smoked Trout (fresh)', basePrice: 1, unit: 'sp' },
    { name: 'Fishing Net (10 ft)', basePrice: 4 },
    { name: 'Harpoon', basePrice: 2 },
    { name: 'Minnows (live bait)', basePrice: 5, unit: 'cp' },
    { name: 'Crab Trap', basePrice: 6 },
  ],
  baker: [
    { name: 'Loaf of Honeybread', basePrice: 3, unit: 'sp' },
    { name: 'Sweetcakes (3-pack)', basePrice: 2, unit: 'sp' },
    { name: 'Traveling Rations (3 days)', basePrice: 5 },
    { name: 'Salted Crust (hard biscuit)', basePrice: 5, unit: 'cp' },
    { name: 'Fruit Tart', basePrice: 1, unit: 'sp' },
  ],
  herbalist: [
    { name: 'Bundle of Sage', basePrice: 1, unit: 'sp' },
    { name: 'Wound Poultice', basePrice: 10 },
    { name: 'Dried Mandrake Root', basePrice: 15 },
    { name: 'Poppy Extract (mild sedative)', basePrice: 8 },
    { name: 'Chamomile & Mint Blend (tea)', basePrice: 3, unit: 'sp' },
  ],
  innkeeper: [
    { name: 'Private Room (per night)', basePrice: 5 },
    { name: 'Stew & Ale Combo', basePrice: 8, unit: 'sp' },
    { name: 'Bottle of House Wine', basePrice: 6 },
    { name: 'Room for a horse (stable)', basePrice: 2 },
    { name: 'Bath & Laundry Service', basePrice: 2 },
  ],
};
