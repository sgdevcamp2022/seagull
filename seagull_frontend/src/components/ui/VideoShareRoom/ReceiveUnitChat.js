import React from 'react';
import styled from 'styled-components';

const ReceiveUnitChat = ({ time, content, author }) => {
  const chatTime = time && new Date(time).getHours();
  const chatMin = time && new Date(time).getMinutes();
  //   console.log(chatTime);
  return (
    <Wrap>
      <ProfileImage>
        <img src={'/images/anonymousProfile.png'} alt="" />
      </ProfileImage>
      <ChatForm>
        <ChatTitle>
          <Nickname>{author}</Nickname>
          <Time>{`${
            chatTime >= 12 ? chatTime - 12 : chatTime
          }:${chatMin}PM`}</Time>
        </ChatTitle>

        <ChatMessage>{content}</ChatMessage>
      </ChatForm>
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

const ChatForm = styled.div`
  width: calc(100% - 45px);
`;

const ChatTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Nickname = styled.div`
  color: grey;
  margin-top: 5px;
  height: 15px;
  font-size: 16px;
  /* font-weight: bold; */
  margin-bottom: 10px;
`;

const Time = styled.div`
  font-size: 12px;
  padding-right: 5px;
  color: gray;
  display: flex;
  align-items: center;
`;

const ChatMessage = styled.div`
  color: lightgrey;
  font-size: 12px;
  line-height: 150%;
`;

export default ReceiveUnitChat;
