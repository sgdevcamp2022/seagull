import React from 'react';
import styled from 'styled-components';

const SignupButton = () => {
  return (
    <SignupBtn>
        회원가입
    </SignupBtn>
  )
}


const SignupBtn =styled.div`
  width: 55px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px auto 29px;
  font-size: 15px;
  color: gray;
  cursor: pointer;
  &:hover{
    border-bottom: 1px solid gray;
  } 
`;


export default SignupButton