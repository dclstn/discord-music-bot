const players = require('../../players');

module.exports = {
  name: 'queue',
  description: 'shows current song queue',
  execute: (interaction) => {
    const player = players.getPlayer(interaction.guild.id);

    if (player == null) {
      interaction.reply('The bot is not connected to any voice channels.');
      return;
    }

    const {queue, currentlyPlaying} = player;

    if (queue.length === 0 && currentlyPlaying == null) {
      interaction.reply('The queue is currently empty.');
      return;
    }

    let text = `[Currently Playing] - ${currentlyPlaying.title}`;

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, song] of Object.entries(player.queue)) {
      text = `${text}\n[${index}] - ${song.title}`;
    }

    interaction.reply(text);
  },
};
