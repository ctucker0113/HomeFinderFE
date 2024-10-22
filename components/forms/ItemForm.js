import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { createItem, updateItem } from '../../api/itemAPI';
import { getAllRooms } from '../../api/roomAPI';
import { getAllTags } from '../../api/tagAPI';
import {
  getAllTagsForSingleItem,
  createItemTagRelationship,
  deleteItemTagRelationship,
  getFirebaseKeyByItemTagID,
} from '../../api/itemTagAPI';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  image: '',
  roomID: '',
  userID: '',
};

function ItemForm({ itemObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [rooms, setRooms] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set()); // State for selected tags to add
  const [tagsToRemove, setTagsToRemove] = useState(new Set()); // State for selected tags to remove
  const [existingItemTags, setExistingItemTags] = useState(new Set()); // State for tags already associated with item
  const router = useRouter();
  const { user } = useAuth();

  // Fetch all rooms data to populate the "Rooms Dropdown"
  useEffect(() => {
    getAllRooms(user.uid).then(setRooms);
  }, [user.uid]);

  // Fetch all tags to populate the "Tags Checkboxes"
  useEffect(() => {
    getAllTags().then((fetchedTags) => {
      setTags(fetchedTags);
    }).catch((error) => {
      console.error('Error fetching tags:', error);
    });
  }, []);

  // Fetch existing tags if editing an item
  useEffect(() => {
    if (itemObj.firebaseKey) {
      setFormInput(itemObj);
      // Fetch tags associated with the item
      getAllTagsForSingleItem(itemObj.firebaseKey).then((itemTags) => {
        const itemTagsMap = new Map(); // Create a Map for itemTagID
        itemTags.forEach((tag) => {
          itemTagsMap.set(tag.tagID, tag.itemTagID); // Store tagID and corresponding itemTagID
        });
        setExistingItemTags(itemTagsMap); // Now, existingItemTags will be a Map
      });
    }
  }, [itemObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // Handle adding tags (to be associated with the item)
  const handleTagAddChange = (e) => {
    const { value, checked } = e.target;
    const newSelectedTags = new Set(selectedTags);

    if (checked) {
      newSelectedTags.add(value);
    } else {
      newSelectedTags.delete(value);
    }

    setSelectedTags(newSelectedTags);
  };

  // Handle removing tags (to be disassociated from the item)
  const handleTagRemoveChange = (e) => {
    const { value, checked } = e.target;
    const newTagsToRemove = new Set(tagsToRemove);

    if (checked) {
      newTagsToRemove.add(value);
    } else {
      newTagsToRemove.delete(value);
    }

    setTagsToRemove(newTagsToRemove);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const room = await getSingleRoomByName(formInput.roomID);

    if (itemObj.firebaseKey) {
      // Update the item
      updateItem(formInput).then(() => {
        console.log('Selected tags to add:', selectedTags);
        console.log('Tags to remove:', tagsToRemove);

        // Add new tags
        selectedTags.forEach((tagId) => {
          if (!existingItemTags.has(tagId)) { // Only add new tags
            console.log(`Adding tag: ${tagId}`);
            createItemTagRelationship(itemObj.firebaseKey, tagId);
          }
        });

        // Remove selected tags
        const removeTagPromises = [];
        tagsToRemove.forEach((tagId) => {
          if (existingItemTags.has(tagId)) { // Only remove existing tags
            const itemTagID = `${itemObj.firebaseKey}_${tagId}`; // Generate the itemTagID
            console.log(`Looking for firebaseKey to remove for itemTagID: ${itemTagID}`);

            // Fetch the firebaseKey for this itemTagID
            const removeTagPromise = getFirebaseKeyByItemTagID(itemTagID)
              .then((firebaseKey) => {
                console.log(`Removing tag with firebaseKey: ${firebaseKey}`);
                return deleteItemTagRelationship(firebaseKey); // Use firebaseKey to delete
              })
              .catch((error) => {
                console.error(`Error fetching firebaseKey for itemTagID: ${itemTagID}`, error);
              });

            removeTagPromises.push(removeTagPromise); // Add the promise to the list
          }
        });

        // Wait for all removal promises to complete
        Promise.all(removeTagPromises).then(() => {
          router.push('/items/viewAllItems');
        });
      });
    } else {
      // Create a new item
      const payload = { ...formInput, userID: user.uid }; // Patch in user's ID into the payload
      createItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name }; // Patch in the item's firebaseKey into the item object itself
        updateItem(patchPayload).then(() => {
          selectedTags.forEach((tagId) => {
            createItemTagRelationship(name, tagId);
          });
          router.push('/items/viewAllItems');
        });
      });
    }
  };

  // Split tags into two groups: those associated with the item and those not
  const associatedTags = tags.filter((tag) => existingItemTags.has(tag.firebaseKey)); // Tags already associated
  const unassociatedTags = tags.filter((tag) => !existingItemTags.has(tag.firebaseKey)); // Tags not associated

  return (
    <div>
      <div className="full-page-background my-items-background" />
      <div className="overlay" />
      <div className="content-container">
        <Form onSubmit={handleSubmit}>
          <h2 className="mt-5 text-black">{itemObj.firebaseKey ? 'Update Item' : 'Create Item'}</h2>

          {/* ITEM NAME INPUT */}
          <FloatingLabel controlId="floatingInput1" label="Item Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Item Name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* ITEM IMAGE INPUT */}
          <FloatingLabel controlId="floatingInput2" label="Item Image" className="mb-3">
            <Form.Control
              type="url"
              placeholder="Enter an image url"
              name="image"
              value={formInput.image}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* ROOM SELECT */}
          <FloatingLabel controlId="floatingSelect" label="Room">
            <Form.Select
              aria-label="Room"
              name="roomID"
              onChange={handleChange}
              className="mb-3"
              value={formInput.roomID}
            >
              <option value="">Add to Which Room?</option>
              {
                rooms.map((room) => (
                  <option
                    key={room.firebaseKey}
                    value={room.firebaseKey}
                  >
                    {room.name}
                  </option>
                ))
              }
            </Form.Select>
          </FloatingLabel>

          {/* REMOVE TAGS SECTION */}
          <h3 className="mt-5 text-black">Remove Tags</h3>
          {associatedTags.length > 0 ? (
            associatedTags.map((tag) => (
              <Form.Check
                key={tag.firebaseKey}
                type="checkbox"
                label={tag.name}
                value={tag.firebaseKey}
                onChange={handleTagRemoveChange}
                checked={tagsToRemove.has(tag.firebaseKey)} // Unchecked by default, will be checked when the user selects it
                className="text-black"
              />
            ))
          ) : (
            <p>No tags associated with this item.</p>
          )}

          {/* ADD TAGS SECTION */}
          <h3 className="mt-5 text-black">Add Tags</h3>
          {unassociatedTags.length > 0 ? (
            unassociatedTags.map((tag) => (
              <Form.Check
                key={tag.firebaseKey}
                type="checkbox"
                label={tag.name}
                value={tag.firebaseKey}
                onChange={handleTagAddChange}
                checked={selectedTags.has(tag.firebaseKey)} // Unchecked by default, checked if selected
                className="text-black"
              />
            ))
          ) : (
            <p>No tags available to add.</p>
          )}

          {/* SUBMIT BUTTON */}
          <Button type="submit">{itemObj.firebaseKey ? 'Update Item' : 'Create Item'}</Button>
        </Form>
      </div>
    </div>
  );
}

ItemForm.propTypes = {
  itemObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    roomID: PropTypes.string,
    userID: PropTypes.string,
  }),
};

ItemForm.defaultProps = {
  itemObj: initialState,
};

export default ItemForm;
