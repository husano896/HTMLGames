import { Howl } from 'howler';
import $game from './game';

const $R = {
  Audio: {
    // music: new Howl({ src: 'audio/opium_and_purple_haze_dwatt.mp3' }),
    // tick: new Howl({ src: 'audio/tick.wav' })
    Success: new Howl({ src: 'audio/decision40.mp3' }),
    Fail:  new Howl({ src: 'audio/stupid3.mp3' }),
  },
  Image: {
    iconPause: 'imgs/pause_white.png',
    whygogo: 'imgs/whygogo.webp',
    whygogoR: 'imgs/whygogor.webp',
    timerBomb: 'imgs/timerBomb.webp',
    tile: 'imgs/tile.png',

    // 電梯背景
    lobby: 'imgs/lobby.png',
    // 旋轉寶貝夢夢
    eviatBall: 'imgs/eviat_ball.png',
    eviatFace: 'imgs/eviat_face.png'
  }
}
// 圖像處理部分
Object.entries($R.Image).forEach(([key, path]) => $game.loader.add(key, path));

export default $R;