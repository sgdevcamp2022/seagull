import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { ChatMessageState, UserName } from '../../state/UserAtom';

import { FiSend } from 'react-icons/fi';
import ReceiveUnitChat from '../ui/VideoShareRoom/ReceiveUnitChat';
import SendUnitChat from '../ui/VideoShareRoom/SendUnitChat';

const ChatForm = ({ messageInputRef, sendMessage, color }) => {
  const chatMessage = useRecoilValue(ChatMessageState);
  const username = sessionStorage.getItem('username');
  const [message, setMessage] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  useEffect(() => {
    if (chatMessage) {
      setMessage([...message, chatMessage]);
    }
  }, [chatMessage.timestamp]);

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <Wrap>
      <Title>채팅</Title>
      <Content ref={scrollRef}>
        {message &&
          message.map((msg, idx) =>
            username === msg.author ? (
              <SendUnitChat
                key={idx}
                time={msg.timestamp}
                content={msg.content}
                author={msg.author}
              />
            ) : (
              <ReceiveUnitChat
                key={idx}
                time={msg.timestamp}
                content={msg.content}
                author={msg.author}
              />
            )
          )}
      </Content>
      <InputWrap>
        <InputBox>
          <Input ref={messageInputRef} placeholder="메시지를 입력하세요" />
          <SendButton onClick={sendMessage}>
            <FiSend size={21} color="darkgrey" />
          </SendButton>
        </InputBox>
      </InputWrap>
    </Wrap>
  );
};

const Wrap = styled.div``;

const Title = styled.div`
  display: flex;
  padding-left: 18px;
  /* justify-content: flex-start; */
  align-items: center;
  height: 50px;
  width: 100%;
  /* background-color: aliceblue; */
  box-sizing: border-box;
  font-size: 20px;
  color: white;
`;
const Content = styled.div`
  width: 100%;
  height: calc(100vh - 180px);
  padding: 5px 20px;
  box-sizing: border-box;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #262626;
  }
  ::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 10px;
  }
  ::-moz-scrollbar-button,
  ::-webkit-scrollbar-button {
    width: 0px;
  }
`;
const InputWrap = styled.div`
  overflow: hidden;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid grey;
`;

const InputBox = styled.form`
  background-color: lightgrey;
  width: 95%;
  height: 50px;
  border-radius: 23px;
  padding: 5px 15px;
  box-sizing: border-box;
  display: flex;
  /* border: 1.5px solid #f4f4f4; */
`;

const Input = styled.input`
  width: 85%;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  margin-right: 10px;
  box-sizing: border-box;
  /* color: black; */
`;

const SendButton = styled.button`
  border: none;
  width: 13%;
  height: 100%;
  /* border-radius: 25px; */
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ChatForm;
