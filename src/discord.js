require('dotenv').config();

const {Client, Intents} = require('discord.js');

const {DISCORD_TOKEN} = process.env;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

client.login(DISCORD_TOKEN);

module.exports = client;
