import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createRoom, updateRoom } from '../../api/roomAPI';

const initialState = {
  name: '',
  image: '',
};

function CreateRoomForm({ roomObj }) {
  const [formInput, setFormInput] = useState(initialState);
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
    // Populate form if roomObj is provided and has an id
    if (roomObj.id) {
      setFormInput(roomObj);
    }
  }, [roomObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomObj.id) {
      updateRoom(formInput).then(() => {
        router.push('/rooms');
      });
    } else {
      const payload = {
        name: formInput.name,
        image: formInput.image,
      };
      createRoom(payload).then(() => {
        router.push('/rooms');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{roomObj.id ? 'Update Room' : 'Create Room'}</h2>

      {/* ROOM NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Room Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Room Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ROOM IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Room Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{roomObj.id ? 'Update Room' : 'Create Room'}</Button>
    </Form>
  );
}

CreateRoomForm.propTypes = {
  roomObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
};

CreateRoomForm.defaultProps = {
  roomObj: initialState,
};

export default CreateRoomForm;
