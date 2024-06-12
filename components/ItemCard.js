import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { deleteItem } from '../api/itemAPI';

function ItemCard({ itemObj, onUpdate }) {
// Functionality for delete confirmation pop-up
  const deleteThisItem = () => {
    if (window.confirm(`Are you 1000% positive you want to delete ${itemObj.name}? This action cannot be undone.`)) {
      deleteItem(itemObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="itemCard" style={{ width: '18rem' }}>
      <Card.Img className="imageFormat" variant="top" src={itemObj.image} />
      <Card.Body>
        <Card.Title>{itemObj.name} </Card.Title>
        <Card.Text>
          Location: {itemObj.roomID}
        </Card.Text>
        <Button variant="danger" onClick={deleteThisItem} className="m-2">Delete Item</Button>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    roomID: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ItemCard;
