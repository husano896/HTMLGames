import { Scene_Map } from './Scenes/scene_map';
import { Scene_Eviat } from './Scenes/scene_eviat';
import Mouse from 'pixi.js-mouse';
import Keyboard from 'pixi.js-keyboard';
import $game from "./game";
import { Scene_Bubble } from './Scenes/Scene_Bubble';

let $resources = {};
/**
  * 自URL的QueryString中取得預先開啟的遊戲
  */
function getGameFromQuery() {
	let params = (new URL(document.location.href)).searchParams
	let game = params.get("game");
	switch (game) {
		case 'eviat':
			return Scene_Eviat;
		case 'map':
			return Scene_Map;
		default:
			return Scene_Bubble;
	}
}

$game.loader.load((loader, resources) => {

	$resources = resources;
	// 初始畫面
	let scene = getGameFromQuery()
	let $scene = new scene();
	$game.stage.addChild($scene);
	
	$game.ticker.add((delta) => {
		if ($scene) {
			Keyboard.update();
			Mouse.update();
			$scene.update(delta);
		}
	});
	$game.start();
});
console.log($game);
