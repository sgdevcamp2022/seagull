import React from 'react';
import styled from 'styled-components';

const LoginSignupTitle = () => {
  return <LoginText onClick = {() => {window.location.reload()}} >LOGO</LoginText>;
};

const LoginText = styled.div`
  width: 100%;
  height: 60px;
  font-size: 45px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 40px auto 20px;
  cursor: pointer;
`;

export default LoginSignupTitle;
