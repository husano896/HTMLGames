import { GameConsts } from '../constants';
import { IMapData } from "../Interfaces/IMapData";
import $R from '../resources';
import { Sprite } from 'pixi.js';
import { MapEnum } from './MapEnum';
export class Map001 implements IMapData {
    name = "Map01"
    width = GameConsts.width
    height = GameConsts.height

    frame = 0;
    items = [
        // 背景
        {
            layer: MapEnum.Layer_None,
            texture: $R.Image.bg,
            width: 800,
            height: 600,
            x: 0,
            y: 0,
        },
        {
            layer: MapEnum.Layer_Normal,
            texture: $R.Image.jewelBlue,
            x: 400,
            y: 400,
            update: (spr: Sprite, delta: number) => {

            }
        }
    ]
}