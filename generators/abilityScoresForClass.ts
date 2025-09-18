import {
  AbilityKey,
  AbilityScores,
  type NPCClass,
  npcClasses,
} from 'data/npcClasses';

const abilities: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const MIN_SCORE = 8; // Prevent dump stats from tanking AC or damage
const MAX_SCORE = 18;

const roll4d6DropLowest = (): number =>
  Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);

const generateAbilityScoresForClass = (
  className: NPCClass,
  cr: number,
): AbilityScores => {
  const weights = npcClasses[className] ?? npcClasses['Commoner'];

  const rolledStats = Array.from({ length: 6 }, roll4d6DropLowest)
    .map(n => Math.max(n, MIN_SCORE)) // clamp min
    .map(n => Math.min(n, MAX_SCORE)) // clamp max
    .sort((a, b) => b - a); // high to low

  const weightedAbilities = abilities
    .map(ab => ({ ab, weight: weights[ab] ?? 0 }))
    .sort((a, b) => b.weight - a.weight);

  const finalScores: Partial<AbilityScores> = {};

  weightedAbilities.forEach((stat, i) => {
    finalScores[stat.ab] = rolledStats[i];
  });

  const estimatedLevel = Math.round(cr * 1.5);
  const asiCount = Math.floor(estimatedLevel / 4);

  for (let i = 0; i < asiCount; i++) {
    const asiTargets = weightedAbilities.slice(0, 3);
    for (let j = 0; j < 2; j++) {
      const chosen =
        asiTargets[Math.floor(Math.random() * asiTargets.length)].ab;
      finalScores[chosen] = Math.min(20, (finalScores[chosen] ?? 0) + 1);
    }
  }

  return finalScores as AbilityScores;
};

export default generateAbilityScoresForClass;
