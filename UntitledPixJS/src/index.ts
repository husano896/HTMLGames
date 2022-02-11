import Mouse from 'pixi.js-mouse';
import Keyboard from 'pixi.js-keyboard';
import $game from "./game";
import { Scene_Map } from './Scenes/scene_map';

let $resources = {};
$game.loader.load((loader, resources) => {

	$resources = resources;
	// 初始畫面
	let $scene = new Scene_Map();
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
