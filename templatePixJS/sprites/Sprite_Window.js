class Sprite_Window extends PIXI.Container {

    constructor(title = 'Title') {

        super();
        // 外框
        const outLine = new PIXI.Graphics();
        outLine.lineStyle(2, 0x002222, 4);
        outLine.beginFill(0x0055AA, 0.5);
        outLine.drawRoundedRect(0, 0, 300, 400, 8);
        outLine.endFill();

        // 關閉按鈕
        const closeButton = new PIXI.Graphics();
        closeButton.x = 300 - 24 - 8;
        closeButton.y = 8;
        closeButton.beginFill(0xbb0000);
        closeButton.drawRect(0, 0, 24, 24);
        closeButton.interactive = true;
        closeButton.buttonMode = true;
        closeButton.on('pointerdown', this.onCloseButtonClick.bind(this));

        // 標題列
        const titleBar = new PIXI.Graphics();
        titleBar.beginFill(0x00AAFF, 0.75);
        titleBar.drawRect(8, 8, 300 - 8 * 2 - 24 - 8, 24,);
        titleBar.endFill();
        titleBar.interactive = true;
        titleBar.on('pointerdown', this.onTitleBarDown.bind(this));
        titleBar.on('pointermove', this.onTitleBarMove.bind(this));
        titleBar.on('pointerup', this.onTitleBarUp.bind(this));

        // 標題文字
        const titleText = new PIXI.Text(title, $TextStyle.Sprite_Window_Title);
        titleText.anchor.set(0.5, 0);
        titleText.x = 150;
        titleText.y = 8;

        // 有要後續再使用的元件再存至this
        this.closeButton = closeButton;

        //拖拉視窗
        this.draggable = true;
        this.dragging = false;
        this.lastMouseEvent = null;

        //
        this.addChild(outLine);
        this.addChild(titleBar);
        this.addChild(titleText);
        this.addChild(closeButton);
        console.log(this);
    }
    update() { }

    // 關閉按鈕
    onCloseButtonClick() {
        $game.stage.removeChild(this);
    }

    onTitleBarDown(e) {
        this.dragging = true;
        this.lastMouseEvent = { x: e.data.global.x, y: e.data.global.y };
    }

    onTitleBarMove(e) {
        if (!this.draggable || !this.dragging || !e || !this.lastMouseEvent) { return; }

        const dx = e.data.global.x - this.lastMouseEvent.x;
        const dy = e.data.global.y - this.lastMouseEvent.y;
        this.x += dx;
        this.y += dy;
        // width = 300, height = 400;
        this.lastMouseEvent = { x: e.data.global.x, y: e.data.global.y };
    }
    onTitleBarUp() {
        this.dragging = false;
        this.lastMouseEvent = null;
    }
}