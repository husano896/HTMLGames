import { Scene } from './Scenes/scene';
import { Scene_Title } from './Scenes/scene_title';
import $game from "./game";
let $resources = {};
import './resources';
$game.loader.load((loader, resources) => {

	$resources = resources;
	let $scene = new Scene_Title();
	// 初始畫面
	$game.stage.addChild($scene);
	$game.ticker.add((delta) => {
		try {
			// delta若為預設為60fps, 且運行速度也為60fps時, delta = 1, 運行速度為30fps時, delta = 2
			// elapsedMS為上個frame花費的秒數
			$game.stage.children.forEach(c => (c as Scene).update?.($game.ticker.elapsedMS))
		}
		catch (err) {
			console.error(err);
		}
	});
});
console.log($game);
