const {VoiceConnectionStatus} = require('@discordjs/voice');
const Player = require('./player');

class Players {
  constructor() {
    this.players = new Map();
  }

  create(guildId, connection) {
    const player = new Player(connection);
    this.players.set(guildId, player);
    connection.once(VoiceConnectionStatus.Disconnected, () => this.delete(guildId));

    return player;
  }

  get(guildId) {
    return this.players.get(guildId);
  }

  delete(guildId) {
    const player = this.players.get(guildId);

    player.connection.destroy();
    this.players.delete(guildId);
  }
}

module.exports = new Players();
