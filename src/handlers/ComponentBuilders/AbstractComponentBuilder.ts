import { MappedComponentBuilderTypes } from 'discord.js';

export type AllBuilderTypes =
  MappedComponentBuilderTypes[keyof MappedComponentBuilderTypes];

export default abstract class AbstractComponentBuilder {
  abstract createComponent(): AllBuilderTypes;
}
