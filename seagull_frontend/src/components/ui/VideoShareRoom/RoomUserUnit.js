import React from 'react';
import styled from 'styled-components';

const RoomUserUnit = ({ username }) => {
  const infoMe = sessionStorage.getItem('username');
  console.log(username);
  return (
    <Wrap>
      <ProfileImage>
        <img src={'/images/anonymousProfile.png'} alt="" />
      </ProfileImage>
      <UserForm>
        <Title>
          <Nickname>{username}</Nickname>
          {infoMe === username ? <InfoMe>나(호스트)</InfoMe> : ''}
          {/* {sessionStorage.getItem('host') ? <InfoMe>호스트</InfoMe> : ''} */}
        </Title>

        <UserInfo></UserInfo>
      </UserForm>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  /* background-color: aliceblue; */
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
  font-size: 20px;
  /* font-weight: bold; */
  margin-bottom: 3px;
  color: white;
`;

const InfoMe = styled.div`
  color: white;
  /* margin-top: 5px; */
  font-size: 11px;
`;

const UserInfo = styled.div`
  font-size: 11px;
  line-height: 150%;
  color: #0e72ed;
`;

export default RoomUserUnit;
