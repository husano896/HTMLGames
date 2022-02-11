import * as PIXI from 'pixi.js';
import { $TextStyle } from '../constants';

// 動畫持續時間
const animLength = 60;

// 血條長度
const width = 128;

const height = 8;
export class Sprite_HealthBar extends PIXI.Container {

  // 最後結算時的值
  private lastVal: number;

  // 血量最大值
  private maxVal: number = 0;

  // 目前顯示中未結算的值
  private displayVal: number = 0;
  // 目前動畫剩餘時間
  private animStartVal: number = 0;
  private animTime: number = 0;
  private graphicVal: PIXI.Graphics;
  private graphicDelta: PIXI.Graphics;

  text: PIXI.Text;
  constructor() {
    super();

    this.graphicVal = new PIXI.Graphics();
    this.graphicDelta = new PIXI.Graphics();

    this.text = new PIXI.Text('0', $TextStyle.Sprite_HealthBar);
    this.text.anchor.set(1, 0);
    this.text.x = width;
    const bg = new PIXI.Graphics();
    bg.beginFill(0x222222);
    bg.drawRect(0, 0, width, height);
    bg.endFill();
    bg.y = 12;
    this.graphicVal.beginFill(0x00aa00);
    this.graphicVal.drawRect(0, 0, width, height);
    this.graphicVal.endFill();

    this.graphicDelta.beginFill(0xaa0000);
    this.graphicDelta.drawRect(0, 0, width, height);
    this.graphicDelta.endFill();
    this.graphicVal.scale.x = 0;
    this.graphicDelta.scale.x = 0;
    this.graphicDelta.y = 12;
    this.graphicVal.y = 12;
    this.addChild(bg, this.graphicVal, this.graphicDelta, this.text);
    console.log(this);
  }

  update(delta: number) {
    if (!this.maxVal) {
      return;
    }
    if (this.animTime > 0) {
      this.animTime -= delta;
      this.displayVal = this.animTime > 0 ? this.animStartVal - (this.animStartVal - this.lastVal) * Math.cos(this.animTime * Math.PI / animLength / 2)
        : this.lastVal;
      // 還未結算的部分以紅色顯示
    }
    // 左側已顯示的
    const scaleVal = Math.min(1, this.lastVal / this.maxVal);
    this.graphicVal.scale.x = scaleVal;
    // 右側尚未結算的
    const scaleDelta = Math.min((this.displayVal - this.lastVal) / this.maxVal);
    this.graphicDelta.scale.x = scaleDelta;
    this.graphicDelta.x = this.graphicVal.x + width * scaleVal;
    this.text.text = Math.round(this.displayVal).toString();
  }

  setHealth(current: number, max?: number) {
    this.lastVal = current;
    if (max) {
      this.maxVal = max;
    }
  }
  // 把目前的數值變更進行結算
  flush() {
    this.animStartVal = this.displayVal;
    this.animTime = animLength;
  }
}