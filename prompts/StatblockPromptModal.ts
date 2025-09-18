import { NPCClass, npcClasses } from 'data/npcClasses';
import { App, Modal, Notice } from 'obsidian';

class StatblockPromptModal extends Modal {
  onSubmit: (cr: string, npcClass: NPCClass) => void;

  constructor(app: App, onSubmit: (cr: string, npcClass: string) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;

    console.log('Opened modal!! ');

    contentEl.createEl('h2', { text: 'Generate NPC Statblock' });

    const crInput = contentEl.createEl('input', {
      type: 'text',
      placeholder: 'Challenge Rating (e.g., 1/4, 2, 5)',
    });

    const classSelect = contentEl.createEl('select');
    Object.keys(npcClasses).forEach((option: NPCClass) => {
      classSelect.createEl('option', { text: option, value: option });
    });

    const submitBtn = contentEl.createEl('button', { text: 'Create' });
    submitBtn.addEventListener('click', () => {
      const cr = crInput.value.trim();
      const npcClass = classSelect.value;
      if (cr) {
        this.onSubmit(cr, npcClass as NPCClass);
        this.close();
      } else {
        new Notice('Please enter a valid Challenge Rating.');
      }
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

export default StatblockPromptModal;
