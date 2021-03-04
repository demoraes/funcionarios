import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { Container, SearchBar } from './styles';

function HeaderList({
  lowercaseTitle,
  visible,
  searchDataCad,
  setSearchDataCad,
}) {
  return (
    <Container visible={visible}>
      <div>
        <SearchBar>
          <MdSearch size={22} color="#999" />
          <input
            type="text"
            placeholder={lowercaseTitle}
            value={searchDataCad}
            onChange={(e) => [setSearchDataCad(e.target.value)]}
          />
        </SearchBar>
      </div>
    </Container>
  );
}

export default HeaderList;

HeaderList.defaultProps = {
  searchDataCad: null,
  setSearchDataCad: null,
};

HeaderList.propTypes = {
  lowercaseTitle: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  searchDataCad: PropTypes.string,
  setSearchDataCad: PropTypes.func,
};
