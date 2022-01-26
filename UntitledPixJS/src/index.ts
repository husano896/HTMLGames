import { Scene_Map } from './Scenes/scene_map';
import $game from "./game";
import { Scene_Eviat } from "./Scenes/scene_eviat";

let $resources = {};
$game.loader.load((loader, resources) => {
	
	$resources = resources;
	let $scene = new Scene_Map();
	// 初始畫面
	$game.stage.addChild($scene);
	$game.ticker.add((delta) => {
		if ($scene) {
			$scene.update(delta);
		}
	});
	$game.start();
});
console.log($game);
