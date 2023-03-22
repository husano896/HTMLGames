import { Window_Responsive } from "./Window_Responsive";
import { Container, Text, Graphics } from "pixi.js";
import { IResizeable } from "../Interfaces/IResizeable";
import $game from "@/main";
import { $TextStyle } from "@/constants";
import Items from "@/Data/Item";
import { IItem } from "@/Data/Item/IItem";

const MAXWIDTH = 320;
const padding = 8;

export class HomeInvetoryItem extends Container implements IResizeable{
  itemNameText: Text;
  itemDescriptionText: Text;

  itemAmountText: Text;
  bg: Graphics;
  constructor(item: IItem) {
    super();

    this.bg = new Graphics();
    this.bg.beginFill(0x0000aa, 0.25);
    this.bg.drawRect(0, 0, 128, 128);
    this.bg.endFill();
    this.itemNameText = new Text(
      item.name,
      $TextStyle.Window_HomeInvetoryItemTitle
    );

    this.itemDescriptionText = new Text(
      item.description,
      $TextStyle.Window_HomeInvetoryItemDescription
    );

    this.itemAmountText = new Text(
      "0",
      $TextStyle.Window_HomeInvetoryItemAmount
    );

    this.itemNameText.x = 8;
    this.itemNameText.y = 8;

    this.itemAmountText.x = this.width - 8 -this.itemAmountText.width;
    this.itemAmountText.y = this.itemNameText.y;
    this.itemDescriptionText.x = this.itemNameText.x;
    this.itemDescriptionText.y = this.itemNameText.y + 24;

    this.addChild(
      this.bg,
      this.itemNameText,
      this.itemAmountText,
      this.itemDescriptionText
    );
    this.onWindowResize();
  }

  onWindowResize() {
    if (this.parent) {
      this.bg.width = this.parent?.width - padding * 2;
    }

    this.itemAmountText.x = this.width - 8 -this.itemAmountText.width;
    this.itemDescriptionText.style.wordWrapWidth = this.bg.width - 16;
    console.log('item resize')
  }
}
/** 在養成畫面使用的道具欄視窗 */
export class Window_HomeInvetory
  extends Window_Responsive
  implements IResizeable
{
  constructor() {
    super();
    this.visible = false;

    Object.values(Items).forEach((i, index) => {
      const item = new HomeInvetoryItem(i);
      item.x = 8;
      item.y = 8 + index * (128 + 8);
      this.addChild(item);
    });
    this.onWindowResize();
  }
  update(delta: number) {
    super.update(delta);
  }

  onWindowResize() {
    this.bg.width = Math.min(MAXWIDTH, $game.screen.width / 2) - 32;
    this.bg.height = $game.screen.height - padding * 2 - 64;
    
    super.onWindowResize();
  }
}
