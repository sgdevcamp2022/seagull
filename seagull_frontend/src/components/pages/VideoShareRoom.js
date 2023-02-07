import React from 'react';
import styled from 'styled-components';
import { BiInfoCircle } from 'react-icons/bi';
import { MdVideoCall, MdOutlineInput } from 'react-icons/md';
// import { useRecoilValue } from 'recoil';
// import { UserState } from '../../state/UserAtom';

import ChatRoomUserContainer from '../layout/ChatRoomUserContainer';
import VideoShareForm from '../layout/VideoShareForm';
import LeaveButton from '../ui/VideoShareRoom/LeaveButton';

const VideoShareRoom = () => {
  // const value = useRecoilValue(UserState);
  return (
    <Container>
      <VideoWrap>
        <RoomInfoWrap>
          <InfoIcon>
            <BiInfoCircle size={20} color="#0e72ed" />
          </InfoIcon>
          <RoomName>방 이름 방 이름 방 이름</RoomName>
        </RoomInfoWrap>
        <VideoShareForm />
        <ToolBarWrap>
          <ShareVideoInput>
            <VideoIcon>
              <MdVideoCall size={30} color="#0e72ed" />
            </VideoIcon>
            <VideoUrlInput placeholder="영상 url을 입력하세요"></VideoUrlInput>
            <InputButton>
              <MdOutlineInput size={25} color="grey" />
            </InputButton>
          </ShareVideoInput>
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

const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 15px;
  /* background-color: aliceblue; */
`;

const RoomName = styled.div`
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
  width: 100%;
`;

const ShareVideoInput = styled.div`
  width: 400px;
  height: 50%;
  margin-right: 450px;
  background-color: #ffffff;
  display: flex;
  border-radius: 10px;
`;

const VideoIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
`;

const VideoUrlInput = styled.input`
  width: 320px;
  border: none;
  background-color: transparent;
  outline: none;
`;

const InputButton = styled.div`
  width: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: lightgray; */
  border-radius: 10px;
`;

export default VideoShareRoom;
