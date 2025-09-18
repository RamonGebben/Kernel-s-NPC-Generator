import { NpcContext } from '../utils/parseFrontmatter';
import { Gender, getRandomName } from 'utils/getRandomName';
import {
  PROFESSIONS,
  SHOPKEEPER_PROFESSIONS,
  ProfessionName,
} from '../data/professions';
import { PERSONALITY_TRAITS, QUIRKS } from '../data/personality';
import { RELIGION_DATA } from '../data/religions';
import { getPriceModifier } from '../utils/priceModifier';
import { generateDescription } from './description';

const getRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const frontmatter = (obj: {
  [s: string]: unknown;
  type?: string;
  tags?: string[];
}) => {
  const tags = obj.type
    ? [obj.type, ...(obj.tags ?? [])]
    : [...(obj.tags ?? [])];
  return (
    '---\n' +
    (tags.length ? `tags: [${[...new Set(tags)].join(', ')}]\n` : '') +
    Object.entries(obj)
      .filter(([k]) => k !== 'tags')
      .map(([k, v]) => `${k}: ${v ?? ''}`)
      .join('\n') +
    '\n---\n'
  );
};

const generateInventorySection = (profession: ProfessionName): string[] => {
  if (!SHOPKEEPER_PROFESSIONS.includes(profession)) return [];

  const lines = [
    '```dataviewjs',
    `const npc = dv.current();
const priceMod = parseFloat(npc.priceModifier) || 1;
const profession = npc.profession?.toLowerCase();

// Define rarity weights
const rarityWeights = {
  common: 10,
  uncommon: 5,
  rare: 2,
  'very rare': 1,
  legendary: 0,
  artifact: 0,
};

// Dice roller for strings like "1d4+2"
function rollDice(expr) {
  const match = expr.match(/(\\d*)d(\\d+)([+-]\\d+)?/);
  if (!match) return parseInt(expr) || 1;
  const [_, dice, sides, mod] = match;
  const rolls = Array.from({ length: parseInt(dice || 1) }, () =>
    Math.floor(Math.random() * parseInt(sides)) + 1
  );
  const total = rolls.reduce((a, b) => a + b, 0) + (parseInt(mod) || 0);
  return total;
}

// Unique weighted sampling
function uniqueWeightedSample(items, weights, n) {
  const result = [];
  const usedIndices = new Set();

  while (result.length < n && usedIndices.size < items.length) {
    const totalWeight = weights.reduce((sum, w, i) => usedIndices.has(i) ? sum : sum + w, 0);
    let r = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
      if (usedIndices.has(i)) continue;
      r -= weights[i];
      if (r <= 0) {
        result.push(items[i]);
        usedIndices.add(i);
        break;
      }
    }
  }

  return result;
}

// Get matching items
const allItems = dv.pages('"Items"')
  .where(p => Array.isArray(p.soldBy) && p.soldBy.includes(profession))
  .where(p => p.rarity && rarityWeights[p.rarity.toLowerCase()] > 0);

const itemsArray = allItems.array();
const weights = itemsArray.map(i => rarityWeights[i.rarity?.toLowerCase()] || 1);

// Sample 8 unique items
const chosen = uniqueWeightedSample(itemsArray, weights, 8);

// Prepare and sort results
const results = chosen.map(p => {
  const base = p.price ?? 0;
  const final = base * priceMod;
  const stock = typeof p.stock === 'string' ? rollDice(p.stock) : (p.stock ?? 1);
  return {
    name: p.name,
    rarity: p.rarity,
    base: (base / 10).toFixed(2),
    final: (final / 10).toFixed(2),
    stock,
  };
}).sort((a, b) => {
  const wA = rarityWeights[a.rarity.toLowerCase()] || 0;
  const wB = rarityWeights[b.rarity.toLowerCase()] || 0;
  return wB - wA; // Sort from high weight to low → common on top
});

// Render
if (results.length === 0) {
  dv.paragraph(\`No inventory found for profession: **\${profession}**\`);
} else {
  dv.header(3, '🧾 Shop Inventory');
  dv.table(
    ['Item', 'Rarity', 'Base Price', \`Adjusted Price (×\${priceMod.toFixed(2)})\`, 'Stock'],
    results.map(i => [\`[[\${i.name}]]\` , i.rarity, \`\${i.base} gp\`, \`\${i.final} gp\`, i.stock])
  );
}`,
    '```',
  ];

  return lines;
};

export const generateNpcMarkdown = async (
  context: NpcContext,
  providedProf: ProfessionName,
): Promise<string> => {
  const { culture, religion, state, population, locationName } = context;

  const religionData = RELIGION_DATA[religion];
  const gender = getRandom(['male', 'female', 'neutral'] as Gender[]);

  const { fullName, race } = await getRandomName(culture, gender);

  // Choose profession
  let profession = providedProf
    ? PROFESSIONS.find(({ name }) => name === providedProf) ??
      getRandom(PROFESSIONS)
    : getRandom(PROFESSIONS);

  if (religionData?.favoredProfessions && !providedProf) {
    const favored = religionData.favoredProfessions;
    const filtered = PROFESSIONS.filter(p => favored.includes(p.name));
    if (filtered.length > 0) profession = getRandom(filtered);
  }

  const trait = getRandom(PERSONALITY_TRAITS);
  const quirk = getRandom(QUIRKS);
  const motif = religionData?.motifs
    ? getRandom(religionData.motifs)
    : undefined;
  const flavorLine = motif ? `Often seen with ${motif}.` : '';

  const description = generateDescription(race, profession, culture);

  const lines = [
    frontmatter({
      race,
      profession: profession.name,
      priceModifier: getPriceModifier(population, profession.name),
      location: locationName,
      standing: 0,
      culture,
    }),
    `## 🧙 NPC: ${fullName}`,
    `- **Race**: ${race}`,
    `- **Profession**: ${capitalize(profession.name)}`,
    `- **Culture**: [[${culture}]]`,
    `- **Religion**: [[${religion}]]`,
    `- **Origin**: [[${locationName}]]${state ? `, [[${state}]]` : ''}`,
    `- **Personality**: ${trait}`,
    `- **Quirk**: ${quirk}`,
    `- **Description**: ${description}`,
    ...(flavorLine ? [`- **Motif**: ${flavorLine}`] : []),
    ``,
    ...generateInventorySection(profession.name),
  ];

  return lines.join('\n');
};
