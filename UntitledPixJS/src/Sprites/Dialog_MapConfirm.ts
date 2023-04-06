import $game from '../main';
import { $TextStyle } from '../constants';
import { IResizeable } from '../Interfaces/IResizeable';
import { Window_Responsive } from './Window_Responsive';
import { Text, Container } from 'pixi.js'
import { Sprite_Loading } from './Sprite_Loading';

/** 在地圖畫面中確定地點的提示Dialog */
export class Dialog_MapConfirm extends Window_Responsive implements IResizeable {

    titleText: Text;
    descriptionText: Text;

    OKButton: Container;
    CancelButton: Container;

    constructor() {
        super();

        // 標題
        this.titleText = new Text('', $TextStyle.Dialog_MapConfirm_Title)
        this.titleText.x = 8;
        this.titleText.y = 8;

        // 內文
        this.descriptionText = new Text('', $TextStyle.Dialog_MapConfirm_Description)
        this.descriptionText.x = 8;
        this.descriptionText.y = this.titleText.y + Number($TextStyle.Dialog_MapConfirm_Title.fontSize) + 8


        // 動作按紐
        this.OKButton = new Text('OK', $TextStyle.Dialog_MapConfirm_Title)
        this.CancelButton = new Text('Cancel', $TextStyle.Dialog_MapConfirm_Title)


        this.addChild(this.titleText, this.descriptionText, this.OKButton, this.CancelButton);
        this.onWindowResize();
    }

    onWindowResize() {
        super.onWindowResize();
        this.descriptionText.style.wordWrapWidth = this.width - 16;
    }

    Open(title: string, description: string) {
        this.titleText.text = title;
        this.descriptionText.text = description;
        this.visible = true;
    }

    Close() {
        this.visible = false;
    }
}