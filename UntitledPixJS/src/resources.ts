import { Assets } from 'pixi.js'
import { sound } from '@pixi/sound'

// TODO: 有些場景自己的資源要分配至各場景自己的Class

const $R = {
  Audio: {
    jump: 'audio/jump.mp3',
    confirm: '../shared/Audio/SE/F/ok.wav',
    cancel: '../shared/Audio/SE/F/cancel.wav',
    cursor: '../shared/Audio/SE/F/cursor.wav',
    piano: 'audio/piano.mp3',
    BGM_Mobile: 'audio/bgm/tamhe05.mp3',
    BGM_MobileMap: 'audio/bgm/tamhe10.mp3',
    BGM_Kaze2_Midnight: 'audio/bgm/midnight.mp3',
    BGM_Kaze2_Sakura: 'audio/bgm/tamsp13.mp3',
  },
  Image: {
    bg: 'imgs/bg.jpg',
    eviat: 'imgs/5.png',
    jewelRed: 'imgs/jewelIcon/jewel1l-4.png',
    jewelBlue: 'imgs/jewelIcon/jewel1a-4.png',
    jewelBlueSmall: 'imgs/jewelIcon/jewel1a-2.png',

    // 地圖地點
    MapPoint: 'imgs/jewelIcon/jewel1a-5.png',
    MapPointHome: 'imgs/jewelIcon/jewel1g-5.png',

    closeBtn: 'imgs/closeBtn.png',
    bgBlue: 'imgs/bgblue.jpg',
    bgRed: 'imgs/bgred.jpg',
    bgYellow: 'imgs/bgyellow.jpg',
    dragon: 'imgs/drg_walk.png',
    dragonSleep: 'imgs/drg_sleep.png',
    dragonBack: 'imgs/drg_back.png',
    dragonFlying: 'imgs/drg_flying.png',
    dragonShy: 'imgs/drg_shy.png',
    dragonWake: 'imgs/drg_wake.png'
  },
  SpriteSheet: {
    li: 'imgs/M.json'
  }
}

export enum AudioKeys {
  jump = 'jump',
  confirm = 'confirm',
  cancel = 'cancel',
  cursor = 'cursor',
  piano = 'piano',
  BGM_Mobile = 'BGM_Mobile',
  BGM_MobileMap = 'BGM_MobileMap',
  BGM_Kaze2_Midnight = 'BGM_Kaze2_Midnight',
  BGM_Kaze2_Sakura = 'BGM_Kaze2_Sakura'
}

export const onResourceReady = new Promise(async (resolve, reject) => {
  // 聲音處理部分
  Object.entries($R.Audio).forEach(([key, path]) => sound.add(key, path))

  // 圖像處理部分
  await Promise.all(Object.entries($R.Image).map(([key, path]) => Assets.load(path)))

  // SpriteSheet處理部分
  await Promise.all(Object.entries($R.SpriteSheet).map(([key, path]) => Assets.load(path)))
  resolve(Assets)
})

export default $R;