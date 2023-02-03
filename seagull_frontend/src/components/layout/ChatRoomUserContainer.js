import React from 'react';
import styled from 'styled-components';
import MenuIconBox from '../ui/VideoShareRoom/MenuIconBox';
import ChatForm from './ChatForm';
import RoomUserForm from './RoomUserForm';

const ChatRoomUserContainer = () => {
  return (
    <div>
      <MenuWrap>
        <MenuIconBox menu="채팅" />
        <MenuIconBox menu="참여자" number='2' />
      </MenuWrap>
      <ContentWrap>
        <ChatForm/>
        {/* <RoomUserForm/> */}
      </ContentWrap>
    </div>
  );
};

const MenuWrap = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid lightgrey;
  /* background-color: aliceblue; */
`;

const ContentWrap = styled.div`
  height: calc(100vh - 40px);
  width: 100%;
  /* background-color: blue; */
`;

export default ChatRoomUserContainer;
