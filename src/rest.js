require('dotenv').config();

const { REST } = require("@discordjs/rest");

module.exports = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
