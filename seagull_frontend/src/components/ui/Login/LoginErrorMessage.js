import React from 'react';
import styled from 'styled-components';

const LoginErrorMessage = () => {
  return (
    <ErrorMessage>
      아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.
      <br />
      입력하신 내용을 다시 확인해주세요.
    </ErrorMessage>
  );
};

const ErrorMessage = styled.div`
  height: 24px;
  color: #ff0000;
  font-size: 12px;
`;

export default LoginErrorMessage;
