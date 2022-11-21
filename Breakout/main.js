
let cav = document.querySelector('canvas');
let ctx = cav.getContext('2d');
let points = [];
let balls = [];
let blocks = [];
let gravity = 0.25;
/** 球的半徑 */
let ballRadius = 8;
/** 分數 */
let score = 0;
let lastDisplayScore = 0;
/** 開始時間*/
let startTime = new Date();

// 是否以滑鼠控制球
let controlBallWithMouse = false;

let localStorageItemName = {
    Breakout_Settings: 'breakout_settings',
    Breakout_Save: 'breakout_save'
}
// 可調配類
let settings = {
    // 粒子大小
    particleSize: 4,
    // 粒子數量
    particleAmount: 0.5
}

// 存檔紀錄
let saveData = {
    totalScore: 0
}

/** 讀取存檔及設定 */
function loadSaveAndSettings() {
    try {
        /*
        const localStorageSetting = JSON.parse(localStorage.getItem(localStorageItemName.Breakout_Settings));
        if (localStorageSetting) {
            settings = localStorageSetting;
        }
        */
        const localStorageSave = JSON.parse(localStorage.getItem(localStorageItemName.Breakout_Save));
        if (localStorageSave) {
            saveData = localStorageSave;
        }
    } catch (err) {
        console.warn('存檔及設定讀取失敗：', err);
    }
}

loadSaveAndSettings();
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
	
	// 分數漸動
	if (lastDisplayScore < score) {
		lastDisplayScore += Math.ceil((score - lastDisplayScore)/ 10) ;
	}
	
	// 繪製分數
	ctx.font = '48px Arial';
	ctx.textAlign = 'center';
    ctx.fillStyle = '#aaaaaa';
	ctx.fillText(`${lastDisplayScore}`, cav.width/2, cav.height / 2, cav.width/2);
	ctx.font = '16px Arial';
	ctx.fillText(`${saveData.totalScore}`,  cav.width/2, cav.height / 2 + 24, cav.width/2);

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
                saveData.totalScore += 10;
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
        ctx.fillRect(p.x, p.y, settings.particleSize, settings.particleSize);
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
    let colorr = Math.round(Math.random() * 192 + 42);
    let colorg = Math.round(Math.random() * 192 + 42);
    let colorb = Math.round(Math.random() * 192 + 42);

	// 設定方塊長寬
    let blockWidth = Math.round((Math.random() * 20) + 20);
    let blockHeight = Math.round((Math.random() * 20) + 20);

    // 避免方塊跑出畫面外面
    let startX = Math.round(Math.random() * (cav.width - blockWidth));
    let startY = Math.round(Math.random() * (cav.height - blockHeight));

    blocks.push({ x: startX, y: startY, width: blockWidth, height: blockHeight, color: `rgb(${colorr}, ${colorg}, ${colorb} )` })
}
/**
 * 建立破壞磚塊後的粒子效果
 */
function CreateBreakPoints(startX, startY, color, block, ball) {
    // 粒子數量為0時不建立
    if (settings.particleAmount === 0) {
        return;
    }
    // 假設磚塊在點擊處的上方, 從下往上撞
    for (let addX = 0; addX <= block.width; addX += 1 / settings.particleAmount) {
        for (let addY = 0; addY <= block.height; addY += 1 / settings.particleAmount) {

            // 設定粒子出現位置
            let pointx = block.x + addX;
            let pointy = block.y + addY;

            // 設定粒子的飛行方向
            let hitPower = Math.random() * 4
            // 往球的面相方向發射
            let deg = (Math.atan2(pointy - ball.y, ball.x - pointx) - Math.PI / 2);
            let vecx = Math.sin(deg) * hitPower + Math.cos(deg) * -ball.vecx;
            let vecy = Math.cos(deg) * hitPower + Math.sin(deg) * -ball.vecy;
            // let vecx = Math.sin(deg) * hitPower + ball.vecx;
            // let vecy = Math.cos(deg) * hitPower + ball.vecy;
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
// 每秒鐘存檔一次
setInterval(() => {
    localStorage.setItem(localStorageItemName.Breakout_Save, JSON.stringify(saveData));
    localStorage.setItem(localStorageItemName.Breakout_Settings, JSON.stringify(settings));
})
