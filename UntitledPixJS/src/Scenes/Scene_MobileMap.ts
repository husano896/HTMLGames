import { Dialog_MapConfirm } from './../Sprites/Dialog_MapConfirm';
import $game from "@/main";
import {
  FederatedEvent,
  FederatedPointerEvent,
  Sprite,
  Text,
  Texture,
} from "pixi.js";
import { Scene } from "./scene";
import $R, { AudioKeys } from "../resources";
import { ShowLoading, Sprite_Button, Sprite_Loading } from "../Sprites";
import { sound } from "@pixi/sound";
import _ from "lodash-es";
import { $TextStyle } from "@/constants";
import { IMapMobile } from "@/Data/MapMobile";
import Maps from "@/Data/MapMobile";
import { ChangeScene } from '../constants';

/** 地圖位置Sprite */
class Sprite_MapMobile extends Sprite {
  nameText: Text;

  constructor(map: IMapMobile) {
    super();

    const image = map.image instanceof Function ? map.image() : map.image;
    this.texture = Texture.from(image || $R.Image.MapPoint);
    this.interactive = true;
    this.cursor = "pointer";
    this.nameText = new Text(
      map.name instanceof Function ? map.name() : map.name,
      $TextStyle.Sprite_MapMobile
    );
    this.nameText.anchor.set(0.5, 0);

    this.nameText.y = this.texture.height;
    this.nameText.x = this.texture.width / 2;
    this.addChild(this.nameText);
  }
}

/** 手機版遊戲地圖 */
export class Scene_MobileMap extends Scene {
  /** 背景, 可拖移, 且地圖地點與龍龍寄宿於上面 */
  bg: Sprite;

  /** 返回按鈕 */
  backButton: Sprite_Button;

  /** 地圖拖移用 */
  lastPointerX: number;
  lastPointerY: number;

  /* fingers: { [fingerId: string]: { x; y; startX; startY } } = {}; */

  /** 指到的地點的文字 */
  mapNameText: Text;

  /** 乖龍龍 */
  dragon: Sprite;

  /** 要前往的目的地, 作為移動平滑用 */
  targetX: number;
  targetY: number;

  sprite_loading: Sprite_Loading;

  dialog_MapConfirm: Dialog_MapConfirm;
  constructor() {
    super();

    sound.stopAll();

    // 背景
    this.bg = Sprite.from($R.Image.bgRed);
    this.addChild(this.bg);

    // 乖龍龍
    this.dragon = Sprite.from($R.Image.dragon);
    this.dragon.anchor.set(0.5);
    this.dragon.scale.set(0.5);
    this.dragon.x = 0;
    this.dragon.y = 0;

    this.targetX = 0;
    this.targetY = 0;

    this.bg.addChild(this.dragon)

    // 地圖上的點
    for (let map of Maps) {
      const spr = new Sprite_MapMobile(map);

      spr.x =
        (map.x instanceof Function ? map.x() : map.x) ||
        Math.random() * this.bg.width;
      spr.y =
        (map.y instanceof Function ? map.y() : map.y) ||
        Math.random() * this.bg.height;
      spr.interactive = true;

      spr.on('pointerdown', (ev) => {
        // 角色移動到地圖上指定的點
        this.targetX = spr.x;
        this.targetY = spr.y;

        sound.play(AudioKeys.cursor);

        this.dialog_MapConfirm.Open(
          map.name instanceof Function ? map.name() : map.name,
          map.description instanceof Function ? map.description() : map.description,
          async (result) => {
            if (!result) {

              sound.play(AudioKeys.cancel);
              return;
            }

            sound.play(AudioKeys.piano);

            // 回家 <3
            if (map.home) {
              await ChangeScene((await import("@/Scenes/Scene_Mobile")).default)
              return;
            }

            // 前往下個地點！
            this.sprite_loading.visible = true;
            map.events.forEach(e=>{
              if (e.condition()) {
                e.payload()
              }
            })
          })
      })
      this.bg.addChild(spr);
    }

    // 回家按鈕
    this.backButton = new Sprite_Button("回家", undefined, {
      width: 64,
      height: 64,
    });
    this.backButton.callback = async () => {
      ShowLoading();
      await ChangeScene((await import("@/Scenes/Scene_Mobile")).default)
    };
    this.addChild(this.backButton);

    // Dialog
    this.dialog_MapConfirm = new Dialog_MapConfirm()
    this.addChild(this.dialog_MapConfirm);

    //
    this.onWindowResize();

    // BGM播放
    sound.play(AudioKeys.BGM_MobileMap, { loop: true });

    // 點擊事件聆聽
    this.bg.interactive = true;
    this.bg.on("pointerdown", this.onPointerDown.bind(this));

    this.bg.on("pointerup", this.onPointerUp.bind(this));
    this.bg.on("pointermove", this.onPointerMove.bind(this));

  }

  onDestroy() {
    this.bg.off("pointerdown", this.onPointerDown.bind(this));
    this.bg.off("pointermove", this.onPointerMove.bind(this));
    super.onDestroy();
  }

  update(delta: number) {
    this.dragon.x += (this.targetX - this.dragon.x) / (Math.max(1, 16 / delta));
    this.dragon.y += (this.targetY - this.dragon.y) / (Math.max(1, 16 / delta));
    super.update(delta);
  }

  /** 滑鼠移動, 用來處理拖移地圖用 */

  onPointerDown(ev: FederatedPointerEvent) {
    this.lastPointerX = ev.x;
    this.lastPointerY = ev.y;

  }

  onPointerUp(ev: FederatedPointerEvent) {
    this.lastPointerX = ev.x;
    this.lastPointerY = ev.y;

    /*
    const fingerId = ev.pointerId;

    if (this.fingers[fingerId]) {
      this.fingers[fingerId] = null;
    }

    ev.preventDefault();
    */
  }

  onPointerMove(ev: FederatedPointerEvent) {
    // 有按下按鈕時
    if (ev.buttons) {
      this.bg.x += ev.x - this.lastPointerX;
      this.bg.y += ev.y - this.lastPointerY;
    }
    this.bg.x = Math.min(
      0,
      Math.max(-this.bg.width + $game.screen.width, this.bg.x)
    );
    this.bg.y = Math.min(
      0,
      Math.max(-this.bg.height + $game.screen.height, this.bg.y)
    );

    this.lastPointerX = ev.x;
    this.lastPointerY = ev.y;

    // 計算手指們的距離以調整縮放
    /*
    let fingerArray = Object.values(this.fingers).filter((f) => !!f);
    try {
      if (fingerArray.length >= 2) {
        const fingerId = ev.pointerId;
        const deltaX = ev.x - this.fingers[fingerId].x;
        const deltaY = ev.y - this.fingers[fingerId].y;
        // 畫布的移動
        this.bg.x += deltaX;
        this.bg.y += deltaY;

        // 移動前的對各手指距離
        const beforeFingerDistance = _.sum(
          fingerArray.map((f, index) => {
            if (index === 0) {
              return;
            }

            return Math.sqrt(
              (f.x - fingerArray[0].x) ** 2 + (f.y - fingerArray[0].y) ** 2
            );
          })
        );
        // 移動後的對各手指距離

        this.fingers[fingerId].x = ev.x;
        this.fingers[fingerId].y = ev.y;

        fingerArray = Object.values(this.fingers).filter((f) => !!f);
        // 移動前的對各手指距離
        const afterFingerDistance = _.sum(
          fingerArray.map((f, index) => {
            if (index === 0) {
              return;
            }

            return Math.sqrt(
              (f.x - fingerArray[0].x) ** 2 + (f.y - fingerArray[0].y) ** 2
            );
          })
        );
        this.bg.scale.set(
          this.bg.scale.x + (afterFingerDistance / beforeFingerDistance - 1)
        );

        this.distanceText.text = `before ${beforeFingerDistance} after ${afterFingerDistance} scale ${this.bg.scale.x} finger count ${fingerArray.length}`;
      }
    } catch (err) {
      this.distanceText.text = String(err);
    }
    console.log(ev);
    ev.preventDefault();
    */
  }

  /** 遊戲視窗變更大小時 */
  onWindowResize() {
    super.onWindowResize();
    // this.window_message.y = $game.screen.height - this.window_message.height - 16;
    this.backButton.x = $game.screen.width - this.backButton.width - 16;
    this.backButton.y = $game.screen.height - this.backButton.height - 16;

    if (
      $game.screen.width < $game.screen.height ||
      $game.screen.width / $game.screen.height < 16 / 9
    ) {
      // 直向時, 直向填滿
      this.bg.height = $game.screen.height;
      this.bg.width = (this.bg.height / 9) * 16;
    } else {
      //橫向時, 橫向填滿
      this.bg.width = $game.screen.width;
      this.bg.height = (this.bg.width / 16) * 9;
    }
    this.bg.x = 0;
    this.bg.y = 0;
  }
}
export default Scene_MobileMap;