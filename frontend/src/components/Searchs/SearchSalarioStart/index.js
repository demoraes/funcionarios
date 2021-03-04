import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { Container, SearchBar } from './styles';

function SearchSalarioStart({ visible, search, setSearch }) {
  return (
    <Container visible={visible}>
      <div>
        <SearchBar>
          <MdSearch size={22} color="#999" />
          <input
            type="text"
            placeholder="Salário Inicial"
            value={search}
            onChange={(e) => [setSearch(e.target.value)]}
          />
        </SearchBar>
      </div>
    </Container>
  );
}

export default SearchSalarioStart;

SearchSalarioStart.defaultProps = {
  search: null,
  setSearch: null,
};

SearchSalarioStart.propTypes = {
  visible: PropTypes.bool.isRequired,
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
