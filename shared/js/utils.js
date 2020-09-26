var Utils = Utils || {};

Utils.Dialog = function(text, title) {
	var dialog = document.querySelector('.game-dialog')
	if (!dialog) {
		dialog = document.createElement("dialog");
		document.body.appendChild(dialog);
	}
	dialog.className = "game-dialog";
	dialog.innerHTML = text;
	dialog.show();

	return dialog;
}

Utils.RPGMessage = function(text, name, icon) {
	var dialog = document.querySelector('.game-messagebox')
	if (!dialog) {
		dialog = document.createElement("dialog");
		document.body.appendChild(dialog);
	}
	dialog.className = "game-dialog";
	dialog.innerHTML = text;
	
	// 三角閃爍
	blink = document.createElement('blink');
	blink.innerText = '▼';
	dialog.append(blink);

	dialog.onclick = dialog.close
	dialog.show();

	return dialog;
}