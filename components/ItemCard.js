import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteItem } from '../api/itemAPI';
import { getSingleRoom } from '../api/roomAPI';
import { getAllTagsForSingleItem } from '../api/itemTagAPI';
import { getSingleTag } from '../api/tagAPI';

function ItemCard({ itemObj, onUpdate }) {
  const [roomName, setRoomName] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch the room details and set the room name
    getSingleRoom(itemObj.roomID)
      .then((room) => {
        setRoomName(room.name);
      })
      .catch((error) => {
        console.error('Error fetching room:', error);
      });

    // Fetch the tags associated with the item
    getAllTagsForSingleItem(itemObj.firebaseKey)
      .then((itemTags) => {
        // For each itemTag, fetch the full tag information (including name)
        const tagPromises = itemTags.map((itemTag) => getSingleTag(itemTag.tagID)); // Fetch the full tag object using tagID

        // Resolve all tag promises and set the tags
        Promise.all(tagPromises)
          .then((fullTags) => {
            setTags(fullTags); // Set the full tag data (with names) into state
          })
          .catch((error) => {
            console.error('Error fetching tag details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
      });
  }, [itemObj.firebaseKey, itemObj.roomID]);

  // Functionality for delete confirmation pop-up
  const deleteThisItem = () => {
    if (window.confirm(`Are you 1000% positive you want to delete ${itemObj.name}? This action cannot be undone.`)) {
      deleteItem(itemObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="itemCard" style={{ width: '18rem' }}>
      <Card.Img className="imageFormat" variant="top" src={itemObj.image} />
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <Card.Text>
          Location: {roomName}
        </Card.Text>
        <Card.Text>
          Tags: {tags.length > 0 ? tags.map((tag) => tag.name).join(', ') : 'No tags'}
        </Card.Text>
        <Link href={`/items/edit/${itemObj.firebaseKey}`} passHref>
          <Button variant="info">Edit/Move Item</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisItem} className="m-2">Delete Item</Button>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    roomID: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ItemCard;
