import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

function RoomLandingPage() {
  const router = useRouter();

  const handleViewAllRooms = () => {
    router.push('/rooms');
  };

  const handleCreateNewRoom = () => {
    router.push('/rooms/newRoom');
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Rooms Menu</h1>
      <Button
        variant="primary"
        type="button"
        size="lg"
        className="m-2"
        onClick={handleViewAllRooms}
      >
        View My Rooms
      </Button>
      <Button
        variant="success"
        type="button"
        size="lg"
        className="m-2"
        onClick={handleCreateNewRoom}
      >
        Create New Room
      </Button>
    </div>
  );
}

export default RoomLandingPage;
