import { IResizeable } from './../Interfaces/IResizeable';
import { Container, Graphics, IDestroyOptions } from 'pixi.js';

/** 自適應型視窗, 其實一般型的引用這個也可以...? */
export class Window_Responsive extends Container implements IResizeable {

    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;

    bg: Graphics;

    lastVisible: boolean;
    constructor() {
        super();
        this.bg = new Graphics();

        this.addChild(this.bg);
        window.addEventListener("resize", this.onWindowResize.bind(this));
        this.onWindowResize();
    }
    onWindowResize() {
        this.bg.clear();
        // 對Background的重新調整
        this.bg.beginFill(0x333377, 0.5);
        this.bg.drawRect(0, 0, this.width, this.height);
    }

    update(delta: number) {
        this.children.forEach(child => (child as any).update?.(delta))

        if (this.visible !== this.lastVisible) {
            this.lastVisible = this.visible;
        }
        if (this.visible) {
            // 作為淡入用
            this.alpha = Math.min(1, (this.alpha + delta * (1 - this.alpha) / 20));
        } else {
            this.alpha = 0
        }
    }

    // 因為有註冊到window事件, 需以Destroy正確方式解除事件註冊！
    destroy(options?: boolean | IDestroyOptions | undefined): void {
        window.removeEventListener("resize", this.onWindowResize.bind(this))
        super.destroy(options);
    }

}