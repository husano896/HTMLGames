const stageEl = document.querySelector('div.stage')
let stage = 0;
let start = false;
const stages = [
    [
        {
            x: 0,
            y: 0,
            w: 5,
            h: 50
        },
        {
            x: 95,
            y: 0,
            w: 5,
            h: 50
        },
        {
            x: 0,
            y: 0,
            w: 100,
            h: 2.5
        },
        {
            x: 0,
            y: 0,
            w: 45,
            h: 5
        },
        {
            x: 55,
            y: 0,
            w: 45,
            h: 5
        },
        {
            x: 10,
            y: 10,
            w: 5,
            h: 40
        },
        {
            x: 20,
            y: 5,
            w: 5,
            h: 35
        },
        {
            x: 30,
            y: 10,
            w: 5,
            h: 40
        },
        {
            x: 40,
            y: 5,
            w: 5,
            h: 35
        },
        {
            x: 50,
            y: 10,
            w: 5,
            h: 40
        },
        {
            x: 60,
            y: 5,
            w: 5,
            h: 35
        },
        {
            x: 70,
            y: 10,
            w: 5,
            h: 40
        },
        {
            x: 80,
            y: 5,
            w: 5,
            h: 35
        },
        {
            x: 90,
            y: 10,
            w: 5,
            h: 40
        },
        {
            x: 15,
            y: 45,
            w: 15,
            h: 5
        },

        {
            x: 35,
            y: 45,
            w: 15,
            h: 5
        },

        {
            x: 55,
            y: 45,
            w: 15,
            h: 5
        },
        {
            x: 75,
            y: 45,
            w: 5,
            h: 5
        },
        {
            x: 45,
            y: 30,
            w: 2.5,
            h: 2
        },

        {
            x: 48,
            y: 25,
            w: 2.5,
            h: 2
        },
        {
            x: 55,
            y: 25,
            w: 2.5,
            h: 2
        },

        {
            x: 58,
            y: 30,
            w: 2.5,
            h: 2
        },
        {
            x: 47.5,
            y: 0,
            w: 5,
            h: 5,
            goal: true
        },
        {
            x: 45,
            y: 90,
            w: 10,
            h: 10,
            start: true
        }
    ]
]

function goToStage(stage) {
    stopMusic();
    start = false;
    const resultEl = document.querySelectorAll('div.result')
    resultEl.forEach(e => e.remove())
    for (let b of stages[stage]) {
        const blockEl = document.createElement('div');
        blockEl.classList.add('block');
        if (b.start) {
            blockEl.classList.add('start');
        } else {
            blockEl.classList.add(b.goal ? 'goal' : 'wrong');
        }
        blockEl.style.width = `${b.w}%`;
        blockEl.style.height = `${b.h}%`;
        blockEl.style.left = `${b.x}%`;
        blockEl.style.top = `${b.y}%`;
        if (b.start) {
            blockEl.innerText = '按我開始'
            blockEl.addEventListener('click', () => {
                start = true;
                blockEl.remove();

            })
        } else {
            blockEl.addEventListener('pointerenter', b.goal ? blockGoal : blockWrong)
        }
        stageEl.appendChild(blockEl);
    }

    console.log('關卡方塊', stageEl.children)
}

function blockGoal() {
    if (!start) {
        return;
    }
    stageEl.replaceChildren([])
    const resultEl = document.createElement('div');
    resultEl.className = 'result'
    const title = document.createElement('h1')
    title.innerText = `總之你贏了喔喔喔喔喔喔`
    title.style.fontFamily = '新細明體'

    resultEl.appendChild(title)
    const retryButton = document.createElement('button')
    const retryText = document.createElement('h3')
    retryText.innerText = '還是要再試一次的啦'
    playMusic();
    retryButton.addEventListener('click', () => goToStage(0))
    addDrug(resultEl)
    retryButton.appendChild(retryText);
    resultEl.appendChild(retryButton);
    document.body.appendChild(resultEl)
}
function blockWrong() {
    if (!start) {
        return;
    }
    stageEl.replaceChildren([])
    const resultEl = document.createElement('div');
    resultEl.className = 'result'
    const title = document.createElement('h1')
    title.innerText = `你使了`
    title.style.fontFamily = '新細明體'

    resultEl.appendChild(title)
    const retryButton = document.createElement('button')
    const retryText = document.createElement('h3')
    retryText.innerText = '再試一次的啦'
    retryButton.appendChild(retryText)
    retryButton.addEventListener('click', () => goToStage(0))
    resultEl.appendChild(retryButton);
    document.body.appendChild(resultEl)
}

function addDrug(resultEl) {
    const seasonSnowEl = document.createElement('div');
    seasonSnowEl.className = 'season-snow'
    seasonSnowEl.addEventListener('dblclick', () => {
        seasonSnowEl.remove();
    })
    const highLevelDeerMeatContainer = document.createElement('div')
    highLevelDeerMeatContainer.style.display = 'flex'
    highLevelDeerMeatContainer.style.flexDirection = 'row'
    highLevelDeerMeatContainer.style.justifyContent = 'center'
    const left1 = document.createElement('img')
    left1.className = "l"
    left1.src = "imgs/sticker.webp"
    const left2 = document.createElement('img')
    left2.className = "l"
    left2.src = "imgs/sticker.webp"
    const right1 = document.createElement('img')
    right1.className = "r"
    right1.src = "imgs/sticker.webp"
    const right2 = document.createElement('img')
    right2.className = "r"
    right2.src = "imgs/sticker.webp"
    highLevelDeerMeatContainer.appendChild(left1);
    highLevelDeerMeatContainer.appendChild(left2);
    highLevelDeerMeatContainer.appendChild(right1);
    highLevelDeerMeatContainer.appendChild(right2);
    seasonSnowEl.appendChild(highLevelDeerMeatContainer);
    resultEl.appendChild(seasonSnowEl);
}

function update() {

}

function playMusic() {
    const music = document.querySelector('audio')
    music.currentTime = 0;
    music.play()
}
function stopMusic() {
    const music = document.querySelector('audio')
    music.pause();
}

goToStage(0) 
