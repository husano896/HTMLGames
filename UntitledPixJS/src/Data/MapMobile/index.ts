import IMapMobile from "./IMapMobile";

const Maps: Array<IMapMobile> = [
  // 之後事件多了再抽成檔案...
  {
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
  },
  {
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
  },
  {
    name: "源淨森林",
    description: "源淨森林",
    x: 200,
    y: 600,
    visible: true,
    events: [
      {
        condition: () => true,
        payload: () => {

        }
      }
    ],
  },
];

export { IMapMobile };
export default Maps;
