import { IResizeable } from "./../Interfaces/IResizeable";
import { Container, Graphics, IDestroyOptions } from "pixi.js";
import $game from "@/main";

/** 自適應型視窗, 其實一般型的引用這個也可以...? */
export class Window_Responsive extends Container implements IResizeable {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  padding: number;
  bg: Graphics;

  lastVisible: boolean;
  constructor() {
    super();
    this.bg = new Graphics();

    this.addChild(this.bg);
    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
  }
  onWindowResize() {
    this.onPreWindowResize();
    this.onPostWindowResize();
  }

  onPreWindowResize() {
    this.bg.clear();
    this.calculateBounds();
    // 對Background的重新調整
    this.bg.beginFill(0x333377, 0.5);
    this.bg.drawRect(0, 0, (this.width + (this.padding || 0)), this.height + (this.padding || 0));
    this.bg.endFill();
  }

  onPostWindowResize() {

    this.calculateBounds();
    this.children.forEach((v: any) => v.onWindowResize?.());
  }

  update(delta: number) {
    this.children.forEach((child) => (child as any).update?.(delta));

    if (this.visible !== this.lastVisible) {
      this.lastVisible = this.visible;
    }
    if (this.visible) {
      // 作為淡入用
      this.alpha = Math.min(1, this.alpha + (delta * (1 - this.alpha)) / 15);
    } else {
      this.alpha = 0;
    }
  }

  // 因為有註冊到window事件, 需以Destroy正確方式解除事件註冊！
  destroy(options?: boolean | IDestroyOptions | undefined): void {
    window.removeEventListener("resize", this.onWindowResize);
    super.destroy({ children: true });
  }

  /** 將視窗於螢幕置中 */
  centerWindow() {
    this.x = ($game.screen.width - this.width) / 2
    this.y = ($game.screen.height - this.height) / 2
  }

}
