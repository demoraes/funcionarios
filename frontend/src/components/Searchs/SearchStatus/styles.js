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
  select {
    background: #fff;
    width: 150px;
    height: 36px;
    padding: 10px 10px 10px 30px;
    border: 1px solid #ddd;
    transition: box-shadow 0.1s, border-color 0.1s;
  }
  svg {
    position: absolute;
    left: 10px;
  }
`;
