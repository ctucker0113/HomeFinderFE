import { clientCredentials } from "../utils/client";

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// GET All Items
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


// DELETE Item
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
    deleteItem
}