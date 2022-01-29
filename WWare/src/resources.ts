import { Howl } from 'howler';
import $game from './game';

const $R = {
  Audio: {
    // music: new Howl({ src: 'audio/opium_and_purple_haze_dwatt.mp3' }),
    // tick: new Howl({ src: 'audio/tick.wav' })
    Success: new Howl({ src: 'audio/decision40.mp3' }),
    Fail: new Howl({ src: 'audio/stupid3.mp3' }),

    // 逃跑嘎嗚吼 失敗效果音
    anWolfFail: new Howl({ src: 'audio/ah.mp3' }),
    anWolfWow: new Howl({ src: 'audio/wow.mp3' }),
    //https://www.youtube.com/watch?v=PJ_QgB7bAnM
  },
  Image: {
    iconPause: 'imgs/pause_white.png',
    // 歪狗狗
    whygogo: 'imgs/whygogo.webp',
    whygogoR: 'imgs/whygogor.webp',
    // 時間炸彈
    timerBomb: 'imgs/timerBomb.webp',
    // 廁所磁磚
    tile: 'imgs/tile.png',
    // 電梯背景
    lobby: 'imgs/lobby.png',
    // 旋轉寶貝夢夢
    eviatBall: 'imgs/eviat_ball.png',
    eviatFace: 'imgs/eviat_face.png',
    // 逃跑嘎嗚吼
    anDra: 'imgs/anDra.webp',
    anWolf: 'imgs/anWolf.webp',
    anWolfAAA: 'imgs/anWolfAAA.webp',
    anWolfRainbow: 'imgs/anWolfR.webp'
  }
}
// 圖像處理部分
Object.entries($R.Image).forEach(([key, path]) => $game.loader.add(key, path));

export default $R;