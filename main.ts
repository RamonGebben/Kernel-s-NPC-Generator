import { Plugin, Notice, TFile, normalizePath, Editor } from 'obsidian';
import { NpcContext } from './utils/parseFrontmatter';
import { PROFESSIONS, ProfessionName } from './data/professions';
import { generateNpcMarkdown } from 'generators/npcGenerator';
import { getFrontmatterData } from 'utils/getFrontmatterData';
import ProfessionSuggestModal from 'prompts/ProfessionSuggestModal';
import { getRandom } from 'utils/getRandom';
import { generateNpcStatblock } from 'generators/statblock';
import StatblockPromptModal from 'prompts/StatblockPromptModal';
import { NPCClass } from 'data/npcClasses';

export default class NpcGeneratorPlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu, editor, view) => {
        const file = view.file;
        if (file && file.path.startsWith('World/burgs')) {
          menu.addItem(item => {
            item
              .setTitle('Create NPC for this Location')
              .setIcon('user-plus')
              .onClick(() => {
                this.createNpcFromFile(file, editor);
              });
          });
        }
        if (file && file.path.startsWith('World/NPCs')) {
          menu.addItem(item => {
            item
              .setTitle('Add Statblock for current NPC')
              .setIcon('user-plus')
              .onClick(() => {
                const modal = new StatblockPromptModal(
                  this.app,
                  async (cr, npcClass: NPCClass) => {
                    const name = file.basename;
                    const block = generateNpcStatblock(name, cr, npcClass);

                    const currentContent = await this.app.vault.read(file);
                    await this.app.vault.modify(
                      file,
                      `${currentContent}\n\n${block}`,
                    );
                    new Notice('Statblock added!');
                  },
                );
                modal.open();
              });
          });
        }
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
    const markdown = await generateNpcMarkdown(npcContext, profession);
    const npcName = markdown.match(/## 🧙 NPC: (.+)/)?.[1] ?? 'Unnamed NPC';

    await this.createNpcFile(markdown, context.locationName, npcName);
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
