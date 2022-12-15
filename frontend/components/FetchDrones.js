import { useEffect, useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import DisplayNameOfDrone from './DisplayNameOfDrone';
const FetchDrones = () => {
  const [numberOfDrones, setNumberOfDrones] = useState(0);
  const [illegalDrones, setIllegalDrones] = useState([]);
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 2000);
  }, []);
  useEffect(() => {
    fetchAPI();
  }, [temp]);
  const fetchAPI = async () => {
    const data = await axios.get('http://localhost:5000/api', {
      'Content-Type': 'application/xml; charset=utf-8',
    });
    const parsedData = await new XMLParser().parseFromString(data.data);

    //setDroneData(parsedData.children[1].children);
    setNumberOfDrones(parsedData.children[1].children.length); //drones running around at the moment
    //analize which drone is inside the circle radius
    //loops in the array of drones ==> parsedData.children[1].children[maxlength]
    calculateDistance(
      parsedData.children[1].children.length,
      parsedData.children[1].children
    );
  };

  const calculateDistance = (lengthOfArray, droneData) => {
    let illegalDroneNames = [...illegalDrones];
    //analize which drone is inside the circle radius (formula distance between two known points)
    //loops in the array of drones ==> parsedData.children[1].children[maxlength]
    for (let i = 0; i < lengthOfArray; i++) {
      const y = droneData[i].children[7].value;
      const x = droneData[i].children[8].value;
      const distance = Math.sqrt(
        Math.pow(x - 250000, 2) + (Math.pow(y - 250000), 2)
      );

      if (distance < 100000) {
        const found = illegalDroneNames.some(
          (el) => el === droneData[i].children[0].value
        );
        if (!found) {
          illegalDroneNames.push({
            idOfDrone: droneData[i].children[0].value,
            distance: distance,
          });
          //console.log('too close', illegalDroneNames);
        }
      }
    }

    setIllegalDrones(illegalDroneNames);
    //console.log(illegalDroneNames);
  };

  return (
    <div>
      {/* {illegalDrones.map((drone) => {
        return <h1>{drone}</h1>;
      })} */}
      <DisplayNameOfDrone drones={illegalDrones}></DisplayNameOfDrone>
      <h2></h2>
    </div>
  );
};

export default FetchDrones;
