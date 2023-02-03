import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { RxExit } from 'react-icons/rx';

const Popover = ({ onOpenerClick }) => {
  const settingsWindowRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (!settingsWindowRef.current.contains(e.target)) {
        onOpenerClick(e);
      }
    };

    window.addEventListener('click', pageClickEvent, true);

    return () => {
      window.removeEventListener('click', pageClickEvent, true);
    };
  });

  return (
    <Wrapper ref={settingsWindowRef}>
      <ProfileBox>
        <ProfileImg>
          <img src={'/images/anonymousProfile.png'} alt="" />
        </ProfileImg>
        <UserInfoWrap>
          <NickName>닉네임</NickName>
          <EmailAdress>eguba@gmail.com</EmailAdress>
        </UserInfoWrap>
      </ProfileBox>
      <LogoutBox>
        <RxExit />
        <Logout
          onClick={() => {
            Swal.fire('로그아웃 되었습니다!');
            navigate('/login');
          }}
        >
          로그아웃
        </Logout>
      </LogoutBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  background-color: white;
  width: 200px;
  right: 0;
  top: 58px;
  border-radius: 10px;
  z-index: 1;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const ProfileBox = styled.div`
  height: 90px;
  border-bottom: 0.5px solid #f0f0f0;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
`;

const UserInfoWrap = styled.div``;

const ProfileImg = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

const NickName = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  height: 30px;
`;

const EmailAdress = styled.div`
  font-size: 12px;
  height: 30px;
`;

const LogoutBox = styled.div`
  display: flex;
  height: 45px;
  padding: 14px;
  box-sizing: border-box;
`;

const Logout = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: #000000;
  margin-left: 5px;
  font-size: 12px;
  border-top: #f4f4f4 solid 1.5px;
`;

export default Popover;
