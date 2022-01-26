import { Howl } from 'howler';
import $game from './game';

const $R = {
  Audio: {
    jump: new Howl({ src: 'audio/jump.mp3'})
  },
  Image: {
    bg: 'imgs/bg.jpg',
    eviat: 'imgs/5.png',
  },
  SpriteSheet: {
    li: 'imgs/M.json'
  }
}

$game.stop();
// 圖像處理部分
Object.entries($R.Image).forEach(([key, path]) => $game.loader.add(key, path));

// 圖像處理部分
Object.entries($R.SpriteSheet).forEach(([key, path]) => $game.loader.add('spritesheet', path));



export default $R;