import { clientCredentials } from "../utils/client";

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// Get All of the Tags Associated With a Specific Item
const getAllTagsForSingleItem = (itemID) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/getAllTagsForSingleItem/${itemID}`, {
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
        } else if (Array.isArray(data)) {
          resolve(data); // Resolve with the array of tags
        } else {
          reject('Unexpected response format');
        }
      })
      .catch(reject);
  });

// Create an ItemTag (i.e. - Add a Tag to an Item)
// Adds a tag to an item by creating a new ItemTag entity on the joined table.
const createItemTagRelationship = (itemId, tagId) => {
    // Pass itemId and tagId from the function parameters into the payload to create a new ItemTag Object.
    const payload = {
      itemID: itemId,
      tagID: tagId,
    };
  
    // Posts the payload to the ItemTag Database. Note: The Back-End API call will return a 400 error if this relationship already
    // exists, preventing users from adding a tag more than once to an item.
    return new Promise((resolve, reject) => {
      fetch(`${endpoint}/api/addTagToItem/${itemId}/${tagId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(reject);
    });
  };

const deleteItemTagRelationship = (itemID, tagID) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/DeletePodcastFromPlaylist/${itemID}/${tagID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'applicaton/json',
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
}
