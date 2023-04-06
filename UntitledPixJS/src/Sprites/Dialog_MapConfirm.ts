import { Sprite_Button } from './Sprite_Button';
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

    callback?: (result) => any

    minWidth = 320;
    minHeight = 128;
    constructor() {
        super();
        // 標題
        this.titleText = new Text('', $TextStyle.Dialog_MapConfirm_Title)
        this.titleText.x = 8;
        this.titleText.y = 8;

        // 內文
        this.descriptionText = new Text('', $TextStyle.Dialog_MapConfirm_Description,)
        this.descriptionText.x = 8;
        this.descriptionText.y = this.titleText.y + Number($TextStyle.Dialog_MapConfirm_Title.fontSize) + 8

        // 動作按紐
        this.OKButton = new Sprite_Button('OK', null, {
            width: 48,
            height: 32,
        })
        this.OKButton.interactive = true;
        this.OKButton.on('pointerdown', () => {
            this.Close(true);

        })
        this.CancelButton = new Sprite_Button('Cancel', null, {
            width: 48,
            height: 32,
        })
        this.CancelButton.interactive = true;
        this.CancelButton.on('pointerdown', () => {
            this.Close();
        })

        this.addChild(this.titleText, this.descriptionText, this.OKButton, this.CancelButton);
        this.visible = false;
    }

    onWindowResize() {
        if (!this.descriptionText) {
            return;
        }
        super.onWindowResize();
        this.descriptionText.style.wordWrapWidth = this.width - 16;

        // 動作按紐的位置
        this.OKButton.x = this.width - this.OKButton.width;
        this.OKButton.y = this.descriptionText.y + this.descriptionText.height + 32;
        this.CancelButton.x = this.OKButton.x - this.CancelButton.width - 8;
        this.CancelButton.y = this.OKButton.y;

        this.centerWindow();
    }

    Open(title: string, description: string, callback?: (result) => void) {
        this.titleText.text = title;
        this.descriptionText.text = description;
        this.visible = true;
        this.callback = callback;
        this.onWindowResize();
    }

    Close(result?: boolean) {
        this.callback?.(result);
        this.visible = false;
    }
}