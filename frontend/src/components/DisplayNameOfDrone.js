import axios from 'axios';
import { useEffect, useState } from 'react';
let shiftedDrones = [];
let ownersAndDrones = [];

const DisplayNameOfDrone = ({ drones }) => {
  let port = '';
  if (process.env.NODE_ENV === 'development') {
    port = 'http://localhost:5000';
  }
  const [pilotAndDistance, setPilotAndDistance] = useState([]);
  useEffect(() => {
    shiftingDrones();
  }, [drones]);
  const shiftingDrones = () => {
    let maxValue = drones.length;

    if (maxValue > 0) {
      let shifted = drones.shift();
      if (!shiftedDrones.some((el) => el.idOfDrone === shifted.idOfDrone)) {
        shiftedDrones.push(shifted);
      } else {
        const foundIndex = shiftedDrones.findIndex(
          (x) => x.idOfDrone === shifted.idOfDrone
        );
        if (shiftedDrones[foundIndex].distance > shifted.distance) {
          shiftedDrones[foundIndex] = shifted;
        }
      }
      fetchAPI(shifted);
    }
  };
  const fetchAPI = async (droneId) => {
    const ownerInfo = await axios.get(
      `${port}/owners?droneID=${droneId.idOfDrone}`
    );
    if (!ownersAndDrones.some((el) => el.id === droneId.idOfDrone)) {
      ownersAndDrones.push({
        id: droneId.idOfDrone,
        distance: droneId.distance,
        ownerInfo: ownerInfo,
        time: new Date(),
      });
    } else {
      const index = ownersAndDrones.findIndex(
        (x) => x.id === droneId.idOfDrone
      );

      if (ownersAndDrones[index].distance > droneId.distance) {
        ownersAndDrones[index].distance = droneId.distance;
      }
    }

    setPilotAndDistance(ownersAndDrones);

    let dateNow = new Date();
    for (let i = 0; i < pilotAndDistance.length; i++) {
      let duration =
        (dateNow.getTime() - pilotAndDistance[i].time.getTime()) / 1000;

      if (duration > 60) {
        console.log(duration);
        ownersAndDrones.splice(i, 1);
        console.log(ownersAndDrones);
      }
    }
    setPilotAndDistance(ownersAndDrones);
  };

  return (
    <div>
      {pilotAndDistance.map((drone) => {
        return (
          <div key={drone.id} className="datadisplaymain">
            {drone.ownerInfo.data.firstName} {drone.ownerInfo.data.lastName}{' '}
            {drone.time.getHours()}:{drone.time.getMinutes()} and closest
            distance is = {drone.distance}, email: {drone.ownerInfo.data.email},
            phone:{drone.ownerInfo.data.phoneNumber}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayNameOfDrone;
