import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  margin-bottom: 25px;
  margin: 0 auto;

  div {
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      align-items: center;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      height: 36px;
      padding: 10px 16px;
      border-radius: 4px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;

export const Cadastro = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 50%;
  }
`;
