import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { Container, SearchBar } from './styles';

function SearchNome({ lowercaseTitle, visible, search, setSearch }) {
  return (
    <Container visible={visible}>
      <div>
        <SearchBar>
          <MdSearch size={22} color="#999" />
          <input
            type="text"
            placeholder={lowercaseTitle}
            value={search}
            onChange={(e) => [setSearch(e.target.value)]}
          />
        </SearchBar>
      </div>
    </Container>
  );
}

export default SearchNome;

SearchNome.defaultProps = {
  search: null,
  setSearch: null,
};

SearchNome.propTypes = {
  lowercaseTitle: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
