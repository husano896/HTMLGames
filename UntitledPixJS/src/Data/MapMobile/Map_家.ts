import $R from '@/resources';
import IMapMobile from './IMapMobile';

const map: IMapMobile = {
    name: "家",
    description: "溫暖的龍窩！<3",
    x: 200,
    y: 200,
    visible: true,
    image: $R.Image.MapPointHome,
    events: [
        {
            condition: () => true,
            payload: () => {

            }
        }
    ],
    home: true,
}

export default map;
