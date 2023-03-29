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
import { Sprite_Button } from "../Sprites";
import { sound } from "@pixi/sound";
import _ from "lodash-es";
import { $TextStyle } from "@/constants";
import { IMapMobile } from "@/Data/MapMobile";
import Maps from "@/Data/MapMobile";

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
  bg: Sprite;

  point: Sprite;
  backButton: Sprite_Button;

  lastPointerX: number;
  lastPointerY: number;

  fingers: { [fingerId: string]: { x; y; startX; startY } } = {};

  maps: Array<Sprite_MapMobile>;

  /** 指到的地點的文字 */
  mapNameText: Text;
  constructor() {
    super();

    // 背景
    this.bg = Sprite.from($R.Image.bgRed);
    this.addChild(this.bg);

    // 地圖上的點
    for (let map of Maps) {
      const spr = new Sprite_MapMobile(map);

      spr.x =
        (map.x instanceof Function ? map.x() : map.x) ||
        Math.random() * this.bg.width;
      spr.y =
        (map.y instanceof Function ? map.y() : map.y) ||
        Math.random() * this.bg.height;

      this.bg.addChild(spr);
    }

    // 回家路點
    this.point = Sprite.from($R.Image.MapPointHome);

    this.point.x = 200;
    this.point.y = 200;
    this.point.interactive = true;
    this.point.cursor = "pointer";
    this.bg.addChild(this.point);

    // 回家按鈕
    this.backButton = new Sprite_Button("回家", null, {
      width: 64,
      height: 64,
    });
    this.backButton.callback = async () => {
      const newScene = await import("@/Scenes/Scene_Mobile").then(
        (m) => m.Scene_Mobile
      );

      $game.stage.children.forEach((c) => c.destroy({ children: true }));
      $game.stage.removeChildren();
      $game.stage.addChild(new newScene());
    };
    this.addChild(this.backButton);
    this.onWindowResize();
    console.log(this);

    this.interactive = true;

    this.on("pointerdown", this.onPointerDown.bind(this));

    this.on("pointerup", this.onPointerUp.bind(this));
    this.on("pointermove", this.onPointerMove.bind(this));

    sound.stopAll();
    sound.play(AudioKeys.BGM_MobileMap, { loop: true });
  }

  onDestroy() {
    this.off("pointerdown", this.onPointerDown.bind(this));
    this.off("pointermove", this.onPointerMove.bind(this));
    super.onDestroy();
  }

  update(delta: number) {}

  /** 滑鼠移動, 用來處理拖移地圖用 */

  onPointerDown(ev: FederatedPointerEvent) {
    this.lastPointerX = ev.x;
    this.lastPointerY = ev.y;

    /*
    const fingerId = ev.pointerId;

    this.fingers[fingerId] = {
      x: ev.x,
      y: ev.y,
      startX: ev.x,
      startY: ev.y,
    };

    ev.preventDefault();
    */
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
