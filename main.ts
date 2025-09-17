import { Plugin, Notice, TFile, normalizePath, Editor } from 'obsidian';
import { NpcContext } from './utils/parseFrontmatter';
import { PROFESSIONS, ProfessionName } from './data/professions';
import { generateNpcMarkdown } from 'generators/npcGenerator';
import { getFrontmatterData } from 'utils/getFrontmatterData';
import ProfessionSuggestModal from 'prompts/ProfessionSuggestModal';
import { getRandom } from 'utils/getRandom';

export default class NpcGeneratorPlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu, editor, view) => {
        const file = view.file;
        if (!file || !file.path.startsWith('World/burgs')) return;

        menu.addItem(item => {
          item
            .setTitle('Create NPC for this Location')
            .setIcon('user-plus')
            .onClick(() => {
              this.createNpcFromFile(file, editor);
            });
        });
      }),
    );
  }

  async createNpcFromFile(file: TFile, editor: Editor) {
    const context = await getFrontmatterData(file, this.app);

    if (
      !context ||
      !context.culture ||
      !context.religion ||
      !context.locationName
    ) {
      new Notice('Missing required frontmatter on location.');
      return;
    }

    const answer = await this.promptForProfession();
    const profession = answer ?? getRandom(PROFESSIONS).name;

    if (!profession) return;

    const npcContext: NpcContext = { ...context };
    const markdown = generateNpcMarkdown(npcContext, profession);
    const npcName = markdown.match(/## 🧙 NPC: (.+)/)?.[1] ?? 'Unnamed NPC';

    const linkPath = await this.createNpcFile(
      markdown,
      context.locationName,
      npcName,
    );

    if (linkPath) {
      // Insert the link at the cursor location
      const wikiLink = `[[${npcName}]]`;
      editor.replaceSelection(wikiLink);
    }
  }

  async createNpcFile(
    markdown: string,
    locationName: string,
    npcName: string,
  ): Promise<string | null> {
    const safeLocation = locationName.replace(/[\\/:"*?<>|]+/g, '_');
    const safeName = npcName.replace(/[\\/:"*?<>|]+/g, '_');

    const folderPath = normalizePath(`World/NPCs/${safeLocation}`);
    const filePath = normalizePath(`${folderPath}/${safeName}.md`);

    // Ensure folder exists
    try {
      await this.app.vault.createFolder(folderPath);
    } catch (err) {
      if (!err.message.includes('Folder already exists')) {
        console.error(err);
        new Notice(`Failed to create folder: ${folderPath}`);
        return null;
      }
    }

    try {
      await this.app.vault.create(filePath, markdown);
      new Notice(`NPC "${npcName}" created at ${filePath}`);
      return filePath; // ← this is the link we'll use
    } catch (err) {
      console.error(err);
      new Notice(`Error creating NPC: ${err.message}`);
      return null;
    }
  }

  async promptForProfession(): Promise<ProfessionName | null> {
    return new Promise(resolve => {
      new ProfessionSuggestModal(
        this.app,
        PROFESSIONS.map(p => p.name),
        selected => resolve(selected),
      ).open();
    });
  }
}
