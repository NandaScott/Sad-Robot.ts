import { ComponentType } from 'discord.js';
import SuccessRowBuilder from "../../builders/ComponentBuilders/SuccessRowBuilder.js";
import SuccessButtonBuilder from "../../builders/ComponentBuilders/SuccessButtonBuilder.js";
export default class SuccessRows {
  static handleSuccessRows(interaction) {
    const selectedValue = interaction.values[0];
    const buttonRows = interaction.message.components
    // Capture only button rows
    .filter(row => row.components.every(comp => comp.type === ComponentType.Button));
    const successRows = buttonRows.length === 0 // Check to see if any button rows exist
    ? [new SuccessRowBuilder()] // If they don't create a single row builder
    : buttonRows // Otherwise, work with the rows we have.
    // Transform component data into data for row builder
    .map(row => row.components.map(comp => ({
      ...comp.data,
      customId: comp.customId
    })))
    // Create a new set of row builders, and rebuild the button components
    .map(rowData => {
      const row = new SuccessRowBuilder();
      function test(data) {
        return data.type === ComponentType.Button;
      }
      rowData.forEach(compData => {
        if (test(compData)) {
          if (!compData.label) throw new Error(); // TODO
          if (!compData.customId) throw new Error(); // TODO

          const cardId = compData.customId.split(':').pop();
          if (!cardId) throw new Error(); // TODO

          const button = new SuccessButtonBuilder(compData.label, cardId);
          row.addComponent(button.createComponent());
        }
      });
      return row;
    });
    const lastSuccessRow = successRows.every(row => row.row.components.length === 4) ? new SuccessRowBuilder() : successRows.pop();
    if (lastSuccessRow instanceof SuccessRowBuilder) {
      const newButton = new SuccessButtonBuilder(selectedValue, selectedValue);
      lastSuccessRow.addComponent(newButton.createComponent());
    }
    if (lastSuccessRow !== undefined) {
      successRows.push(lastSuccessRow);
    }
    return successRows.map(row => row.createComponent());
  }
}