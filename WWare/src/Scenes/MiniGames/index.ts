import { MiniGameBase } from './MiniGameBase';
import { Scene_EscapeDragon } from './Scene_EscapeDragon';
import { Scene_RotateEviat } from './Scene_RotateEviat';
const games: typeof MiniGameBase[] = [
    Scene_EscapeDragon,
    Scene_RotateEviat
];

export default games;