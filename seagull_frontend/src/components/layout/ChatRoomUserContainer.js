import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

import MenuIconBox from '../ui/VideoShareRoom/MenuIconBox';
import ChatForm from './ChatForm';
import RoomUserForm from './RoomUserForm';

const ChatRoomUserContainer = ({
  messageInputRef,
  sendMessage,
  user,
  hostName,
}) => {
  const [isViewChat, setIsViewChat] = useState(true);

  return (
    <div>
      <MenuWrap>
        <TabWrap onClick={() => setIsViewChat(true)}>
          <MenuIconBox isActive={isViewChat ? true : false} menu="채팅" />
        </TabWrap>
        <TabWrap onClick={() => setIsViewChat(false)}>
          <MenuIconBox
            isActive={isViewChat ? false : true}
            menu="참여자"
            user={user?.length}
          />
        </TabWrap>
      </MenuWrap>
      <ContentWrap>
        {isViewChat ? (
          <ChatForm
            messageInputRef={messageInputRef}
            sendMessage={sendMessage}
          />
        ) : (
          <RoomUserForm user={user} hostName={hostName} />
        )}
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

const TabWrap = styled.div`
  cursor: pointer;
  width: 35%;
`;

const ContentWrap = styled.div`
  /* height: calc(100vh - 40px); */
  width: 100%;
  /* background-color: blue; */
`;

export default ChatRoomUserContainer;
