import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getAllItemsInARoom } from '../../api/itemAPI';
import { getSingleRoom } from '../../api/roomAPI';
import ItemCard from '../../components/ItemCard';

export default function ViewAllItemsInARoom() {
  const [items, setItems] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomImage, setRoomImage] = useState(''); // State to store room image URL
  const router = useRouter();
  const { id } = router.query;

  // Fetch items and room details
  const viewAllRoomItems = useCallback(() => {
    if (id) {
      // Fetch room details
      getSingleRoom(id).then((roomData) => {
        setRoomName(roomData.name);
        setRoomImage(roomData.image);
      });

      // Fetch items in the room
      getAllItemsInARoom(id).then((itemsData) => {
        setItems(itemsData);
      }).catch((error) => {
        console.error('Error fetching items:', error);
      });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      viewAllRoomItems();
    }
  }, [viewAllRoomItems, id]);

  return (
    <div>
      {/* Set the background image dynamically */}
      <div className="full-page-background" style={{ backgroundImage: `url(${roomImage})` }} />
      <div className="overlay" />
      <div className="content-container">
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
    </div>
  );
}
