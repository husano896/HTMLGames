var IShakeable = document.getElementById('IShakeable');
var IAdjustable = document.getElementById('IAdjustable');

var sensitive = 0.0002

var lastTouch = null;

document.onmousemove = function (event) {
    IShakeable.currentTime += event.movementX * sensitive;
}

document.addEventListener("touchstart", (event)=>{
	lastTouch = event.touches[0];
}, false);

document.addEventListener("touchmove", (event)=>{
	const newTouch = event.touches[0];
	IShakeable.currentTime += (newTouch.pageX - lastTouch.pageX) * sensitive;
	lastTouch = newTouch;
}, false);

IAdjustable.onchange = function (event) {
    sensitive = Number(event.srcElement.value);
}
