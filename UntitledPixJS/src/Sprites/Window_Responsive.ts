import { Container, IDestroyOptions } from 'pixi.js';
/** 自適應型視窗,  */
export class Window_Responsive extends Container {

    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;

    constructor() {
        super();
        window.addEventListener("resize", this.onResize.bind(this));
    }
    update() { }

    // 因為有註冊到window事件, 需以Destroy正確方式解除事件註冊！
    destroy(options?: boolean | IDestroyOptions | undefined): void {
        window.removeEventListener("resize", this.onResize.bind(this))
        super.destroy(options);
    }

    onResize() {
        
    }
}