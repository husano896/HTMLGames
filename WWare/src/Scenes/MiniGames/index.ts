import { MiniGameBase } from './MiniGameBase';
import { Scene_EscapeDragon } from './Scene_EscapeDragon';
import { Scene_RotateEviat } from './Scene_RotateEviat';
import { Scene_DaisukeMeow } from './Scene_DaisukeMeow';
const games: typeof MiniGameBase[] = [
    Scene_EscapeDragon,
    Scene_RotateEviat,
    Scene_DaisukeMeow
];

export default games;