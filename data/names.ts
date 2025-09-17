export type NameSet = {
  male: string[];
  female: string[];
  neutral?: string[];
  surnames?: string[];
};

export const NAME_DATA: Record<string, NameSet> = {
  'Anor (Human)': {
    male: ['Edric', 'Harlan', 'Tavon', 'Lorien', 'Bren'],
    female: ['Seris', 'Elaine', 'Vera', 'Anya', 'Marielle'],
    neutral: ['Kael', 'Riven', 'Lior'],
    surnames: ['Stonehill', 'Graymoor', 'Ravenshade', 'Wickmere'],
  },
  'Dail (Human)': {
    male: ['Cormac', 'Eoin', 'Ronan', 'Tadhg', 'Bran'],
    female: ['Niamh', 'Saoirse', 'Ailis', 'Fiadh', 'Brigh'],
    neutral: ['Keir', 'Lochlan'],
    surnames: ['MacCraith', "O'Fenn", 'Branwyn', 'Dunloch'],
  },
  'Dunirr (Dwarven)': {
    male: ['Thorek', 'Balin', 'Durik', 'Harnak', 'Gorim'],
    female: ['Brena', 'Dagna', 'Thora', 'Helja', 'Korra'],
    neutral: ['Skarn', 'Varg'],
    surnames: ['Stonefist', 'Ironbrow', 'Deepdelve', 'Runebeard'],
  },
  'Khazadur (Dwarven)': {
    male: ['Barundin', 'Doran', 'Kazruk', 'Morgran', 'Thrain'],
    female: ['Ysolde', 'Brynja', 'Thalara', 'Eldra', 'Virdra'],
    neutral: ['Druin', 'Volgar'],
    surnames: ['Hammerfall', 'Oathforge', 'Firevein', 'Anvilroot'],
  },
  'Quenian (Elfish)': {
    male: ['Aerendyl', 'Thalanil', 'Vaeril', 'Laeron', 'Syrith'],
    female: ['Elaria', 'Myrrhine', 'Thalira', 'Ilyana', 'Selene'],
    neutral: ['Valaris', 'Aerin', 'Nithil'],
    surnames: ['Duskweaver', 'Silvershade', 'Moonwhisper', 'Starleaf'],
  },
  'Trow (Dark Elfish)': {
    male: ['Zareth', 'Malvir', 'Drakos', 'Vareth', 'Nyvar'],
    female: ['Xalara', 'Veysha', 'Lilith', 'Morwen', 'Drisza'],
    neutral: ['Thryl', 'Zevar'],
    surnames: ['Duskwither', 'Nightthorn', 'Velshade', 'Gravetongue'],
  },
  'Uruk (Orkish)': {
    male: ['Gorzug', 'Thrak', 'Urogh', 'Karg', 'Brukk'],
    female: ['Grashna', 'Korgra', 'Ugna', 'Magra', 'Shurla'],
    neutral: ['Dragg', 'Rukna'],
    surnames: ['Skullcleaver', 'Ashblood', 'Bonegnaw', 'Ironfang'],
  },
  Wildlands: {
    male: ['Fen', 'Rook', 'Ash', 'Darrik', 'Reed'],
    female: ['Lyra', 'Nessa', 'Fawn', 'Brin', 'Yara'],
    neutral: ['Shade', 'Wren'],
    surnames: ['Thistlewild', 'Moonroot', 'Foxtrail', 'Bramblehide'],
  },
};
