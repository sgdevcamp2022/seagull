import React from 'react';
import styled from 'styled-components';

const SendUnitChat = ({ key, time, content, author }) => {
  return (
    <Wrap>
      <ChatForm>
        <ChatTitle>
          <Time>{time} PM</Time>
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
  /* background-color: #f4f4f4;
    border-radius: 20px; */
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
  display: flex;
  justify-content: space-between;
`;

const Nickname = styled.div`
  margin-top: 5px;
  height: 15px;
  font-size: 16px;
  /* font-weight: bold; */
  margin-bottom: 10px;
`;

const Time = styled.div`
  box-sizing: border-box;
  padding-left: 5px;
  font-size: 12px;
  color: gray;
  display: flex;
  align-items: center;
`;

const ChatMessage = styled.div`
  font-size: 12px;
  line-height: 150%;
  text-align: right;
`;

export default SendUnitChat;
