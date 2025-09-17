export type LocationFlavor = {
  minPop?: number;
  maxPop?: number;
  type?: string;
  tone: string;
  ambition: string;
};

export const LOCATION_FLAVORS: LocationFlavor[] = [
  {
    minPop: 10000,
    tone: 'urban, fast-talking, streetwise',
    ambition: 'hopes to move up in guild politics or establish a name',
  },
  {
    type: 'village',
    maxPop: 1000,
    tone: 'rural, friendly, sometimes nosy',
    ambition: 'just wants a quiet life or to take over the family business',
  },
  {
    type: 'city',
    tone: 'formally spoken, hierarchical',
    ambition: 'dreams of power or patronage',
  },
  {
    // fallback
    tone: 'modest but proud of their town',
    ambition: 'seeks stability and respect in the community',
  },
];
