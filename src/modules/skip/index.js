const players = require('../../players');

module.exports = {
  name: 'skip',
  description: 'skip to next song in queue',
  execute: async (interaction) => {
    const player = players.get(interaction.guild.id);

    if (player == null) {
      interaction.reply('The bot is not connected to any voice channels.');
      return;
    }

    if (player.queue.length === 0) {
      interaction.reply('There is no more songs in the queue. (type `/disconnect` to stop the bot)');
      return;
    }

    const next = player.queue[0];
    player.playNextSong();

    interaction.reply(`Skipped to **${next.title}**!`);
  },
};
