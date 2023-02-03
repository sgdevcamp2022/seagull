import React from 'react';
import styled from 'styled-components';

const RoomUserUnit = () => {
  return (
    <Wrap>
        <ProfileImage>
        <img src={'/images/anonymousProfile.png'} alt="" />
        </ProfileImage>
        <UserForm>
            <Title>
            <Nickname>닉네임</Nickname>
            </Title>
            
            <UserInfo>호스트(나)</UserInfo>
        </UserForm>
    </Wrap>
  )
}

const Wrap =styled.div`
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

const UserForm =styled.div`
    width: calc(100% - 45px);
`;  

const Title =styled.div`
    display: flex;
`;

const Nickname =styled.div`
margin-top: 5px;
    height: 15px;
    font-size:16px;
    /* font-weight: bold; */
    margin-bottom: 7px;
`;

const UserInfo = styled.div`
    font-size: 11px;
    line-height: 150%;
    color:#0e72ed;
`;

export default RoomUserUnit