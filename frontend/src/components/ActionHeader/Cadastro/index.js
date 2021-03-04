import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, Cadastro } from './styles';

function HeaderList({ page, visible }) {
  return (
    <Container visible={visible}>
      <div>
        <Cadastro>
          <Link to={`/${page}`}>
            <MdAdd size={30} color="#fff" />
          </Link>
        </Cadastro>
      </div>
    </Container>
  );
}

export default HeaderList;

HeaderList.propTypes = {
  page: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};
