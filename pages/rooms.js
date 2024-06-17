import { useEffect, useState } from 'react';
import { getAllRooms } from '../api/roomAPI';
import RoomCard from '../components/RoomCard';

export default function ViewRooms() {
  const [rooms, setRooms] = useState([]);

  const getAllUserRooms = () => {
    getAllRooms()
      .then((data) => {
        console.warn('Fetched rooms:', data);
        setRooms(data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  };

  useEffect(() => {
    getAllUserRooms();
  }, []);

  return (
    <>
      <h1>My Rooms</h1>
      <div className="d-flex flex-wrap">
        {rooms.map((room) => (
          <RoomCard key={room.id} roomObj={room} onUpdate={getAllUserRooms} />
        ))}
      </div>
    </>
  );
}
