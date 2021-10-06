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
      interaction.reply('There is no more songs in the queue.');
      return;
    }

    player.playNextSong();
    const {currentlyPlaying} = player;

    interaction.reply(`Skipped to **${currentlyPlaying.title}**!`);
  },
};
