/* 
	作為遊戲程式的接入點
*/

R.AddLoadedListener(()=>{
	Game = new game();
	Game.$scene = new Scene_Play();
});

R.AddErrorListener((err)=>{
	document.body.innerHTML='<h2 style="color:red">Load failed.</h2><br>Detail:' + JSON.stringify(err);
});