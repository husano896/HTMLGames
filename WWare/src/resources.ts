import { Howl } from 'howler';
import $game from './game';

const $R = {
  Audio: {
    // music: new Howl({ src: 'audio/opium_and_purple_haze_dwatt.mp3' }),
    // tick: new Howl({ src: 'audio/tick.wav' })
  },
  Image: {
    iconPause: 'imgs/pause_white.png',
    whygogo: 'imgs/whygogo.webp',
    whygogoR: 'imgs/whygogor.webp',
    timerBomb: 'imgs/timerBomb.webp',
    tile: 'imgs/tile.png'
  }
}
// 圖像處理部分
Object.entries($R.Image).forEach(([key, path]) => $game.loader.add(key, path));

export default $R;