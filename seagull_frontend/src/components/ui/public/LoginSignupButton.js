import React from 'react';
import styled from 'styled-components';

const LoginSignupButton = () => {
  return <SubmitButton>로그인</SubmitButton>;
};

const SubmitButton = styled.button`
  width: 400px;
  height: 48px;
  cursor: pointer;
  background-color: #557bd4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-top: 15px;
  border: none;
  border-radius: 6px;
`;

export default LoginSignupButton;
