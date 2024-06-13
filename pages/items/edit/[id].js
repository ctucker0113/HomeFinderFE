import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemForm from '../../../components/forms/ItemForm';
import { getSingleItem } from '../../../api/itemAPI';

export default function EditItemForm() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleItem(id).then(setEditItem);
  }, [id]);

  return (
    <ItemForm itemObj={editItem} />
  );
}
