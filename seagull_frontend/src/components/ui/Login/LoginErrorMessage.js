import React from 'react';
import styled, { css } from 'styled-components';

const LoginErrorMessage = ({ errorMessage }) => {
  return (
    <ErrorMessage errorMessage={errorMessage}>
      아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.
      <br />
      입력하신 내용을 다시 확인해주세요.
    </ErrorMessage>
  );
};

const ErrorMessage = styled.div`
  ${({ errorMessage }) => {
    return css`
      height: 24px;
      color: #ff0000;
      font-size: 12px;
      display: ${errorMessage ? 'block' : 'none'};
    `;
  }}
`;

export default LoginErrorMessage;
