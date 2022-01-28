import { Scene_Ready } from './Scenes/scene_ready';
import $game from "./game";
import { Scene_Title } from "./Scenes/scene_title";

let $resources = {};
$game.loader.load((loader, resources) => {
	
	$resources = resources;
	let $scene = new Scene_Ready();
	// 初始畫面
	$game.stage.addChild($scene);
	$game.ticker.add((delta) => {
		if ($scene) {
			$scene.update(delta);
		}
	});
});
console.log($game);
