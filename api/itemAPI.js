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
    getSingleItem,
    createItem,
    updateItem,
    deleteItem
}