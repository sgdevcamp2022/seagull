import React from 'react';
import styled from 'styled-components';

const LoginSignupTitle = () => {
  return (
    <LoginText
      onClick={() => {
        window.location.reload();
      }}
    >
      <img src="/images/eGuBa_logo.png" alt="" />
    </LoginText>
  );
};

const LoginText = styled.div`
  width: 175px;
  height: 90px;
  font-size: 45px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 40px auto 20px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default LoginSignupTitle;
