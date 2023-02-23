import React from 'react';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { LoginState } from '../../state/UserAtom';

import userAPI from '../../apis/userAPI';

import Swal from 'sweetalert2';

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

  const setIsLogin = useSetRecoilState(LoginState);

  const normalLogin = async ({ username, password }) => {
    sessionStorage.setItem('username', username);
    setIsLogin(true);
    Swal.fire({
      title: `${username}님 반갑습니다!`,
      confirmButtonColor: '#0e72ed',
    });
    navigate('/');
    await userAPI
      .get(`/auth/login/normal?user_id=${username}&password=${password}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('로그인 에러', err);
      });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const LoginData = {
      username: idRef.current.value,
      password: pwRef.current.value,
    };
    if (idRef.current.value === '' || pwRef.current.value === '') {
      setErrorMessage(true);
      return;
    } else {
      setErrorMessage(false);

      normalLogin(LoginData);
    }
  };

  return (
    <LoginContainer>
      <LoginSignupTitle />
      <Wrap>
        <LoginWrap>
          <LoginSignupInputForm inputRef={idRef} text="아이디" />
          <PasswordInputForm inputRef={pwRef} type="password" text="비밀번호" />
          <LoginErrorMessage errorMessage={errorMessage} />
          <LoginSignupButton clickSubmit={clickSubmit} text="로그인" />
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

export default Login;
