// 讓音效每次播放時強制重播
Audio.prototype._play = Audio.prototype.play
Audio.prototype.play = function() {
    
    this.currentTime = 0;
    this._play()
}