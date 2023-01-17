import { Assets } from 'pixi.js'
import { sound } from '@pixi/sound'

// TODO: 有些場景自己的資源要分配至各場景自己的Class

const $R = {
  Audio: {
    jump: 'audio/jump.mp3'
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