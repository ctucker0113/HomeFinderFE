import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

function ItemLandingPage() {
  const router = useRouter();

  const handleViewAllItems = () => {
    router.push('/items/viewAllItems');
  };

  const handleCreateNewItem = () => {
    router.push('/items/newItem');
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
      <h1>Items Menu</h1>
      <Button
        variant="primary"
        type="button"
        size="lg"
        className="m-2"
        onClick={handleViewAllItems}
      >
        View/Search All Items
      </Button>
      <Button
        variant="success"
        type="button"
        size="lg"
        className="m-2"
        onClick={handleCreateNewItem}
      >
        Create New Item
      </Button>
    </div>
  );
}

export default ItemLandingPage;
