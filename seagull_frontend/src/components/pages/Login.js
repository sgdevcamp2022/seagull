import React from 'react';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginErrorMessage from '../ui/Login/LoginErrorMessage';
import LoginSignupButton from '../ui/public/LoginSignupButton';
import LoginSignupInputForm from '../ui/public/LoginSignupInputForm';
import LoginSignupTitle from '../ui/public/LoginSignupTitle';
import PasswordInputForm from '../ui/public/PasswordInputForm';
import SignupButton from '../ui/Signup/SignupButton';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const idRef = useRef();
  const pwRef = useRef();

  const clickLogin = (e) => {
    e.preventDefault();
    console.log(idRef);
    console.log(pwRef);
    if (idRef.current.value === '' || pwRef.current.value === '') {
      setErrorMessage(true);
      return;
    } else {
      setErrorMessage(false);
      navigate('/');
    }
  };

  return (
    <LoginContainer>
      <LoginSignupTitle />
      <Wrap>
        <LoginWrap>
          <LoginSignupInputForm idRef={idRef} text="아이디" />
          <PasswordInputForm pwRef={pwRef} type="password" text="비밀번호" />
          <LoginErrorMessage errorMessage={errorMessage} />
          <LoginSignupButton clickLogin={clickLogin} text="로그인" />
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

const LoginWrap = styled.div`
  margin: 50px 150px;
`;

const InputForm = styled.input`
  width: 420px;
  height: 48px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #dedede;
  padding: 14px 17px 13px;
  margin-bottom: 20px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.1s ease;
  &:focus {
    border: 1px solid #326bf0;
    padding: 14px 17px 13px;
    box-shadow: 0px 0px 5px rgba(162, 233, 250, 0.5);
  }
  &::placeholder {
    color: gray;
  }
`;

export default Login;
