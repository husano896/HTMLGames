import { Howl } from 'howler';
import $game from './game';

const $R = {
  Audio: {
    jump: new Howl({ src: 'audio/jump.mp3'})
  },
  Image: {
    bg: 'imgs/bg.jpg',
    eviat: 'imgs/5.png',
    jewelRed: 'imgs/jewelIcon/jewel1l-4.png',
    jewelBlue: 'imgs/jewelIcon/jewel1a-4.png',
    jewelBlueSmall: 'imgs/jewelIcon/jewel1a-2.png',
    closeBtn: 'imgs/closeBtn.png',
    bgBlue: 'imgs/bgblue.jpg',
    bgRed: 'imgs/bgred.jpg',
    bgYellow: 'imgs/bgyellow.jpg',
  },
  SpriteSheet: {
    li: 'imgs/M.json'
  }
}

$game.stop();
// 圖像處理部分
Object.entries($R.Image).forEach(([key, path]) => $game.loader.add(key, path));

// 圖像處理部分
Object.entries($R.SpriteSheet).forEach(([key, path]) => $game.loader.add(key, path));



export default $R;