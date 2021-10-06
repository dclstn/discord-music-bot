const {joinVoiceChannel} = require('@discordjs/voice');
const players = require('../../players');

function findOption(options, query) {
  return options.find((option) => option.name === query);
}

module.exports = {
  name: 'play',
  description: 'adds a song to queue',
  options: [
    {
      name: 'url',
      description: 'Enter a Youtube video URL',
      type: 3,
      required: true,
    },
  ],
  execute: async (interaction) => {
    const url = findOption(interaction.options?._hoistedOptions, 'url');
    const {voice} = interaction.member;

    if (!voice) {
      interaction.reply('You must be in a voice channel.');
      return;
    }

    let player = players.getPlayer(interaction.guild.id);

    if (player == null) {
      const connection = joinVoiceChannel({
        channelId: voice.channelId,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      player = players.createPlayer(interaction.guildId, connection);
    }

    try {
      const song = await player.addSong(url.value);
      interaction.reply(`Added **${song.title}** to the queue.`);
    } catch (err) {
      interaction.reply('Error: invalid youtube URL.');
    }
  },
};
