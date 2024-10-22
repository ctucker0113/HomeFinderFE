import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteRoom } from '../api/roomAPI';

function RoomCard({ roomObj, onUpdate }) {
  const deleteThisRoom = () => {
    if (window.confirm(`Are you 1000% positive you want to delete ${roomObj.name}? This action cannot be undone.`)) {
      deleteRoom(roomObj.firebaseKey).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card className="roomCard" style={{ width: '18rem' }}>
      <Card.Img className="imageFormat" variant="top" src={roomObj.image} />
      <Card.Body>
        <Card.Title>{roomObj.name}</Card.Title>
        <Link href={`/rooms/${roomObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View Items</Button>
        </Link>
        <Link href={`/rooms/edit/${roomObj.firebaseKey}`} passHref>
          <Button variant="info">Edit Room</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisRoom} className="m-2">Delete Room</Button>
      </Card.Body>
    </Card>
  );
}

RoomCard.propTypes = {
  roomObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    ownerID: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RoomCard;
