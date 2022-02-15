import * as PIXI from 'pixi.js';
import { IMapData } from '../Interfaces/IMapData';

export class Sprite_Map extends PIXI.Container {
    map: IMapData;
    constructor(
        map: any // 要載入的地圖
    ) {
        super();
        this.map = new map();

        // 設定為zIndex有效
        this.sortableChildren = true;

        // 設定地圖大小
        this.width = this.map.width;
        this.height = this.map.height;

        this.map.items.forEach((i) => {
            const spr = PIXI.Sprite.from(i.texture);
            spr.x = i.x;
            spr.y = i.y;
            spr.zIndex = i.layer;
            if (i.onInteract) {
                // 目前先用滑鼠接觸
                spr.interactive = true;
                spr.buttonMode = true;

                spr.on('pointerdown', i.onInteract.bind(spr));
            }
            if (i.update) {
                Object.defineProperty(spr, 'update', ((delta: number) => {
                    i.update(spr, delta);
                }));
            }
            this.addChild(spr);
        })
    }

    update(delta?: number) {
        this.children.forEach((c: any) => c.update?.(delta));
    }
}