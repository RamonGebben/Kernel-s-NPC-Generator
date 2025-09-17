import { ProfessionName } from 'data/professions';
import type { TFile, App } from 'obsidian';

export type NpcContext = {
  culture: string;
  religion: string;
  state?: string;
  type?: string;
  population?: number;
  locationName: string;
  profession?: ProfessionName;
};

export const parseFrontmatter = (app: App, file: TFile): NpcContext | null => {
  const metadata = app.metadataCache.getFileCache(file);
  const fm = metadata?.frontmatter;

  if (!fm) {
    console.warn(`[NPC Generator] No frontmatter found in file: ${file.path}`);
    return null;
  }

  const { culture, religion, state, type, population } = fm;

  if (!culture || !religion) {
    console.warn(
      `[NPC Generator] Missing culture or religion in frontmatter: ${file.path}`,
    );
    return null;
  }

  return {
    culture,
    religion,
    state,
    type,
    population: typeof population === 'number' ? population : undefined,
    locationName: file.basename,
  };
};
