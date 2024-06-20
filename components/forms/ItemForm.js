import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createItem, updateItem } from '../../api/itemAPI';
import { getAllRooms, getSingleRoomByName } from '../../api/roomAPI';
import { getAllTags } from '../../api/tagAPI';
import { getAllTagsForSingleItem, createItemTagRelationship, deleteItemTagRelationship } from '../../api/itemTagAPI';

const initialState = {
  name: '',
  image: '',
  roomID: '',
};

function ItemForm({ itemObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [rooms, setRooms] = useState([]);
  const [tags, setTags] = useState([]);
  const [itemTags, setItemTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [tagsToRemove, setTagsToRemove] = useState(new Set());
  const router = useRouter();

  useEffect(() => {
    // Fetch all rooms
    getAllRooms().then(setRooms);

    // Fetch all tags
    getAllTags().then(setTags);

    if (itemObj.id) {
      // Populate form if itemObj is provided and has an id
      setFormInput(itemObj);

      // Fetch tags for the specific item
      getAllTagsForSingleItem(itemObj.id).then((itemTagsData) => {
        setItemTags(itemTagsData);
        // Remove the following line to avoid pre-checking tags for removal
        // setTagsToRemove(new Set(itemTagsData.map((tag) => tag.id)));
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

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    const tagId = parseInt(value, 10);
    const newSelectedTags = new Set(selectedTags);
    if (checked) {
      newSelectedTags.add(tagId);
    } else {
      newSelectedTags.delete(tagId);
    }
    setSelectedTags(newSelectedTags);
  };

  const handleTagRemoveChange = (e) => {
    const { value, checked } = e.target;
    const tagId = parseInt(value, 10);
    const newTagsToRemove = new Set(tagsToRemove);
    if (checked) {
      newTagsToRemove.add(tagId);
    } else {
      newTagsToRemove.delete(tagId);
    }
    setTagsToRemove(newTagsToRemove);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const room = await getSingleRoomByName(formInput.roomID);
    const payload = {
      name: formInput.name,
      image: formInput.image,
      roomID: room.id,
    };

    if (itemObj.id) {
      payload.id = itemObj.id;
      updateItem(payload).then(() => {
        // Handle tag removals
        const currentTagIds = new Set(itemTags.map((tag) => tag.id));
        const tagsToRemoveArray = [...currentTagIds].filter((tagId) => tagsToRemove.has(tagId));
        const tagsToAddArray = [...selectedTags].filter((tagId) => !currentTagIds.has(tagId));

        // Remove tags
        tagsToRemoveArray.forEach((tagId) => deleteItemTagRelationship(itemObj.id, tagId));

        // Add new tags
        tagsToAddArray.forEach((tagId) => createItemTagRelationship(itemObj.id, tagId));

        router.push('/items/viewAllItems');
      });
    } else {
      createItem(payload).then((newItem) => {
        // Add tags to the newly created item
        selectedTags.forEach((tagId) => createItemTagRelationship(newItem.id, tagId));
        router.push('/items/viewAllItems');
      });
    }
  };

  return (
    <div>
      <div className="full-page-background my-items-background" />
      <div className="overlay" />
      <div className="content-container">
        <Form onSubmit={handleSubmit}>
          <h2 className="mt-5 text-black">{itemObj.id ? 'Update Item' : 'Create Item'}</h2>

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
                    key={room.ID}
                    value={room.ID}
                  >
                    {room.name}
                  </option>
                ))
              }
            </Form.Select>
          </FloatingLabel>

          {/* TAGS CHECKBOXES */}
          {itemObj.id && (
            <>
              <h3 className="mt-5 text-black">Remove Tags</h3>
              {itemTags.map((tag) => (
                <Form.Check
                  key={`remove-${tag.id}`}
                  type="checkbox"
                  label={tag.name}
                  value={tag.id}
                  onChange={handleTagRemoveChange}
                  checked={tagsToRemove.has(tag.id)} // No initial check
                  className="text-black"
                />
              ))}
              <h3 className="mt-5 text-black">Add Tags</h3>
              {tags.filter((tag) => !itemTags.some((itemTag) => itemTag.id === tag.id)).map((tag) => (
                <Form.Check
                  key={`add-${tag.id}`}
                  type="checkbox"
                  label={tag.name}
                  value={tag.id}
                  onChange={handleTagChange}
                  checked={selectedTags.has(tag.id)}
                  className="text-black"
                />
              ))}
            </>
          )}
          {!itemObj.id && (
            <>
              <h3 className="mt-5 text-black">Add Tags</h3>
              {tags.map((tag) => (
                <Form.Check
                  key={`add-${tag.id}`}
                  type="checkbox"
                  label={tag.name}
                  value={tag.id}
                  onChange={handleTagChange}
                  checked={selectedTags.has(tag.id)}
                />
              ))}
            </>
          )}

          {/* SUBMIT BUTTON */}
          <Button type="submit">{itemObj.id ? 'Update Item' : 'Create Item'}</Button>
        </Form>
      </div>
    </div>
  );
}

ItemForm.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
};

ItemForm.defaultProps = {
  itemObj: initialState,
};

export default ItemForm;
