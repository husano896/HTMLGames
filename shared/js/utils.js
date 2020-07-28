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