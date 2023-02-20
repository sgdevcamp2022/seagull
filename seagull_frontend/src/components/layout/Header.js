import React from 'react';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import ProfileImagePopover from '../ui/public/ProfileImagePopover';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState } from '../../state/UserAtom';

import Swal from 'sweetalert2';
import { RxExit } from 'react-icons/rx';

const Header = () => {
  const [isPopperShown, setIsPopperShown] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(LoginState);

  const navigate = useNavigate();

  const onOpenerClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPopperShown(!isPopperShown);
  };

  return (
    <NavBarWrap>
      <Wrap>
        <Logo href="/">
          <img src="/images/eGuBa_logo.png" alt="" />
        </Logo>

        {isLogin ? (
          <AfterLoginBox>
            {/* <ProfileImg isPopperShown={isPopperShown} onClick={onOpenerClick}>
              <img src={'/images/anonymousProfile.png'} alt="" />
            </ProfileImg>
            {isPopperShown && (
              <ProfileImagePopover onOpenerClick={onOpenerClick} />
            )} */}
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
  /* border-bottom: 0.5px solid slategray; */
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
  /* color: #0e72ed; */
  cursor: pointer;
  :hover {
    color: #0e72ed;
    font-weight: bold;
  }
  /* margin-right: 10px; */
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
  /* width: 84px; */
`;

const UserInfo = styled.div`
  /* width: 200px; */
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

const ProfileImg = styled.div`
  ${({ isPopperShown }) => {
    return css`
      width: 48px;
      height: 48px;
      border-radius: 25px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;
      /* box-shadow: ${isPopperShown ? '0px 0px 5px #a2e9fa;' : ''};  */
      img {
        width: 100%;
        height: 100%;
      }
    `;
  }}
`;

export default Header;
