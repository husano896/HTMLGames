var Scene_Play = function() {

    update = function(game){
        game.drawText('分數', 0, 0, { size: 24, color: 'white', font:'標楷體' });
    }
    return this
}
Game.$scene = Scene_Play();