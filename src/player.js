const {AudioPlayerStatus, createAudioPlayer, createAudioResource} = require('@discordjs/voice');
const {default: axios} = require('axios');
const ytdl = require('ytdl-core-discord');

function fetchMetaData(url) {
  return axios.get(`https://www.youtube.com/oembed?url=${url}&format=json`);
}

module.exports = class Player {
  constructor(connection) {
    this.queue = [];
    this.connection = connection;
    this.audio = createAudioPlayer();
    this.currentlyPlaying = null;

    this.connection.subscribe(this.audio);
    this.audio.on(AudioPlayerStatus.Idle, () => this.playNextSong());
  }

  async addSong(requestUrl) {
    const {data: meta} = await fetchMetaData(requestUrl);

    const song = {
      url: requestUrl,
      ...meta,
    };

    this.queue.push(song);

    if (this.audio.state.status === 'idle') {
      await this.playNextSong();
    }

    return song;
  }

  async playNextSong() {
    if (this.queue.length === 0) {
      this.currentlyPlaying = null;
      return;
    }

    const next = this.queue.shift();
    const stream = await ytdl(next.url, {filter: 'audioonly'});
    const resource = createAudioResource(stream);

    this.currentlyPlaying = next;
    this.audio.play(resource);
  }
};
