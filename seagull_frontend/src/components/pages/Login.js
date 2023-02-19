import React from 'react';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LoginState, UserState } from '../../state/UserAtom';

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

  const [userData, setUserData] = useRecoilState(UserState);
  const [isLogin, setIsLogin] = useRecoilState(LoginState);

  const normalLogin = async ({ username, password }) => {
    await userAPI
      .get(`/auth/login/normal?user_id=${username}&password=${password}`)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: `${username}님 반갑습니다!`,
          confirmButtonColor: '#0e72ed',
        });
        navigate('/');
      })
      .catch((err) => {
        console.log('로그인 에러', err);
        Swal.fire({
          title: '로그인 정보를 다시 확인해주세요!',
          confirmButtonColor: '#0e72ed',
        });
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
      // setUserData(LoginData);
      // setIsLogin(true);
      sessionStorage.setItem('username', LoginData.username);
      console.log(LoginData);
      normalLogin(LoginData);
      // navigate('/');
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
          {/* <LineWrap> */}
          {/* <Line/> <Text</Text> */}
          {/* </LineWrap> */}
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

const LineWrap = styled.div`
  width: 100%;
  height: 20px;
  background-color: aliceblue;
`;

export default Login;
