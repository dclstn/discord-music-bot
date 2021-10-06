require('dotenv').config();

const {joinVoiceChannel} = require('@discordjs/voice');
const search = require('youtube-search');
const players = require('../../players');
const {findOption} = require('../../utils');

const {YOUTUBE_KEY} = process.env;

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

    if (voice.channelId == null) {
      interaction.reply('You must be in a voice channel.');
      return;
    }

    let player = players.get(interaction.guild.id);

    if (player == null) {
      const connection = joinVoiceChannel({
        channelId: voice.channelId,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      player = players.create(interaction.guildId, connection);
    }

    let song;

    try {
      if (
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/g.test(
          url.value
        )
      ) {
        song = await player.addSong(url.value);
      } else {
        const {results} = await search(url.value, {
          key: YOUTUBE_KEY,
          maxResults: 1,
        });

        song = await player.addSong(results[0]);
      }

      interaction.reply(`Added **${song?.title}** to the queue.`);
    } catch (err) {
      console.log(err);
      interaction.reply('Error: invalid youtube URL.');
    }
  },
};
