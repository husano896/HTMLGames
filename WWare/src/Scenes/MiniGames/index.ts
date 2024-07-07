import { MiniGameBase } from './MiniGameBase';
import { Scene_EscapeDragon } from './KMN/Scene_EscapeDragon';
import { Scene_RotateEviat } from './KMN/Scene_RotateEviat';
import { Scene_DaisukeMeow } from './KMN/Scene_DaisukeMeow';
import { Scene_Caragua100 } from './KMN/Scene_Caragua';
import { Scene_EatCake } from './Brainless/Scene_EatCake';
import { Scene_MaxmaClass } from './Rhythm/Scene_MaxmaClass';
import { Scene_KuanKuan } from './KMN/Scene_KuanKuan';
import { Scene_KC } from './KMN/Scene_KC';
const games: typeof MiniGameBase[] = [
    Scene_EscapeDragon,
    Scene_RotateEviat,
    Scene_DaisukeMeow,
    Scene_EatCake,
    Scene_MaxmaClass,
    Scene_Caragua100,
    Scene_KuanKuan,
    Scene_KC
];

export default games;