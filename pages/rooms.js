import { useEffect, useState } from 'react';
import { getAllRooms } from '../api/roomAPI';
import RoomCard from '../components/RoomCard';
import { useAuth } from '../utils/context/authContext';

export default function ViewRooms() {
  const [rooms, setRooms] = useState([]);

  const { user } = useAuth();

  const getAllUserRooms = () => {
    getAllRooms(user.uid)
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
    <div>
      <div className="full-page-background my-rooms-background" />
      <div className="overlay" />
      <div className="content-container">
        <h1 className="text-center margin-y-large">My Rooms</h1>
        <div className="d-flex flex-wrap">
          {rooms.map((room) => (
            <RoomCard key={room.id} roomObj={room} onUpdate={getAllUserRooms} />
          ))}
        </div>
      </div>
    </div>
  );
}
