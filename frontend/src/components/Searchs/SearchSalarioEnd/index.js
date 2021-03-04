import React from 'react';
import PropTypes from 'prop-types';

import { Container, SearchBar } from './styles';

function SearchSalarioEnd({ visible, search, setSearch }) {
  return (
    <Container visible={visible}>
      <div>
        <SearchBar>
          <input
            type="text"
            placeholder="Salário final"
            value={search}
            onChange={(e) => [setSearch(e.target.value)]}
          />
        </SearchBar>
      </div>
    </Container>
  );
}

export default SearchSalarioEnd;

SearchSalarioEnd.defaultProps = {
  search: null,
  setSearch: null,
};

SearchSalarioEnd.propTypes = {
  visible: PropTypes.bool.isRequired,
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
