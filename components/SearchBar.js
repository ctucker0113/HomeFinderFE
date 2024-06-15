import { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SearchBar({ handleSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const handleChange = (e) => {
    const userInput = e.target.value;
    setSearchValue(userInput);
    handleSearch(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        value={searchValue}
        onChange={handleChange}
      />
    </Form>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
