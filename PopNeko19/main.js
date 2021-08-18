var popCount = 0;
var popCountElement = document.querySelector('.pop-count');
var pop0Element = document.querySelector('.pog0');
var pop1Element = document.querySelector('.pog1');
var se = new Audio('audio/pog.mp3');
pop1Element.style.display = 'none';
function popdown() {
	popCount++;
	popCountElement.innerHTML = popCount.toString();
	pop0Element.style.display = 'none';
	pop1Element.style.display = '';
	se.play();
}
function popup() {
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