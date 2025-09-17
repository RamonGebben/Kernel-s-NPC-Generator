import { App, TFile } from 'obsidian';
import { parseYaml } from 'obsidian';
import { NpcContext } from './parseFrontmatter';

export const getFrontmatterData = async (
  file: TFile,
  app: App,
): Promise<NpcContext | null> => {
  const raw = await app.vault.read(file);
  const match = raw.match(/^---\n([\s\S]*?)\n---/);

  if (!match) return null;

  try {
    const yaml = parseYaml(match[1]);
    return {
      culture: yaml.culture,
      religion: yaml.religion,
      state: yaml.state,
      population: yaml.population,
      type: yaml.type,
      locationName: file.basename,
    };
  } catch {
    return null;
  }
};
