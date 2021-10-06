const players = require('../../players');
const {findOption} = require('../../utils');

module.exports = {
  name: 'delete',
  description: 'deletes a song from queue.',
  options: [
    {
      name: 'song_num',
      description: 'enter the song number you wish to delete (/queue to see the songs).',
      type: 3,
      required: true,
    },
  ],
  execute: (interaction) => {
    const player = players.get(interaction.guild.id);
    const option = findOption(interaction.options?._hoistedOptions, 'song_num');

    if (player == null) {
      interaction.reply('The bot is not connected to any voice channels.');
      return;
    }

    if (player.queue.length === 0) {
      interaction.reply('There is no more songs in the queue.');
      return;
    }

    const song = player.queue[option.value];

    if (song == null) {
      interaction.reply('Could not find song.');
      return;
    }

    player.queue.splice(option.value, 1);
    interaction.reply(`Deleted **${song.title}** from the queue!`);
  },
};
