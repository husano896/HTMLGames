// 讓音效每次播放時強制重播
Audio.prototype._play = Audio.prototype.play
Audio.prototype.play = function() {
    this.currentTime = 0;
    this._play()
}
// 使聲音初始化時可以用chain的方式取得一個已經設定好src的物件
Audio.prototype.setSrc = function(filename) {
    this.src = filename;
	this.load();
	return this;
}

// 使聲音初始化時可以用chain的方式取得一個已經設定好src的物件
Image.prototype.setSrc = function(filename) {
    this.src = filename;
	return this;
}