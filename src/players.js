const {VoiceConnectionStatus} = require('@discordjs/voice');
const Player = require('./player');

class Players {
  constructor() {
    this.players = new Map();
  }

  createPlayer(guildId, connection) {
    const player = new Player(connection);

    this.players.set(guildId, player);

    connection.on(VoiceConnectionStatus.Disconnected, () => {
      this.deletePlayer(guildId);
      connection.destroy();
    });

    return player;
  }

  getPlayer(guildId) {
    return this.players.get(guildId);
  }

  deletePlayer(guildId) {
    this.players.delete(guildId);
  }
}

module.exports = new Players();
