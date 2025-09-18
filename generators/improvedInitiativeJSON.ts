import { AbilityScores } from 'data/npcClasses';
import { ClassProfile } from 'data/classProfiles';
import { formatWeaponAction } from 'utils/formatWeaponAction';
import getModifier from 'utils/getModifier';

export const generateImprovedInitiativeJSON = (
  name: string,
  cr: number,
  abilityScores: AbilityScores,
  classProfile: ClassProfile,
  ac: number,
  hp: number,
): string => {
  const { str, dex, con, int, wis, cha } = abilityScores;

  return JSON.stringify(
    {
      Source: 'Auto Generated - ' + name,
      Type: `Medium Humanoid, any alignment`,
      HP: {
        Value: hp,
        Notes: `(${Math.floor(hp / 5)}d8+${
          getModifier(con) * Math.floor(hp / 5)
        })`,
      },
      AC: {
        Value: ac,
        Notes: classProfile.ac ? `(base ${classProfile.ac})` : '',
      },
      InitiativeModifier: getModifier(dex),
      InitiativeAdvantage: false,
      Speed: ['walk 30 ft.'],
      Abilities: {
        Str: str,
        Dex: dex,
        Con: con,
        Int: int,
        Wis: wis,
        Cha: cha,
      },
      DamageVulnerabilities: [],
      DamageResistances: [],
      DamageImmunities: [],
      ConditionImmunities: [],
      Saves: [],
      Skills: [
        {
          Name: 'Perception',
          Modifier: 10 + getModifier(wis),
        },
      ],
      Senses: [`passive Perception ${10 + getModifier(wis)}`],
      Languages: ['Common'],
      Challenge: typeof cr === 'number' ? cr.toString() : cr,
      Traits: classProfile.traits.map(t => ({
        Name: t.name,
        Content: t.desc,
      })),
      Actions: classProfile.weapons.map(w => ({
        Name: w.name,
        Content: formatWeaponAction(w, abilityScores, cr),
      })),
      BonusActions: [],
      Reactions: [],
      LegendaryActions: [],
      MythicActions: [],
      Description: '',
      Player: '',
      Version: '3.13.2',
      ImageURL: '',
    },
    null,
    2,
  );
};
