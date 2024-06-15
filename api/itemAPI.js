import { clientCredentials } from "../utils/client";

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// Get All Items
const getAllItems = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/getAllItems`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

  const getAllItemsInARoom = (roomID) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/getAllItemsByRoom/${roomID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // This code is needed to prevent a strange bug from occurring on View All Room Details.
        // It treats a string response from back end("No items found") differently from an array response.
        // Without this code, the program treats the string as an array, and creates a blank item card for each character in the string.
        if (typeof data === 'string') {
          resolve(data); // Resolve the string message directly
        } else {
          resolve(Object.values(data)); // Resolve as an array of items
        }
      })
      .catch(reject);
  });

// Get Single Item
const getSingleItem = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/getSingleItem/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Create New Item
const createItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/createItem`, {
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

  // Update Room
  const updateItem = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/updateItem/${payload.id}`, {
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

// Delete Item
const deleteItem = (id) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/deleteItem/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => resolve(data))
      .catch(reject);
  });

export {
    getAllItems,
    getAllItemsInARoom,
    getSingleItem,
    createItem,
    updateItem,
    deleteItem
}