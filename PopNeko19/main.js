var popCount = 0;
var lastSentCount = 0;
var popCountElement = document.querySelector('.pop-count');
var pop0Element = document.querySelector('.pog0');
var pop1Element = document.querySelector('.pog1');
var se = new Audio('audio/pog.mp3');
pop1Element.style.display = 'none';

function share() {
    const shareData = {
        title: 'Pop 椪柑',
        text: '點擊椪柑',
        url: 'https://husano896.github.io/HTMLGames/PopNeko19/',
    }
    navigator.share(shareData)
}
function load() {
    try {
        popCount = localStorage.getItem('pog') || 0;
        lastSentCount = popCount;
        popCountElement.innerHTML = popCount.toString();
        console.log('讀取椪柑數量:', popCount);
    } catch (err) { console.log('我們還沒有玩過椪柑') }
}

/** 不要真的打這個, 壓根兒沒這個API 笑死*/
function sendScore() {
    if (lastSentCount === popCount) {
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'orange.x50.fun/pog.php', true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Print received data from server
            result.innerHTML = this.responseText;
        }
    };

    var data = JSON.stringify({ "popCount": popCount, "lastSentCount": lastSentCount });
    xhr.send(data);
    lastSentCount = popCount;
}
function popdown(event) {
    if (event.type === 'keydown') {
        event.preventDefault();
    }
    popCount++;
    popCountElement.innerHTML = popCount.toString();
    pop0Element.style.display = 'none';
    pop1Element.style.display = '';
    localStorage.setItem('popneko19_pog', popCount);
    se.play();
}
function popup(event) {
	event.preventDefault();
    pop0Element.style.display = '';
    pop1Element.style.display = 'none';
}
// 註冊body的點擊和鍵盤事件
document.addEventListener('mousedown', popdown);
document.addEventListener('keydown', popdown);
document.addEventListener('touchstart', popdown);
document.addEventListener('touchend', popup);
document.addEventListener('mouseup', popup);
document.addEventListener('keyup', popup);
//
load();