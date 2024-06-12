import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { getAllRooms } from '../api/roomAPI';
import RoomCard from '../components/RoomCard';

export default function ViewRooms() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter(); // Use useRouter for navigation

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

  const handleAddNewRoom = () => {
    router.push('rooms/newRoom'); // Use router.push to navigate to the Create Room page
  };

  return (
    <>
      <h1>Rooms</h1>
      <button type="button" onClick={handleAddNewRoom} className="btn btn-primary mb-3">Add New Room</button>
      <div className="d-flex flex-wrap">
        {rooms.map((room) => (
          <RoomCard key={room.id} roomObj={room} onUpdate={getAllUserRooms} />
        ))}
      </div>
    </>
  );
}
