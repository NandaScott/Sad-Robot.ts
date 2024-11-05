import { SlashCommandBuilder } from 'discord.js';
export default class HypergeoCommand {
  constructor() {
    this.data = new SlashCommandBuilder().setName('hypergeo').setDescription('Calculates the probability to draw a number of specific cards, given the number of copies in a deck.').addNumberOption(builder => builder.setName('deck_size').setDescription('Total number of cards in your deck.').setRequired(true)).addNumberOption(builder => builder.setName('copies_in_deck').setDescription('Number of copies in your deck').setRequired(true)).addNumberOption(builder => builder.setName('cards_drawn').setDescription('Number of cards being drawn/seen').setRequired(true)).addNumberOption(builder => builder.setName('copies_drawn').setDescription('Number of copies you drew/saw').setRequired(true));
    this.formatter = Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }
  combination(n, k) {
    return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
  }
  hypergeometric(N, K, n, k) {
    if (k > K || k > n || n - k > N - K) return 0; //impossible case

    const successComb = this.combination(K, k);
    const totalComb = this.combination(N, n);
    const failureComb = this.combination(N - K, n - k);
    return successComb * failureComb / totalComb;
  }
  hypergeometricAtLeast(N, K, n, k) {
    let probability = 0;
    for (let i = k; i <= Math.min(K, n); i++) {
      probability += this.hypergeometric(N, K, n, i);
    }
    return probability;
  }
  hypergeometricAtMost(N, K, n, k) {
    let probability = 0;
    for (let i = 0; i <= Math.min(k, K, n); i++) {
      probability += this.hypergeometric(N, K, n, i);
    }
    return probability;
  }
  hypergeometricZero(N, K, n) {
    return this.hypergeometric(N, K, n, 0);
  }
  getOptions(interaction) {
    if (!interaction.isChatInputCommand()) return [];
    const values = interaction.options.data.map(({
      value
    }) => value);
    if (values.some(num => Math.sign(num) === -1)) {
      interaction.reply(`⚠️ Inputs cannot be negative numbers.`);
      return [];
    }
    return values;
  }
  exec(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const options = this.getOptions(interaction);
    if (options.length === 0) return; // options errored

    const [deckSize, copiesInDeck, cardsDrawn, copiesDrawn] = options;
    if (copiesInDeck > deckSize || cardsDrawn > deckSize) {
      return interaction.reply(`⚠️ Copies in deck (${copiesInDeck}) and cards drawn (${cardsDrawn}) must be less than or equal to the total deck size (${deckSize}).`);
    }
    const exactly = this.hypergeometric(deckSize, copiesInDeck, cardsDrawn, copiesDrawn);
    const exactPercentage = this.formatter.format(exactly);
    const atLeast = this.hypergeometricAtLeast(deckSize, copiesInDeck, cardsDrawn, copiesDrawn);
    const atLeastPercentage = this.formatter.format(atLeast);
    const atMost = this.hypergeometricAtMost(deckSize, copiesInDeck, cardsDrawn, copiesDrawn);
    const atMostPercentage = this.formatter.format(atMost);
    const zero = this.hypergeometricZero(deckSize, copiesInDeck, cardsDrawn);
    const zeroPercentage = this.formatter.format(zero);
    const message = [`# Hypergeometric Distribution Calculator`, `Deck size: ${deckSize}`, `Copies in deck: ${copiesInDeck}`, `Cards drawn/seen: ${cardsDrawn}`, `Copies drawn/seen: ${copiesDrawn}\n`, `*Exactly* ${copiesDrawn}:\t**${exactPercentage}**`, `*At least* ${copiesDrawn}:\t**${atLeastPercentage}**`, `*At most* ${copiesDrawn}:\t**${atMostPercentage}**`, `*Draw 0*:\t\t**${zeroPercentage}**`];
    return interaction.reply(message.join('\n'));
  }
  toJSON() {
    return this.data.toJSON();
  }
}