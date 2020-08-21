var IShakeable = document.getElementById('IShakeable');
var IAdjustable = document.getElementById('IAdjustable');

var sensitive = 0.0002

document.onmousemove = function (event) {
    IShakeable.currentTime += event.movementX * sensitive;
}

IAdjustable.onchange = function (event) {
    sensitive = Number(event.srcElement.value);
}
