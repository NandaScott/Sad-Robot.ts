"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var HypergeoCommand = /** @class */ (function () {
    function HypergeoCommand() {
        this.data = new discord_js_1.SlashCommandBuilder()
            .setName('hypergeo')
            .setDescription('Calculates the probability to draw a number of specific cards, given the number of copies in a deck.')
            .addNumberOption(function (builder) {
            return builder
                .setName('deck_size')
                .setDescription('Total number of cards in your deck.')
                .setRequired(true);
        })
            .addNumberOption(function (builder) {
            return builder
                .setName('copies_in_deck')
                .setDescription('Number of copies in your deck')
                .setRequired(true);
        })
            .addNumberOption(function (builder) {
            return builder
                .setName('cards_drawn')
                .setDescription('Number of cards being drawn/seen')
                .setRequired(true);
        })
            .addNumberOption(function (builder) {
            return builder
                .setName('copies_drawn')
                .setDescription('Number of copies you drew/saw')
                .setRequired(true);
        });
        this.formatter = Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
    HypergeoCommand.prototype.factorial = function (n) {
        if (n === 0 || n === 1)
            return 1;
        var result = 1;
        for (var i = 2; i <= n; i++)
            result *= i;
        return result;
    };
    HypergeoCommand.prototype.combination = function (n, k) {
        return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
    };
    HypergeoCommand.prototype.hypergeometric = function (N, K, n, k) {
        if (k > K || k > n || n - k > N - K)
            return 0; //impossible case
        var successComb = this.combination(K, k);
        var totalComb = this.combination(N, n);
        var failureComb = this.combination(N - K, n - k);
        return (successComb * failureComb) / totalComb;
    };
    HypergeoCommand.prototype.hypergeometricAtLeast = function (N, K, n, k) {
        var probability = 0;
        for (var i = k; i <= Math.min(K, n); i++) {
            probability += this.hypergeometric(N, K, n, i);
        }
        return probability;
    };
    HypergeoCommand.prototype.hypergeometricAtMost = function (N, K, n, k) {
        var probability = 0;
        for (var i = 0; i <= Math.min(k, K, n); i++) {
            probability += this.hypergeometric(N, K, n, i);
        }
        return probability;
    };
    HypergeoCommand.prototype.hypergeometricZero = function (N, K, n) {
        return this.hypergeometric(N, K, n, 0);
    };
    HypergeoCommand.prototype.getOptions = function (interaction) {
        if (!interaction.isChatInputCommand())
            return [];
        var values = interaction.options.data.map(function (_a) {
            var value = _a.value;
            return value;
        });
        if (values.some(function (num) { return Math.sign(num) === -1; })) {
            interaction.reply("\u26A0\uFE0F Inputs cannot be negative numbers.");
            return [];
        }
        return values;
    };
    HypergeoCommand.prototype.exec = function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        var options = this.getOptions(interaction);
        if (options.length === 0)
            return; // options errored
        var deckSize = options[0], copiesInDeck = options[1], cardsDrawn = options[2], copiesDrawn = options[3];
        if (copiesInDeck > deckSize || cardsDrawn > deckSize) {
            return interaction.reply("\u26A0\uFE0F Copies in deck (".concat(copiesInDeck, ") and cards drawn (").concat(cardsDrawn, ") must be less than or equal to the total deck size (").concat(deckSize, ")."));
        }
        var exactly = this.hypergeometric(deckSize, copiesInDeck, cardsDrawn, copiesDrawn);
        var exactPercentage = this.formatter.format(exactly);
        var atLeast = this.hypergeometricAtLeast(deckSize, copiesInDeck, cardsDrawn, copiesDrawn);
        var atLeastPercentage = this.formatter.format(atLeast);
        var atMost = this.hypergeometricAtMost(deckSize, copiesInDeck, cardsDrawn, copiesDrawn);
        var atMostPercentage = this.formatter.format(atMost);
        var zero = this.hypergeometricZero(deckSize, copiesInDeck, cardsDrawn);
        var zeroPercentage = this.formatter.format(zero);
        var message = [
            "# Hypergeometric Distribution Calculator",
            "Deck size: ".concat(deckSize),
            "Copies in deck: ".concat(copiesInDeck),
            "Cards drawn/seen: ".concat(cardsDrawn),
            "Copies drawn/seen: ".concat(copiesDrawn, "\n"),
            "*Exactly* ".concat(copiesDrawn, ":\t**").concat(exactPercentage, "**"),
            "*At least* ".concat(copiesDrawn, ":\t**").concat(atLeastPercentage, "**"),
            "*At most* ".concat(copiesDrawn, ":\t**").concat(atMostPercentage, "**"),
            "*Draw 0*:\t\t**".concat(zeroPercentage, "**"),
        ];
        return interaction.reply(message.join('\n'));
    };
    HypergeoCommand.prototype.toJSON = function () {
        return this.data.toJSON();
    };
    return HypergeoCommand;
}());
exports.default = HypergeoCommand;
