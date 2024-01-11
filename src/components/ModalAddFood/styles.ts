import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const CloseButton = styled.div`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme["gray-500"]};
`;

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  .label {
    margin-bottom: 8px;
    color: rgba(108, 108, 128, 1);
    font-size: 16px;
  }

  div {
    display: flex;
    width: 100%;
    margin-right: 8px;
    align-items: flex-start;

    > div {
      flex-direction: column;
      margin-bottom: 8px;
    }
  }

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }

  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #39b100;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      width: 56px;
      height: 56px;
      background: #41c900;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
      justify-content: center;
      align-items: center;
    }
  }
`;
