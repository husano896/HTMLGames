import $R from '@/resources';
import IMapMobile from './IMapMobile';

const map: IMapMobile = {
    name: "龍之島廣場",
    description: "平時大家不論是聚會還是買賣聚集的地方！",
    x: 250,
    y: 250,
    visible: true,
    image: $R.Image.MapPoint,
    events: [
        {
            condition: () => true,
            payload: () => {

            }
        }
    ],
}

export default map;
