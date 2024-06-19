import { useEffect, useState } from 'react';
import { getAllItems } from '../../api/itemAPI';
import SearchBar from '../../components/SearchBar';
import ItemCard from '../../components/ItemCard';

export default function ViewItems() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const getAllUserItems = () => {
    getAllItems().then((data) => {
      setItems(data);
      setFilteredItems(data);
    }).catch(() => {
    });
  };

  useEffect(() => {
    getAllUserItems();
  }, []);

  const handleSearch = (searchValue) => {
    const filteredSearch = items.filter((item) => (
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    ));
    setFilteredItems(filteredSearch);
  };

  return (
    <div>
      <div className="full-page-background my-items-background" />
      <div className="overlay" />
      <div className="content-container">
        <h1 className="text-center margin-y-large">My Items</h1>
        <div className="search-bar-container">
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="d-flex flex-wrap item-cards-container">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item.id} itemObj={item} onUpdate={getAllUserItems} />
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
