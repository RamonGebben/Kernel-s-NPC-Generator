import { NAME_DATA } from 'data/names';
import { CULTURE_TO_RACE } from 'data/raceMapping';
import { getRandom } from './getRandom';

export type Gender = 'male' | 'female' | 'neutral';

const API_RACE_CODES: Record<string, string> = {
  human: 'h',
  dwarf: 'd',
  elf: 'e',
  orc: 'o',
};

const FALLBACK_NAMES: Record<string, string[]> = {
  human: ['Alden', 'Brynn', 'Calia', 'Darin'],
  dwarf: ['Thrain', 'Dagna', 'Bofri', 'Bramli'],
  elf: ['Faelar', 'Sylvari', 'Elenwe', 'Thalor'],
  orc: ['Goruk', 'Morg', 'Thrak', 'Urga'],
};

export const getRandomName = async (
  culture: string,
  gender: Gender = 'neutral',
): Promise<{ fullName: string; race: string }> => {
  const nameSet = NAME_DATA[culture];
  const raceOptions = CULTURE_TO_RACE[culture];
  const race = raceOptions ? getRandom(raceOptions) : 'human';

  // Try Fantasy Name Generator API
  const apiCode = API_RACE_CODES[race.toLowerCase()];
  console.log('apiCode', apiCode);
  if (apiCode) {
    try {
      const res = await fetch(
        `https://fantasyname.lukewh.com/?gender=${
          gender === 'female' ? 'f' : 'm'
        }&family=t&ancestry=${apiCode}`,
      );
      const name = await res.text();

      console.log('!!--- name', name);
      if (name.length > 0) {
        return { fullName: name, race };
      }
    } catch (e) {
      console.warn(`Name fetch failed for race "${race}":`, e);
    }
  }

  if (nameSet) {
    const firstName = getRandom(
      nameSet[gender as keyof typeof nameSet] ?? nameSet.neutral ?? ['Alex'],
    );
    const lastName = getRandom(nameSet.surnames ?? ['Doe']);
    return { fullName: `${firstName} ${lastName}`, race };
  }

  // Fallback to internal defaults
  const fallback = FALLBACK_NAMES[race.toLowerCase()] ?? ['Nameless'];
  return { fullName: getRandom(fallback), race };
};
