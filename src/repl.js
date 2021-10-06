const repl = require('repl');

const r = repl.start('> ');
const commands = require('./interactions');
const players = require('./players');

Object.defineProperty(r.context, 'commands', {
  configurable: false,
  enumerable: true,
  value: commands,
});

Object.defineProperty(r.context, 'players', {
  configurable: false,
  enumerable: true,
  value: players,
});
