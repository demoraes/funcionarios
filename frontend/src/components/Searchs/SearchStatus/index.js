import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { Container, SearchBar } from './styles';

function SearchStatus({ visible, search, setSearch }) {
  return (
    <Container visible={visible}>
      <div>
        <SearchBar>
          <MdSearch size={22} color="#999" />
          <select
            type="text"
            placeholder="Salário Inicial"
            value={search}
            onChange={(e) => [setSearch(e.target.value)]}
          >
            <option value="">STATUS</option>
            <option value="1">ATIVO</option>
            <option value="2">INATIVO</option>
            <option value="3">BLOQUEADO</option>
          </select>
        </SearchBar>
      </div>
    </Container>
  );
}

export default SearchStatus;

SearchStatus.defaultProps = {
  search: null,
  setSearch: null,
};

SearchStatus.propTypes = {
  visible: PropTypes.bool.isRequired,
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
