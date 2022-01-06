$R = {
    Audio: {
        jump: 'audio/jump.mp3'
    },
    Image: {
        eviat: 'img/5.png',
        bg: 'img/bg.jpg'
    }
}

// 聲音處理部分
Object.entries($R.Audio).forEach(([key, path]) => $R.Audio[key] = new Howl({ src: path }));

// 圖像處理部分
Object.entries($R.Image).forEach(([key, path]) => $game.loader.add(key, path));