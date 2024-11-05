import { GatewayIntentBits } from 'discord.js';
const intents = [GatewayIntentBits.Guilds,
// Required for Guild interaction
GatewayIntentBits.GuildMessages,
// Required to listen for messages
GatewayIntentBits.MessageContent,
// Required to read message contents
GatewayIntentBits.DirectMessages // Required to send emphemeral messages
];
export default intents;