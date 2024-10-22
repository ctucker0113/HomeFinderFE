import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CreateRoomForm from '../../../components/forms/RoomForm';
import { getSingleRoom } from '../../../api/roomAPI';

export default function EditRoomForm() {
  const [editRoom, setEditRoom] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRoom(firebaseKey).then(setEditRoom);
  }, [firebaseKey]);

  return (
    <CreateRoomForm roomObj={editRoom} />
  );
}
