import React from 'react';
import styled from 'styled-components';

const SendUnitChat = ({ time, content, author }) => {
  const chatTime = time && new Date(time).getHours();
  const chatMin = time && new Date(time).getMinutes();
  return (
    <Wrap>
      <ChatForm>
        <ChatTitle>
          <Time>{`${
            chatTime >= 12 ? chatTime - 12 : chatTime
          }:${chatMin}PM`}</Time>
          <Nickname>{author}</Nickname>
        </ChatTitle>

        <ChatMessage>{content}</ChatMessage>
      </ChatForm>
      <ProfileImage>
        <img src={'/images/anonymousProfile.png'} alt="" />
      </ProfileImage>
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
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ChatForm = styled.div`
  width: calc(100% - 45px);
`;

const ChatTitle = styled.div`
  justify-content: flex-end;
  display: flex;
`;

const Nickname = styled.div`
  color: white;
  margin-top: 5px;
  margin-left: 15px;
  height: 15px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Time = styled.div`
  box-sizing: border-box;
  padding-left: 5px;
  font-size: 11px;
  color: gray;
  display: flex;
  align-items: center;
`;

const ChatMessage = styled.div`
  color: white;
  font-size: 12px;
  line-height: 150%;
  text-align: right;
`;

export default SendUnitChat;
