import { ComponentType } from 'discord.js';
import AmbiguousRowBuilder from "../../builders/ComponentBuilders/AmbiguousRowBuilder.js";
import DropDownBuilder from "../../builders/ComponentBuilders/DropDownBuilder.js";
export default class AmbiguousHandler {
  static handleAmbiguousRows(interaction) {
    return interaction.message.components
    // Capture only dropdown rows
    .filter(row => row.components[0].data.type === ComponentType.StringSelect && row.components[0].customId !== interaction.customId).map(rowData => {
      const compData = rowData.components[0];
      if (compData.placeholder === null) throw new Error();
      const row = new AmbiguousRowBuilder();
      const options = compData.options.map(opt => opt.label);
      const dropdown = new DropDownBuilder(compData.placeholder, options);
      row.addComponent(dropdown.createComponent());
      return row.createComponent();
    });
  }
}