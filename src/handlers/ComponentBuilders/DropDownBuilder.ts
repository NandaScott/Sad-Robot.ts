import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js';
import AbstractComponentBuilder from './AbstractComponentBuilder';

export default class DropDownBuilder extends AbstractComponentBuilder {
  dropdownId: string;
  type: string = 'Dropdown';
  options: StringSelectMenuOptionBuilder[] = [];
  placeholder: string;

  constructor(placeholder: string) {
    super();
    this.placeholder = placeholder;
    this.dropdownId = [this.type, Math.random()].join(':');
    // Mock network call to autocomplete
    this.options = ['Card1', 'Card2', 'Card3'].map(
      (opt) => new StringSelectMenuOptionBuilder({ label: opt, value: opt })
    );
  }

  createComponent() {
    return new StringSelectMenuBuilder({
      customId: this.dropdownId,
      placeholder: this.placeholder,
    }).setOptions(this.options);
  }
}
