import { clientCredentials } from "../utils/client";

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// Get All Rooms For a Single User
const getAllRooms = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Rooms.json?orderBy="userID"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// Get Single Room by ID
const getSingleRoom = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Rooms/${firebaseKey}.json`, {
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
  fetch(`${endpoint}/Rooms.json`, {
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
const deleteRoom = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Rooms/${firebaseKey}.json`, {
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
    fetch(`${endpoint}/Rooms/${payload.firebaseKey}.json`, {
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

  // Get a Single Room By Name
const getSingleRoomByName = (name) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Rooms/${name}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getAllRooms,
  getSingleRoom,
  deleteRoom,
  updateRoom,
  createRoom,
  getSingleRoomByName,
}