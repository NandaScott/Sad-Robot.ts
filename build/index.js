"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const dotenv = __importStar(require("dotenv"));
const command_manager_1 = __importDefault(require("./command-manager"));
const deploy_commands_1 = __importDefault(require("./deploy-commands"));
const button_handler_1 = __importDefault(require("./handlers/button-handler"));
const utils_1 = require("./utils/utils");
dotenv.config();
const intents = new discord_js_1.IntentsBitField();
intents.add(discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMessages, discord_js_1.IntentsBitField.Flags.MessageContent);
const client = new discord_js_1.Client({ intents });
const comman = new command_manager_1.default();
client.once('ready', () => {
    console.log('Ready!');
    (0, deploy_commands_1.default)();
});
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    // This should be handled better
    try {
        const { author, content } = message;
        if (author.bot)
            return;
        if (!(0, utils_1.isCardDeclaration)(content))
            return;
        const cardDecs = (0, utils_1.getCardDeclarations)(content);
        const cards = (0, utils_1.scrubDeclarationSyntax)(cardDecs);
        const scryfallResp = (0, utils_1.fetchAllCards)(cards);
        const resolvedCards = yield (0, utils_1.resolveScryfallResp)(scryfallResp);
        const row = new builders_1.ActionRowBuilder()
            .addComponents(resolvedCards.map((card) => new builders_1.ButtonBuilder()
            .setCustomId(card.id)
            .setLabel(card.name)
            .setStyle(discord_js_1.ButtonStyle.Primary)));
        yield message.reply({ components: [row] });
    }
    catch (e) {
        console.error(e);
        yield message.reply({ content: "Something went wrong." });
    }
}));
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.isButton()) {
        (0, button_handler_1.default)(interaction);
    }
    if (interaction.isSelectMenu()) {
        interaction.reply({ content: interaction.values[0], ephemeral: true });
    }
    if (interaction.isChatInputCommand()) {
        const command = comman.get(interaction.commandName);
        if (!command)
            return;
        try {
            yield command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            yield interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}));
client.login(process.env.TOKEN);
