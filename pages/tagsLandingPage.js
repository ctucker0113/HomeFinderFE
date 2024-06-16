import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

function TagsLandingPage() {
  const router = useRouter();

  const handleViewAllTags = () => {
    router.push('/tags/view');
  };

  const handleCreateNewTag = () => {
    router.push('/tags/create');
  };

  const handleAddTagToItem = () => {
    router.push('/tags/add-to-item');
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
      <h1>Tags Management</h1>
      <Button
        variant="primary"
        type="button"
        size="lg"
        className="m-2"
        onClick={handleViewAllTags}
      >
        View All Tags
      </Button>
      <Button
        variant="success"
        type="button"
        size="lg"
        className="m-2"
        onClick={handleCreateNewTag}
      >
        Create New Tag
      </Button>
      <Button
        variant="info"
        type="button"
        size="lg"
        className="m-2"
        onClick={handleAddTagToItem}
      >
        Add Tag to an Item
      </Button>
    </div>
  );
}

export default TagsLandingPage;
