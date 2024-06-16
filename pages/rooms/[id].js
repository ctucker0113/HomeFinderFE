import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getAllItemsInARoom } from '../../api/itemAPI';
import { getSingleRoom } from '../../api/roomAPI';
import ItemCard from '../../components/ItemCard';

export default function ViewAllItemsInARoom() {
  const [items, setItems] = useState([]);
  const [roomName, setRoomName] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const viewAllRoomItems = useCallback(async () => {
    try {
      const itemsInRoom = await getAllItemsInARoom(id);

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
      setItems([]); // Ensure items is an empty array on error
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      viewAllRoomItems();
    }
  }, [viewAllRoomItems, id]);

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
