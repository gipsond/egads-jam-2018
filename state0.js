/* global Phaser game */

var blockRPG = {}

var cursors
var walls
var player

blockRPG.state0 = function () {}
blockRPG.state0.prototype = {

  preload: function () {
    game.load.tilemap('stage0', 'assets/tilemaps/stage0.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.image('grid', 'assets/tilemaps/grid.png')
    game.load.image('walls', 'assets/tilemaps/walls.png')

    game.load.spritesheet('player', 'assets/sprites/spritesheets/gelatinous_block.png', 16, 16)
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE) // Redundant, already enabled by default

    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
    game.scale.setUserScale(2, 2)
    game.renderer.renderSession.roundPixels = true
    Phaser.Canvas.setImageRenderingCrisp(game.canvas)

    var map = game.add.tilemap('stage0')
    map.addTilesetImage('grid')
    map.addTilesetImage('walls')

    map.createLayer('grid')
    walls = map.createLayer('walls')

    map.setCollisionBetween(1, 12, true, 'walls')

    player = game.add.sprite(16, 16, 'player')
    player.animations.add('idle', [0, 1, 2, 3, 4])
    player.animations.play('idle', 3, true)

    game.physics.arcade.enable(player, Phaser.Physics.ARCADE)

    cursors = game.input.keyboard.createCursorKeys()
  },

  tween: null,

  update: function () {
    if (this.tween === null || !this.tween.isRunning) {
      if (cursors.up.isDown) {
        this.tween = this.addMovementTween({ y: '-16' })
      } else if (cursors.down.isDown) {
        this.tween = this.addMovementTween({ y: '+16' })
      } else if (cursors.left.isDown) {
        this.tween = this.addMovementTween({ x: '-16' })
      } else if (cursors.right.isDown) {
        this.tween = this.addMovementTween({ x: '+16' })
      }
    }

    game.physics.arcade.collide(player, walls, function () { console.log('bumpin uglies') })

  },

  addMovementTween: function (tweenProps) {
    const TWEEN_TIME = 250
    return game.add.tween(player.body.position).to(tweenProps, TWEEN_TIME, Phaser.Easing.Bounce.Out, true)
  }

}
