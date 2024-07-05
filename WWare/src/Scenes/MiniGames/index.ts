import { MiniGameBase } from './MiniGameBase';
import { Scene_EscapeDragon } from './KMN/Scene_EscapeDragon';
import { Scene_RotateEviat } from './KMN/Scene_RotateEviat';
import { Scene_DaisukeMeow } from './KMN/Scene_DaisukeMeow';
import { Scene_EatCake } from './Brainless/Scene_EatCake';
import { Scene_MaxmaClass } from './Rhythm/Scene_MaxmaClass';

const games: typeof MiniGameBase[] = [
    Scene_EscapeDragon,
    Scene_RotateEviat,
    Scene_DaisukeMeow,
    Scene_EatCake,
    Scene_MaxmaClass
];

export default games;