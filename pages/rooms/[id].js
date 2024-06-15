import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllItemsInARoom } from '../../api/itemAPI';
import { getSingleRoom } from '../../api/roomAPI';
import ItemCard from '../../components/ItemCard';

export default function ViewAllItemsInARoom() {
  const [items, setItems] = useState([]);
  const [roomName, setRoomName] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const viewAllRoomItems = async () => {
    try {
      const itemsInRoom = await getAllItemsInARoom(id);
      console.warn('Items in Room:', itemsInRoom);

      if (typeof itemsInRoom === 'string' && itemsInRoom === 'No items found for this room.') {
        setItems([]); // Handle the specific message from the backend
      } else if (Array.isArray(itemsInRoom)) {
        setItems(itemsInRoom); // Ensure items is an array
      } else {
        throw new Error('Unexpected response format');
      }

      const roomDetails = await getSingleRoom(id);
      setRoomName(roomDetails.name || '');
    } catch (error) {
      console.error('Error fetching room items or details:', error);
      setItems([]); // Ensure items is an empty array on error
    }
  };

  useEffect(() => {
    if (id) {
      viewAllRoomItems();
    }
  }, [id]);

  return (
    <div>
      <h1>Items in {roomName}</h1>
      <div className="d-flex flex-wrap">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard key={item.id} itemObj={item} onUpdate={viewAllRoomItems} />
          ))
        ) : (
          <p>No items found in this room.</p>
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getAllItemsInARoom } from '../../api/itemAPI';
// import { getSingleRoom } from '../../api/roomAPI'; // Ensure this is correctly imported
// import ItemCard from '../../components/ItemCard';

// export default function ViewAllItemsInARoom() {
//   const [items, setItems] = useState([]);
//   const [roomName, setRoomName] = useState('');
//   const router = useRouter();
//   const { id } = router.query;

//   const viewAllRoomItems = async () => {
//     try {
//       const itemsInRoom = await getAllItemsInARoom(id);
//       console.warn('Items in Room:', itemsInRoom);
//       setItems(itemsInRoom);

//       if (itemsInRoom.length > 0) {
//         const roomDetails = await getSingleRoom(id); // Fetch the room details using the room ID from the route
//         setRoomName(roomDetails.name);
//       } else {
//         // If there are no items, you might still want to fetch and display the room name
//         const roomDetails = await getSingleRoom(id);
//         setRoomName(roomDetails.name);
//       }
//     } catch (error) {
//       console.error('Error fetching room items or details:', error);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       viewAllRoomItems();
//     }
//   }, [id]);

//   return (
//     <div>
//       <h1>Items in {roomName}</h1>
//       <div className="d-flex flex-wrap">
//         {items.length > 0 ? (
//           items.map((item) => (
//             <ItemCard key={item.id} itemObj={item} onUpdate={viewAllRoomItems} />
//           ))
//         ) : (
//           <p>No items found in this room.</p>
//         )}
//       </div>
//     </div>
//   );
// }
