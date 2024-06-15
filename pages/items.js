import { useEffect, useState } from 'react';
import { getAllItems } from '../api/itemAPI';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';

export default function ViewItems() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const getAllUserItems = () => {
    getAllItems().then(setItems);
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
    <>
      <h1>Items</h1>
      <div>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className="d-flex flex-wrap">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} itemObj={item} onUpdate={getAllItems} />
        ))}
      </div>
    </>
  );
}
