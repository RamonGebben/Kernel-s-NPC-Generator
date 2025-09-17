import { FuzzySuggestModal, App } from 'obsidian';
import type { ProfessionName } from '../data/professions';

class ProfessionSuggestModal extends FuzzySuggestModal<ProfessionName> {
  constructor(
    app: App,
    private professions: ProfessionName[],
    private onSelect: (profession: ProfessionName) => void,
  ) {
    super(app);
  }

  getItems(): ProfessionName[] {
    return this.professions;
  }

  getItemText(item: ProfessionName): string {
    return item;
  }

  onChooseItem(item: ProfessionName): void {
    this.onSelect(item);
  }
}

export default ProfessionSuggestModal;
