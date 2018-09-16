/* global game blockRPG Phaser score drawText */

blockRPG.state1 = function () { }
blockRPG.state1.prototype = {
  preload: function () {
    game.load.bitmapFont('pixeled', 'assets/fonts/pixeled0.png', 'assets/fonts/pixeled0.fnt')
  },
  create: function () {
    game.stage.backgroundColor = '#000000'
    drawText(game.width / 2 - 50, game.height / 2 - 40, 'You Won!', 10, null, null)
    drawText(game.width / 2 - 100, game.height / 2 - 15, 'The circlemen knights have been vanquished\n and the dungeon is at peace once more.', 5, null, null)
    drawText(game.width / 2 - 41, game.height / 2 + 15, 'Score: ' + score + ' / 150', 5, null, null)
    drawText(game.width / 2 - 43, game.height / 2 + 35, "'R' to Restart", 5, null, null)

    game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(function (event, stateID) { game.state.start(stateID) }, null, null, 'state0')
  },
  update: function () {}
}
