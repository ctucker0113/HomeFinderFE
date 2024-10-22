import { clientCredentials } from "../utils/client";

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// Get All Items for a Single User
const getAllItems = (uid) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Items.json?orderBy="userID"&equalTo="${uid}"`, {
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
    fetch(`${endpoint}/Items.json?orderBy="roomID"&equalTo="${roomID}"`, {
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
const getSingleItem = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Items/${firebaseKey}.json`, {
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

  fetch(`${endpoint}/Items.json`, {
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

  // Update Item
  const updateItem = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Items/${payload.firebaseKey}.json`, {
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
const deleteItem = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/Items/${firebaseKey}.json`, {
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
    getSingleItem,
    createItem,
    updateItem,
    deleteItem,
    getAllItemsInARoom
}