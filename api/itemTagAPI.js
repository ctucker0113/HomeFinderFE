import { clientCredentials } from "../utils/client";

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// Get All of the Tags Associated With a Specific Item
const getAllTagsForSingleItem = (itemID) => new Promise((resolve, reject) => {

  fetch(`${endpoint}/ItemTags.json?orderBy="itemID"&equalTo="${itemID}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Treat a string response from the back end differently from an array.
      if (typeof data === 'string' && data === 'No Tags Found For This Item.') {
        resolve([]); // Resolve with an empty array if no tags are found
      } else if (data && typeof data === 'object') {
        resolve(Object.values(data)); // Resolve with the array of tags
      } else {
        reject('Unexpected response format');
      }
    })
    .catch(reject);
});

// Create an ItemTag (i.e. - Add a Tag to an Item)
const createItemTagRelationship = (itemID, tagID) => {
  const itemTagID = `${itemID}_${tagID}`;  // Combine itemID and tagID to form a unique identifier

  // Payload with itemID, tagID, and itemTagID
  const payload = {
    itemID,
    tagID,
    itemTagID,
  };

  // Send the payload to Firebase
  return new Promise((resolve, reject) => {
    fetch(`${endpoint}/ItemTags.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then((data) => {
      // Once the entity is created, patch the firebaseKey into the object
      const firebaseKey = data.name;  // Firebase returns the unique key
      fetch(`${endpoint}/ItemTags/${firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firebaseKey }),  // Patch the firebaseKey back into the object
      })
      .then(() => resolve(firebaseKey))  // Return the firebaseKey for further use
      .catch(reject);
    })
    .catch(reject);
  });
};

const getFirebaseKeyByItemTagID = (itemTagID) => {
  return new Promise((resolve, reject) => {
    fetch(`${endpoint}/ItemTags.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Loop through all ItemTags to find the matching itemTagID
        for (const key in data) {
          if (data[key].itemTagID === itemTagID) {
            resolve(data[key].firebaseKey);  // Return the firebaseKey
            return;
          }
        }
        reject(new Error(`ItemTag with itemTagID: ${itemTagID} not found.`));
      })
      .catch(reject);
  });
};

const deleteItemTagRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  // Use the firebaseKey to delete the specific ItemTag entity
  fetch(`${endpoint}/ItemTags/${firebaseKey}.json`, {
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
    getAllTagsForSingleItem,
    createItemTagRelationship,
    deleteItemTagRelationship,
    getFirebaseKeyByItemTagID
}
