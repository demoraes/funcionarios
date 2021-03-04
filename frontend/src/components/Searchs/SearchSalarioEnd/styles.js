import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;

  div {
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    justify-content: space-between;
    align-items: center;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  input {
    width: 150px;
    height: 36px;
    padding: 10px 10px 10px 30px;
    border: 1px solid #ddd;
    transition: box-shadow 0.1s, border-color 0.1s;
    &:focus {
      border-color: #7d40e7;
      box-shadow: 0 0 0 1px #7d40e7;
    }
    &::placeholder {
      color: #999;
    }
  }
  svg {
    position: absolute;
    left: 10px;
  }
`;
