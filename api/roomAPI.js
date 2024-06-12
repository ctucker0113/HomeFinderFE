import { clientCredentials } from "../utils/client";

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// Get All Rooms
const getAllRooms = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/getAllRooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// Get Single Room
const getSingleRoom = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/getSingleRoom/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Create New Room
const createRoom = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/createRoom`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// Delete Room
const deleteRoom = (id) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/deleteRoom/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => resolve(data))
      .catch(reject);
  });

  // Update Room
const updateRoom = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/updateRoom/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text())
      .then((data) => resolve((data)))
      .catch(reject);
  });

export {
  getAllRooms,
  getSingleRoom,
  deleteRoom,
  updateRoom,
  createRoom
}