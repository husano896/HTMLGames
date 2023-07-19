import IMapMobile from "./IMapMobile";
import Map_時間神殿 from './Map_時間神殿';
import Map_競技場 from './Map_競技場';
import Map_源淨森林 from './Map_源淨森林';
import Map_家 from './Map_家';
import Map_龍之島廣場 from './Map_龍之島廣場';

const Maps: Array<IMapMobile> = [
  Map_家,
  Map_時間神殿,
  Map_競技場,
  Map_源淨森林,
  Map_龍之島廣場
];

export { IMapMobile };
export default Maps;
