/* global Phaser game */

var blockRPG = {}

blockRPG.state0 = function () {}
blockRPG.state0.prototype = {
  preload: function () {
    game.load.tilemap('stage0', 'assets/tilemaps/stage0.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.image('grid', 'assets/tilemaps/grid.png')
    game.load.image('walls', 'assets/tilemaps/walls.png')
  },
  create: function () {
    var map = game.add.tilemap('stage0')
    map.addTilesetImage('grid')
    map.addTilesetImage('walls')

    map.createLayer('grid')
    map.createLayer('walls')
  },
  update: function () {}
}
