const {MessageEmbed} = require('discord.js');
const players = require('../../players');

module.exports = {
  name: 'queue',
  description: 'shows current song queue',
  execute: (interaction) => {
    const player = players.get(interaction.guild.id);

    if (player == null) {
      interaction.reply('The bot is not connected to any voice channels.');
      return;
    }

    const {queue, currentlyPlaying} = player;

    if (queue.length === 0 && currentlyPlaying == null) {
      interaction.reply('The queue is currently empty.');
      return;
    }

    let text = `Up Next:\n`;

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, song] of Object.entries(player.queue)) {
      text = `${text}\n[${index}] - ${song.title}`;
    }

    const embed = new MessageEmbed()
      .setTitle(`🎵 [Currently Playing]\n**${currentlyPlaying.title}**`)
      .setDescription(`\`\`\`${text}\`\`\``)
      .setThumbnail(currentlyPlaying.thumbnail_url);

    interaction.reply({embeds: [embed]});
  },
};
