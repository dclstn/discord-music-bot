const players = require('../../players');

module.exports = {
  name: 'disconnect',
  description: 'disconnect the bot.',
  execute: async (interaction) => {
    players.delete(interaction.guild.id);
    interaction.reply('Stopped playing.');
  },
};
