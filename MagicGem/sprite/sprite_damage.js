class Sprite_Damage extends Sprite {
    constructor(args) {
        super(args);
        if (args.damage === undefined) {
            throw Error('[Sprite_Damage] 未指定傷害!');
        }

        // 如果是數字時做整數處理
        if (typeof (args.damage) === 'number') {
            args.damage = Math.floor(args.damage);
        }
        console.log(args.damage);
        const NUM_BASEWIDTH = 20;
        const NUM_BASEHEIGHT = 20;

        const CRITICAL_WIDTH = 20;
        const CRITICAL_HEIGHT = 20;
        this.damage = args.damage;
        this.critical = args.critical;
        this.sp_damage = args.sp_damage;

        // 處理給予的傷害數字後變更自身的image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d');

        // 先準備需要的空間
        canvas.width = Math.max(Math.ceil(Math.log10(Math.abs(this.damage))) * NUM_BASEWIDTH, CRITICAL_WIDTH);
        canvas.height = NUM_BASEHEIGHT + 2;
        // 接著畫出數字
        ctx.textAlign = 'start';
        ctx.textBaseline = 'top';

        // 先來點陰影
        ctx.fillStyle = "black";
        ctx.fillText(this.damage.toString(), 0, 1);

        // 再畫數字
        if (this.damage > 0) {
            ctx.fillStyle = "white";
        } else {
            ctx.fillStyle = "green";
        }

        this.damage = Math.abs(this.damage);
        ctx.font = `${NUM_BASEWIDTH}px Arial Black`;
        ctx.fillText(this.damage.toString(), 0, 0);

        // 最後把畫好的畫布轉成自身的image
        this.image = new Image();
        this.image.src = canvas.toDataURL();
    }

    update() {
        this.transpancy = Math.max(0, this.transpancy - 0.02);

    }
}