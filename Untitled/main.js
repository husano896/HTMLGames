var Game;
/* 	作為遊戲程式的接入點 */

R.AddLoadedListener(() => {
	Game = new game();
	Game.Interpreter = new Interpreter();
	Game.$scene = new Scene_Play();
});
R.AddErrorListener((err) => {
	document.body.innerHTML = '<h2 style="color:red">Load failed.</h2><br>Detail:' + JSON.stringify(err);
});

/*
var firebaseConfig = {
	apiKey: "AIzaSyCBO0vsYdNP7XJDV-uokl5ywat1rjIlFDU",
	authDomain: "xfly-htmlgames.firebaseapp.com",
	databaseURL: "https://xfly-htmlgames.firebaseio.com",
	projectId: "xfly-htmlgames",
	storageBucket: "xfly-htmlgames.appspot.com",
	messagingSenderId: "548297999272",
	appId: "1:548297999272:web:bed18f88e1efddb4ccd39d",
	measurementId: "G-EBPYFV9R6F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();*/