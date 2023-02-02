import React from 'react';
import styled from 'styled-components';
import LoginErrorMessage from '../ui/Login/LoginErrorMessage';
import LoginSignupButton from '../ui/public/LoginSignupButton';
import LoginSignupInputForm from '../ui/public/LoginSignupInputForm';
import LoginSignupTitle from '../ui/public/LoginSignupTitle';
import SignupButton from '../ui/Signup/SignupButton';

const Login = () => {
  return (
    <LoginContainer>
      <LoginSignupTitle />
      <Wrap>
        <LoginWrap>
          <LoginSignupInputForm text="아이디" />
          <LoginSignupInputForm text="비밀번호" />
          <LoginErrorMessage />
          <LoginSignupButton />
          <SignupButton />
        </LoginWrap>
      </Wrap>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 500px;
  height: 400px;
  max-width: 500px;
  max-height: 400px;
  min-width: 500px;
  min-height: 400px;
  background-color: white;
  border: 1px solid #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const LoginWrap = styled.form`
  margin: 50px 150px;
  /* background-color: beige; */
`;

export default Login;
