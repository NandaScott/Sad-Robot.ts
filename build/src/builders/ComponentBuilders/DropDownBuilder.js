import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import AbstractComponentBuilder from "./AbstractComponentBuilder.js";
export default class DropDownBuilder extends AbstractComponentBuilder {
  type = 'Dropdown';
  options = [];
  constructor(placeholder, options) {
    super();
    this.placeholder = placeholder;
    this.dropdownId = [this.type, Math.random()].join(':');
    // Mock network call to autocomplete
    this.options = options.map(opt => new StringSelectMenuOptionBuilder({
      label: opt,
      value: opt
    }));
  }
  createComponent() {
    return new StringSelectMenuBuilder({
      customId: this.dropdownId,
      placeholder: this.placeholder
    }).setOptions(this.options);
  }
}