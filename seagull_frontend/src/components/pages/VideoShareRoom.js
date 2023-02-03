import React from 'react';
import styled from 'styled-components';
import {BiInfoCircle} from 'react-icons/bi';

import ChatRoomUserContainer from '../layout/ChatRoomUserContainer';
import VideoShareForm from '../layout/VideoShareForm';
import LeaveButton from '../ui/VideoShareRoom/LeaveButton';


const VideoShareRoom = () => {
  return (
    <Container>
      <VideoWrap>
        <RoomInfoWrap>
          <InfoIcon>
            <BiInfoCircle size={20} color='#0e72ed'/>
          </InfoIcon>
          <RoomName>
          방 이름 방 이름 방 이름
          </RoomName>
          </RoomInfoWrap>
        <VideoShareForm />
        <ToolBarWrap>
          <LeaveButton />
        </ToolBarWrap>
      </VideoWrap>

      <ChatWrap>
        <ChatRoomUserContainer />
      </ChatWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: aliceblue; */
  display: flex;
`;
const VideoWrap = styled.div`
  width: 75%;
  height: 100vh;
  background-color: #f4f4f4;
`;

const ChatWrap = styled.div`
  width: calc(100vw - 75%);
  height: 100%;
  /* border-left: 1px solid gray; */
  box-shadow: -15px 0px 30px -30px gray;
`;

const RoomInfoWrap = styled.div`
  height: 40px;
  width: 100%;
  padding-left: 55px;
  align-items: center;
  box-sizing: border-box;
  font-size: 15px;
  display: flex;
`;

const InfoIcon =styled.div`
  width: 20px;
  height: 20px;
  margin-top: 15px;
  /* background-color: aliceblue; */
`;

const RoomName =styled.div`
display: flex;
align-items: center;
  height: 20px;
  margin: 15px auto 0 2px; 

`;

const VideoChatWrap = styled.div`
  display: flex;
  height: 560px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: aliceblue;
`;

const ToolBarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

export default VideoShareRoom;
