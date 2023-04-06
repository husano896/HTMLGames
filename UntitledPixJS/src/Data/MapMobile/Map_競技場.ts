import IMapMobile from './IMapMobile';

const map: IMapMobile = {
    name: "競技場",
    description: "競技場",
    x: 400,
    y: 400,
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

