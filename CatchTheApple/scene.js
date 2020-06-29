var Scene_Play = function() {

    update = function(game){
        game.drawText('SC', 0, 0, { size: 16, color: 'white', font:'Arial' });
    }
    return this
}
Game.$scene = Scene_Play();