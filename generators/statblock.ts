import { parseCR } from 'utils/parseCr';
import getModifier from 'utils/getModifier';
import generateAbilityScoresForClass from './abilityScoresForClass';

import { npcClassProfiles, Trait } from 'data/classProfiles';
import { NPCClass } from 'data/npcClasses';
import { formatWeaponAction } from 'utils/formatWeaponAction';
import { getAC } from 'utils/getAC';
import { generateImprovedInitiativeJSON } from './improvedInitiativeJSON';

export const generateNpcStatblock = (
  name: string,
  crInput: string,
  className: NPCClass,
): string => {
  const cr = parseCR(crInput);
  const abilityScores = generateAbilityScoresForClass(className, cr);
  const { str, dex, con, int, wis, cha } = abilityScores;

  const modString = (n: number) =>
    `${n} (${getModifier(n) >= 0 ? '+' : ''}${getModifier(n)})`;

  const detail = npcClassProfiles[className];
  const weapons = detail.weapons;
  const traits = detail.traits;

  const ac = getAC(className, abilityScores, detail);
  const hp = Math.max(1, Math.floor(8 + getModifier(con) + cr * 6));
  const speed = 30;

  const traitsBlock = traits
    .map(
      (trait: Trait) =>
        `  - name: ${trait.name}\n    desc: ${trait.desc
          .replace(/\n/g, ' ')
          .trim()}`,
    )
    .join('\n');

  const actionsBlock = weapons
    .map(
      w =>
        `  - name: ${w.name}\n    desc: |\n      ${formatWeaponAction(
          w,
          abilityScores,
          cr,
        )}`,
    )
    .join('\n');

  const jsonBlock = generateImprovedInitiativeJSON(
    name,
    cr,
    abilityScores,
    detail,
    ac,
    hp,
  );

  return `\`\`\`statblock
name: ${name}
size: Medium
type: humanoid
alignment: any
challenge: ${crInput}
class: ${className}

STR: ${modString(str)}
DEX: ${modString(dex)}
CON: ${modString(con)}
INT: ${modString(int)}
WIS: ${modString(wis)}
CHA: ${modString(cha)}

hp: ${hp}
ac: ${ac}

speed: ${speed} ft.

passive_perception: ${10 + getModifier(wis)}
languages: Common

traits:
${traitsBlock}

actions:
${actionsBlock}
\`\`\`

\`\`\`json
${jsonBlock}
\`\`\`
`;
};
