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
  openChatBox,
}) => {
  const [isViewChat, setIsViewChat] = useState(false);

  return (
    <div>
      {openChatBox ? (
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
      ) : (
        <></>
      )}

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
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid grey;
`;

const TabWrap = styled.div`
  cursor: pointer;
  width: 35%;
`;

const ContentWrap = styled.div`
  width: 100%;
`;

export default ChatRoomUserContainer;
