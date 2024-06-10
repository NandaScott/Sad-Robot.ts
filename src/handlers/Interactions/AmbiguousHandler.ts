import {
  ActionRow,
  ActionRowBuilder,
  ComponentType,
  StringSelectMenuBuilder,
  StringSelectMenuComponent,
  StringSelectMenuInteraction,
} from 'discord.js';
import AmbiguousRowBuilder from '../ComponentBuilders/AmbiguousRowBuilder';
import DropDownBuilder from '../ComponentBuilders/DropDownBuilder';

export default class AmbiguousHandler {
  static handleAmbiguousRows(
    interaction: StringSelectMenuInteraction
  ): ActionRowBuilder<StringSelectMenuBuilder>[] {
    return (
      interaction.message.components
        // Capture only dropdown rows
        .filter(
          (row): row is ActionRow<StringSelectMenuComponent> =>
            row.components[0].data.type === ComponentType.StringSelect &&
            row.components[0].customId !== interaction.customId
        )
        .map((rowData) => {
          const compData = rowData.components[0];
          if (compData.placeholder === null) throw new Error();

          const row = new AmbiguousRowBuilder();
          const dropdown = new DropDownBuilder(compData.placeholder);
          row.addComponent(dropdown.createComponent());
          return row.createComponent();
        })
    );
  }
}
