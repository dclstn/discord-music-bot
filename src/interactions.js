const {Routes} = require('discord-api-types/v9');
const fs = require('fs/promises');
const rest = require('./rest');
const client = require('./discord');

const {GUILD_ID, CLIENT_ID} = process.env;

class CommandHandler {
  constructor() {
    this.init();
    client.on('interactionCreate', (interaction) => this.handleInteraction(interaction));
  }

  async init() {
    await this.loadInteractions();
    await this.updateGuildCommands();
  }

  async loadInteractions() {
    this.interactions = new Map();

    const modules = await fs.readdir('./src/modules');

    modules.forEach((module) => {
      const interaction = require(`./modules/${module}/index.js`);
      this.interactions.set(interaction.name, interaction);
    });
  }

  async updateGuildCommands() {
    try {
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: this.getCommands(),
      });
    } catch (err) {
      console.error(`Failed to update guild commands: ${err}`);
      process.exit(1);
    }
  }

  async updateGlobalCommands() {
    try {
      await rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: this.getCommands(),
      });
    } catch (err) {
      console.error(`Failed to update guild commands: ${err}`);
      process.exit(1);
    }
  }

  getCommands() {
    return [...this.interactions.values()].map(({name, description, options}) => ({name, description, options}));
  }

  async handleInteraction(interaction) {
    const module = this.interactions.get(interaction.commandName);

    try {
      await module.execute(interaction);
    } catch (err) {
      interaction.reply(`Something went wrong: ${err}`);
    }
  }
}

module.exports = new CommandHandler();
