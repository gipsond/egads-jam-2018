/* global Phaser blockRPG */

const WINDOW_WIDTH = 512
const WINDOW_HEIGHT = 288

var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO)
game.state.add('state0', blockRPG.state0)
game.state.add('state1', blockRPG.state1)
game.state.start('state0')
