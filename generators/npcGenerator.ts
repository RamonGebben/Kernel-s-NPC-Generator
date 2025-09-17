import { NpcContext } from '../utils/parseFrontmatter';
import { NAME_DATA } from '../data/names';
import {
  PROFESSIONS,
  SHOPKEEPER_PROFESSIONS,
  ProfessionName,
} from '../data/professions';
import { PERSONALITY_TRAITS, QUIRKS } from '../data/personality';
import { RELIGION_DATA } from '../data/religions';
import { SHOP_INVENTORIES } from '../data/shopInventory';
import { getPriceModifier } from '../utils/priceModifier';
import { CULTURE_TO_RACE } from 'data/raceMapping';
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

const formatPrice = (price: number): string => {
  if (price >= 1) return `${price.toFixed(0)} gp`;
  if (price >= 0.1) return `${Math.round(price * 10)} sp`;
  return `${Math.round(price * 100)} cp`;
};

const generateInventorySection = (
  profession: ProfessionName,
  population?: number,
): string[] => {
  if (!SHOPKEEPER_PROFESSIONS.includes(profession)) return [];

  const items = SHOP_INVENTORIES[profession];
  if (!items || items.length === 0) return [];

  const priceFactor = getPriceModifier(population, profession);

  const lines = [
    `### 🛒 Shop Inventory`,
    ...items.map(item => {
      const price = item.basePrice * priceFactor;
      return `- ${item.name} — ${formatPrice(price)}`;
    }),
  ];

  return lines;
};

export const generateNpcMarkdown = (
  context: NpcContext,
  providedProf: ProfessionName,
): string => {
  const { culture, religion, state, population, locationName } = context;

  const nameSet = NAME_DATA[culture];
  const religionData = RELIGION_DATA[religion];

  if (!nameSet) throw new Error(`Missing name set for culture: ${culture}`);

  const gender = getRandom(['male', 'female', 'neutral']);
  const firstName = getRandom(
    nameSet[gender as keyof typeof nameSet] ?? nameSet.neutral ?? ['Alex'],
  );
  const lastName = getRandom(nameSet.surnames ?? ['Doe']);

  const fullName = `${firstName} ${lastName}`;

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

  const raceOptions = CULTURE_TO_RACE[culture];
  const race = raceOptions ? getRandom(raceOptions) : 'Human';

  const description = generateDescription(race, profession, culture);

  const lines = [
    frontmatter({
      race,
      profession: profession.name,
      location: locationName,
      culture,
    }),
    `## 🧙 NPC: ${fullName}`,
    `- **Race**: ${race}`,
    `- **Profession**: ${capitalize(profession.name)}`,
    `- **Culture**: ${culture}`,
    `- **Religion**: ${religion}`,
    `- **Origin**: ${locationName}${state ? `, ${state}` : ''}`,
    `- **Personality**: ${trait}`,
    `- **Quirk**: ${quirk}`,
    `- **Description**: ${description}`,
    ...(flavorLine ? [`- **Motif**: ${flavorLine}`] : []),
    `- **Standing**: 0 (Neutral)`,
    ``,
    ...generateInventorySection(profession.name, population),
  ];

  return lines.join('\n');
};
