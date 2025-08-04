import { Howl } from 'howler';
import $game from './game';

const $R = {
  Audio: {
    // tick: new Howl({ src: 'audio/tick.wav' })
    Success: new Howl({ src: 'audio/decision40.mp3' }),
    Fail: new Howl({ src: 'audio/stupid3.mp3' }),
    Correct: new Howl({ src: 'audio/SEcorrect.mp3' }),
    InCorrect: new Howl({ src: 'audio/SEincorrect.mp3' }),
    // 逃跑嘎嗚吼 失敗效果音
    anWolfFail: new Howl({ src: 'audio/ah.mp3' }),
    anWolfWow: new Howl({ src: 'audio/wow.mp3' }),

    ME_Success: new Howl({ src: 'audio/success.mp3' }),
    ME_Fail: new Howl({ src: 'audio/fail.mp3' }),
    ME_Midgame: new Howl({ src: 'audio/midgame.mp3' }),
    ME_Gameover: new Howl({ src: 'audio/gameover.mp3' }),
    ME_result: new Howl({ src: 'audio/result.mp3' }),
    ME_retry: new Howl({ src: 'audio/retry.mp3' }),
    // 輕快型：手風琴
    ME_game1: new Howl({ src: 'audio/game1.mp3' }),
    // 謹慎型：Kick + 電吉他
    ME_game2: new Howl({ src: 'audio/game2.mp3' }),
    // 輕快型：Steel Drums
    ME_game3: new Howl({ src: 'audio/game3.mp3' }),
    // 音樂節奏 Listen Go：Drum + Piano + synth
    ME_game4: new Howl({ src: 'audio/game4.mp3' }),
    // 輕快型：Flute
    ME_game5: new Howl({ src: 'audio/game5.mp3' }),
    // 俄羅斯方塊相關
    ME_game6: new Howl({ src: 'audio/game6.mp3' }),
    //
    SE_Nom: new Howl({ src: 'audio/SEnom.mp3' }),
    //
    SE_Decision39: new Howl({ src: 'audio/decision39.mp3' }),

    // Fire from https://soundeffect-lab.info/sound/battle/
    SE_Fire: new Howl({ src: 'audio/SEFire.mp3' }),
    SE_HandClap: new Howl({ src: 'audio/SEHandclap.mp3' })
    //https://www.youtube.com/watch?v=PJ_QgB7bAnM
  },
  Image: {
    //#region 遊戲基礎資源 
    // 時間炸彈
    timerBomb: 'imgs/timerBomb.webp',
    //暫停
    iconPause: 'imgs/pause_white.png',
    // 生命
    life: 'imgs/life.png',
    // 電梯背景
    lobby: 'imgs/lobby.png',
    //#endregion

    // 歪狗狗
    whygogo: 'imgs/whygogo.webp',
    whygogoR: 'imgs/whygogor.webp',
    // 旋轉寶貝夢夢
    eviatBall: 'imgs/eviat_ball.png',
    eviatFace: 'imgs/eviat_face.png',
    // 逃跑嘎嗚吼
    anDra: 'imgs/anDra.webp',
    anWolf: 'imgs/anWolf.webp',
    anWolfAAA: 'imgs/anWolfAAA.webp',
    anWolfRainbow: 'imgs/anWolfR.webp',
    // 大助貓貓
    daisukeMeowMeow: 'imgs/daisukeMeowMeow.gif',

    // 蛋糕
    EatCake1: 'imgs/EatCake/cake1.png',
    EatCake2: 'imgs/EatCake/cake2.png',
    EatCake3: 'imgs/EatCake/cake3.png',
    EatCake4: 'imgs/EatCake/cake4.png',

    // 小卡-100
    CaraguaTop: 'imgs/Caragua/top.png',
    CaraguaBottom: 'imgs/Caragua/bottom.png',
    CaraguaM100: 'imgs/Caragua/m100.png',

    // 寬寬
    KuangKuan1: 'imgs/KuangKuan/1.png',
    KuangKuan2: 'imgs/KuangKuan/2.png',
    KuangKuanBuffet: 'imgs/KuangKuan/buffet.png',

    // KC
    KC1: 'imgs/KC/1.png',
    KC2: 'imgs/KC/2.png',

    // 烤雪豹！
    CookFilmBG: 'imgs/CookFilm/bg.png',
    CookFilm1: 'imgs/CookFilm/1.png',
    CookFilm2: 'imgs/CookFilm/2.png',
    CookFilm3: 'imgs/CookFilm/3.png',
    CookFilmFire: 'imgs/CookFilm/fire.png',

    // 接住掉落小卡
    SadCheese: 'imgs/CaraguaCheese/sadCheese.png',
    FallingCaragua: 'imgs/CaraguaCheese/fallingCaragua.png',
    HugCaragua: 'imgs/CaraguaCheese/hugCaragua.png',
  }
}
// 圖像處理部分
Object.entries($R.Image).forEach(([key, path]) => $game.loader.add(key, path));

export default $R;