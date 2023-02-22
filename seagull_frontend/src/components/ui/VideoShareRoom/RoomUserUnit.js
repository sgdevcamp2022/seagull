import React from 'react';
import styled from 'styled-components';
import { BsPersonFill } from 'react-icons/bs';

const RoomUserUnit = ({ username, hostName, color }) => {
  const infoMe = sessionStorage.getItem('username');

  console.log(username, color);
  return (
    <Wrap>
      <ProfileImage color={color}>
        <BsPersonFill size={30} color="#f4f4f4" />
      </ProfileImage>
      <UserForm>
        <Title>
          <UserInfo>
            <Nickname>{username} </Nickname>
            {infoMe === username ? <Nickname>(나)</Nickname> : ''}
          </UserInfo>
          {hostName === username ? <InfoMe>👑 호스트</InfoMe> : ''}
        </Title>
      </UserForm>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 25px;
`;

const ProfileImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  img {
    width: 100%;
    height: 100%;
  }
`;

const UserForm = styled.div`
  width: calc(100% - 45px);
`;

const Title = styled.div`
  /* display: flex; */
`;

const Nickname = styled.div`
  margin-top: 5px;
  /* height: 15px; */
  font-size: 18px;
  /* font-weight: bold; */
  margin-bottom: 3px;
  color: white;
`;

const InfoMe = styled.div`
  color: lightgrey;
  /* margin-top: 5px; */
  font-size: 12px;
`;

const UserInfo = styled.div`
  display: flex;
`;

export default RoomUserUnit;
