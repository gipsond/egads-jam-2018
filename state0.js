/* global Phaser game */

var blockRPG = {}

var cursors
var walls
var player
var circlemen
var scoreText
var score = 0

const BLOCK_WIDTH = 16

blockRPG.state0 = function () {}
blockRPG.state0.prototype = {

  preload: function () {
    game.load.tilemap('stage0', 'assets/tilemaps/stage0.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.image('grid', 'assets/tilemaps/grid.png')
    game.load.image('walls', 'assets/tilemaps/walls.png')
    game.load.spritesheet('player', 'assets/sprites/spritesheets/gelatinous_block.png', 16, 16)
    game.load.spritesheet('circleman', 'assets/sprites/spritesheets/circleman.png', 16, 16)

    game.load.bitmapFont('pixeled', 'assets/fonts/pixeled0.png', 'assets/fonts/pixeled0.fnt')
  },

  create: function () {
    // Pixel perfect scaling setup
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
    game.scale.setUserScale(2, 2)
    game.renderer.renderSession.roundPixels = true
    Phaser.Canvas.setImageRenderingCrisp(game.canvas)

    // Tilemap setup
    var map = game.add.tilemap('stage0')
    map.addTilesetImage('grid')
    map.addTilesetImage('walls')

    // Layer setup
    map.createLayer('grid')
    walls = map.createLayer('walls')

    // Player setup
    player = game.add.sprite(BLOCK_WIDTH * 1, BLOCK_WIDTH * 1, 'player')
    player.animations.add('idle', [0, 1, 2, 3, 4])
    player.animations.play('idle', 3, true)

    // Enemy setup
    circlemen = game.add.group()
    circlemen.enableBody = true
    const CIRCLE_LOCATIONS = [
      [1, 7],
      [3, 4],
      [7, 9],
      [4, 16]
    ]
    CIRCLE_LOCATIONS.forEach(this.addCircleman)

    // Physics setup
    game.physics.startSystem(Phaser.Physics.ARCADE) // Redundant, already enabled by default
    map.setCollisionBetween(1, 14, true, 'walls')
    game.physics.arcade.enable(player, Phaser.Physics.ARCADE)

    // Cursor key input setup
    cursors = game.input.keyboard.createCursorKeys()

    // Text setup
    var scoreBacking = game.add.graphics(0, 0)
    scoreBacking.beginFill(0x000000)
    scoreBacking.drawRect(3, 3, 63, 10)
    scoreText = game.add.bitmapText(5, 4, 'pixeled', 'DOWN to Start', 5)
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function (event, stateID) { updateScoreText(score) }, null, null, 'state0')
  },

  addCircleman: function (value) {
    circlemen.create(BLOCK_WIDTH * value[0], BLOCK_WIDTH * value[1], 'circleman')
  },

  tween: null,

  update: function () {
    const MOV_SPEED = 150

    if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
      if (cursors.up.isDown) {
        player.body.velocity.y -= MOV_SPEED
      } else if (cursors.down.isDown) {
        player.body.velocity.y += MOV_SPEED
      } else if (cursors.left.isDown) {
        player.body.velocity.x -= MOV_SPEED
      } else if (cursors.right.isDown) {
        player.body.velocity.x += MOV_SPEED
      }
    }

    game.physics.arcade.collide(player, walls)
    game.physics.arcade.overlap(player, circlemen, this.killCircleman, null, this)
  },

  killCircleman (player, circleman) {
    circleman.kill()
    score += 5
    updateScoreText(score)
  }
}

function drawText (x, y, text, fontSize, speed, width) {
  return game.add.bitmapText(x, y, 'pixeled', text, fontSize)
}

function updateScoreText (score) {
  scoreText.text = 'Score: ' + score
}