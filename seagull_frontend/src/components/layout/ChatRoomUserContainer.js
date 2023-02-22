import React from 'react';
import styled, { css } from 'styled-components';
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

  let colors = [
    '#5e86a6',
    '#32c787',
    '#00BCD4',
    '#ff5652',
    '#ffc107',
    '#ff85af',
    '#FF9800',
    '#39bbb0',
  ];

  const getColor = () => {
    return colors[Math.round(Math.random() * colors.length)];
  };

  // console.log(getColor(user));

  const color = getColor();

  console.log(color);

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
            color={color}
          />
        ) : (
          <RoomUserForm user={user} hostName={hostName} color={color} />
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
  /* height: calc(100vh - 40px); */
  width: 100%;
  /* background-color: blue; */
`;

export default ChatRoomUserContainer;
