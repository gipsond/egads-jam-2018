/* global Phaser game */

var blockRPG = {}

blockRPG.state0 = function () {}
blockRPG.state0.prototype = {

  preload: function () {
    game.load.tilemap('stage0', 'assets/tilemaps/stage0.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.image('grid', 'assets/tilemaps/grid.png')
    game.load.image('walls', 'assets/tilemaps/walls.png')

    game.load.spritesheet('player', 'assets/sprites/spritesheets/gelatinous_block.png', 16, 16)
  },

  create: function () {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
    game.scale.setUserScale(2, 2)
    game.renderer.renderSession.roundPixels = true
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)

    var map = game.add.tilemap('stage0')
    map.addTilesetImage('grid')
    map.addTilesetImage('walls')

    map.createLayer('grid')
    map.createLayer('walls')

    var player = game.add.sprite(16, 16, 'player')
    player.animations.add('idle', [0, 1, 2, 3, 4])
    player.animations.play('idle', 3, true)
  },

  update: function () {}

}
