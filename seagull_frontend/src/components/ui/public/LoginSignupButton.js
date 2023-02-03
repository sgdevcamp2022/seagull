import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const LoginSignupButton = ({text }) => {

  const navigate = useNavigate();

  return <SubmitButton onClick = {()=> {navigate('/')}}>{text}</SubmitButton>;
};

const SubmitButton = styled.button`
  width: 420px;
  height: 48px;
  cursor: pointer;
  background-color:#0e72ed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
  border: none;
  border-radius: 6px;
`;

export default LoginSignupButton;
