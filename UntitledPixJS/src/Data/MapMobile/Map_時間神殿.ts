import IMapMobile from './IMapMobile';

const map: IMapMobile = {
    name: "時間神殿",
    description: "時間神殿",
    x: 400,
    y: 200,
    visible: true,
    events: [
        {
            condition: () => true,
            payload: () => {

            }
        }
    ],
}

export default map;
