
let cav = document.querySelector('canvas');
let ctx = cav.getContext('2d');
let points = [];
let balls = [];
let blocks = [];
let gravity = 0.25;
let particleSize = 4;
/** 球的半徑 */
let ballRadius = 8;
let score = 0;
// 是否以滑鼠控制球
let controlBallWithMouse = false;

function cavUpdate() {

    window.requestAnimationFrame(cavUpdate)
    cav.width = window.innerWidth;
    cav.height = window.innerHeight;

    // 清空畫布
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, cav.width, cav.height);

    if (blocks.length === 0) {
        // 如果方塊都被清完時, 隨機生成
        for (let i = 0; i < 50; i++) {
            CreateBlock();
        }
        console.log('blocks', blocks);
    }

    // 繪製方塊
    blocks.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
    })

    // 繪製球
    balls.forEach(b => {

        b.x += b.vecx;
        b.y += b.vecy;

        // 球出界時的反彈
        if ((b.x <= ballRadius && b.vecx < 0) || (b.x >= cav.width - ballRadius && b.vecx > 0)) {
            b.vecx *= -1;
        }
        if ((b.y <= ballRadius && b.vecy < 0) || (b.y >= cav.height - ballRadius && b.vecy > 0)) {
            b.vecy *= -1;
        }

        // 撞到方塊的碰撞判定
        blocks.forEach(block => {

            if (block.cleared) {
                return;
            }

            // 從右邊撞(球往左移動) vs 從左邊撞 (球往右移動)
            if (((b.x <= block.x + block.width + ballRadius) && (b.x + ballRadius >= block.x)) &&
                // 從上方撞(球往下移動) vs 從下方撞 (球往上移動)
                ((b.y + ballRadius >= block.y) && (b.y <= block.y + block.height + ballRadius))) {

                CreateBreakPoints(b.x, b.y, block.color, block, b);
                block.cleared = true;
            }
            if (block.cleared) {
                score += 10;
                console.log(score)
            }
        })

        ctx.fillStyle = '#777777';
        ctx.beginPath();

        ctx.arc(b.x, b.y, ballRadius, 0, 2 * Math.PI, false);
        ctx.fill();
    })
    // 繪製粒子
    points.forEach(p => {
        p.x += p.vecx;
        p.y += p.vecy;
        // 粒子重力
        p.vecy += gravity;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, particleSize, particleSize);

    });

    // 移除畫面外的粒子
    points = points.filter(p => p.x > 0 && p.x < cav.width && p.y > 0 && p.y < cav.height);
    // 移除被擊中的方塊
    blocks = blocks.filter(b => !b.cleared);
}

/**
 * 產生方塊 
 */
function CreateBlock() {
    // 設定顏色
    let colorr = Math.round(Math.random() * 255);
    let colorg = Math.round(Math.random() * 255);
    let colorb = Math.round(Math.random() * 255);

    let blockWidth = Math.round((Math.random() * 20) + 20);
    let blockHeight = Math.round((Math.random() * 20) + 20);

    // 避免方塊跑出畫面外面
    let startX = Math.round(Math.random() * (cav.width - blockWidth * 2) + blockWidth);
    let startY = Math.round(Math.random() * (cav.height - blockHeight * 2) + blockHeight);

    blocks.push({ x: startX, y: startY, width: blockWidth, height: blockHeight, color: `rgb(${colorr}, ${colorg}, ${colorb} )` })
}
/**
 * 建立破壞磚塊後的粒子效果
 */
function CreateBreakPoints(startX, startY, color, block, ball) {
    // 假設磚塊在點擊處的上方, 從下往上撞
    for (let addX = 0; addX <= block.width; addX++) {
        for (let addY = 0; addY <= block.height; addY++) {
            // 讓粒子不要那麼多...
            if (addX % 2 == 0 || addY % 2 == 0) {
                continue;
            }
            // 設定粒子出現位置
            let pointx = block.x + addX;
            let pointy = block.y + addY;

            // 設定粒子的飛行方向
            let hitPower = Math.random() * 10
            // 往球的面相方向發射
            let deg = (Math.atan2(pointy - ball.y, ball.x - pointx) - Math.PI / 2);
            let vecx = Math.sin(deg) * hitPower;
            let vecy = Math.cos(deg) * hitPower;

            let point = { x: pointx, y: pointy, vecx: vecx, vecy: vecy, color: color }
            points.push(point)
        }
    }

}
window.requestAnimationFrame(cavUpdate)

// 測試用：在點擊處產生球
cav.addEventListener('click', (ev) => {
    const startX = ev.x;
    const startY = ev.y;

    let deg = Math.random() * 10
    balls.push({ x: startX, y: startY, vecx: 10 * Math.sin(deg), vecy: 10 * Math.cos(deg), })
});
cav.addEventListener('mousemove', (ev) => {
    const startX = ev.x;
    const startY = ev.y;

    if (controlBallWithMouse) {
        balls.forEach(b => {
            b.x = startX;
            b.y = startY;
        })
    }
});