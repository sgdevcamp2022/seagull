import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LoginState } from '../../state/UserAtom';

import Swal from 'sweetalert2';
import { RxExit } from 'react-icons/rx';

const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginState);

  const navigate = useNavigate();

  return (
    <NavBarWrap>
      <Wrap>
        <Logo href="/">
          <img src="/images/eGuBa_logo.png" alt="" />
        </Logo>

        {isLogin ? (
          <AfterLoginBox>
            <UserInfo>
              <User>{sessionStorage.getItem('username')}</User>님 반갑습니다:)
            </UserInfo>
            <RxExit />
            <LogoutButton
              onClick={() => {
                sessionStorage.removeItem('username');
                setIsLogin(false);
                Swal.fire({
                  title: '로그아웃 되었습니다!',
                  confirmButtonColor: '#0e72ed',
                });
              }}
            >
              LOGOUT
            </LogoutButton>
          </AfterLoginBox>
        ) : (
          <BeforeLoginBox>
            <LoginButton onClick={() => navigate('/login')}>LOGIN</LoginButton>
            <Dot>·</Dot>
            <SignupButton onClick={() => navigate('/signup')}>
              JOIN
            </SignupButton>
          </BeforeLoginBox>
        )}
      </Wrap>
    </NavBarWrap>
  );
};

const NavBarWrap = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-sizing: border-box;
  user-select: none;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1300px;
`;

const Logo = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 60px;
  margin-right: 40px;
  text-decoration: none;
  color: #01031f;
  font-weight: bolder;
  font-size: 30px;
  overflow: hidden;
  font-size: large;

  img {
    width: 100%;
    height: 100%;
  }
`;

const BeforeLoginBox = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
  margin-right: 20px;
`;

const LoginButton = styled.div`
  font-size: 21px;
  margin: 0 5px;
  cursor: pointer;
  :hover {
    color: #0e72ed;
    font-weight: bold;
  }
`;

const SignupButton = styled.div`
  width: 50px;
  font-size: 21px;
  margin: 0 5px;
  cursor: pointer;
  :hover {
    color: #0e72ed;
    font-weight: bold;
  }
`;

const Dot = styled.div`
  margin: 0 5px;
  display: flex;
  align-items: center;
`;

const AfterLoginBox = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
`;

const UserInfo = styled.div`
  display: flex;
  margin-right: 12px;
`;
const User = styled.div`
  font-size: 18px;
  color: #0e72ed;
  font-weight: bold;
`;

const LogoutButton = styled.div`
  margin-left: 3px;
  :hover {
    font-weight: bold;
  }
`;

export default Header;
