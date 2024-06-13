import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createItem, updateItem } from '../../api/itemAPI';
import { getAllRooms, getSingleRoomByName } from '../../api/roomAPI';

const initialState = {
  name: '',
  image: '',
  roomID: '',
};

function ItemForm({ itemObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  // Define the handleChange function to update formInput
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  useEffect(() => {
    // Fetch all of the rooms data in order to populate the "Rooms" dropdown on the form.
    getAllRooms().then(setRooms);
    // Populate form if itemObj is provided and has an id
    if (itemObj.id) {
      setFormInput(itemObj);
    }
  }, [itemObj]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const room = await getSingleRoomByName(formInput.roomID);
    if (itemObj.id) {
      const payload = {
        id: itemObj.id,
        name: formInput.name,
        image: formInput.image,
        roomID: room.id,
      };
      updateItem(payload).then(() => {
        router.push('/items');
      });
    } else {
      const payload = {
        name: formInput.name,
        image: formInput.image,
        roomID: room.id,
      };
      createItem(payload).then(() => {
        router.push('/items');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{itemObj.id ? 'Update Item' : 'Create Item'}</h2>

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

      {/* ITEM IMAGE INPUT  */}
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

      {/* ROOM SELECT  */}
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

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{itemObj.id ? 'Update Item' : 'Create Item'}</Button>
    </Form>
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
