const players = require('../../players');

module.exports = {
  name: 'disconnect',
  description: 'disconnect the bot.',
  execute: async (interaction) => {
    const player = players.get(interaction.guild.id);

    if (player == null) {
      interaction.reply('The bot is not connected to any voice channels.');
      return;
    }

    players.delete(interaction.guild.id);
    interaction.reply('Stopped playing.');
  },
};
