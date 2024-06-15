import { clientCredentials } from "../utils/client";

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// Get All Tags
const getAllTags = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/getAllTags`, {
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
  const getSingleTag = (id) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/getSingleTag/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
  
  // Create New Tag
  const createTag = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/createTag`, {
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
  
  // Delete Tag
  const deleteTag = (id) => new Promise((resolve, reject) => {
      fetch(`${endpoint}/api/deleteTag/${id}`, {
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
    getAllTags,
    getSingleTag,
    createTag,
    deleteTag,
  }
