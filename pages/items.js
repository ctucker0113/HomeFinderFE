import { useEffect, useState } from 'react';
import { getAllItems } from '../api/itemAPI';
import ItemCard from '../components/ItemCard';

export default function ViewItems() {
  const [items, setItems] = useState([]);
  const getAllUserItems = () => {
    getAllItems().then(setItems);
  };

  useEffect(() => {
    getAllUserItems();
  }, []);

  return (
    <>
      <h1>Items</h1>
      <div className="d-flex flex-wrap">
        {items.map((item) => (
          <ItemCard key={item.id} itemObj={item} onUpdate={getAllItems} />
        ))}
      </div>
    </>
  );
}
