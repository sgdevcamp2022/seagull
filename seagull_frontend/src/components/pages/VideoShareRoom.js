//packages
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { RxCopy } from 'react-icons/rx';
import { MdVideoCall, MdOutlineInput } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { ChatMessageState, UserName } from '../../state/UserAtom';
// import { UserState } from '../../state/UserAtom';

//components
import ChatRoomUserContainer from '../layout/ChatRoomUserContainer';
import VideoShareForm from '../layout/VideoShareForm';
import LeaveButton from '../ui/VideoShareRoom/LeaveButton';

const VideoShareRoom = () => {
  const [isConnect, setIsConnect] = useState(
    sessionStorage.getItem('username') ? true : false
  );
  const [client, setClient] = useState();

  const { roomlink } = useParams();
  const userRef = useRef();
  const setChatMessage = useSetRecoilState(ChatMessageState);
  const [userName, setUserName] = useRecoilState(UserName);

  const clipboardCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert('링크 복사 완료!');
  };

  var stompClient = null;
  const messageInputRef = useRef();

  // connect socket
  const connectRoomWebSocket = () => {
    var socket = new SockJS('http://3.34.161.56:8085/my-chat');
    stompClient = Stomp.over(() => socket);

    stompClient.connect({}, onConnected, onError);

    setClient(stompClient);
  };

  const onConnected = () => {
    const username = sessionStorage.getItem('username');
    let userInfo = { roomLink: roomlink, userId: username };
    console.log(userInfo);

    stompClient.send(
      `/publish/enterRoom/${roomlink}`,
      {},
      JSON.stringify(userInfo)
    );
    stompClient.subscribe(`/subscribe/room/${roomlink}`, message);
    console.log('호스트?', hostState);
    console.log(stompClient);
    stompClient.subscribe(`/subscribe/group/${roomlink}`, onMessageReceived);
    console.log(client);
  };

  const message = (payload) => {
    console.log(payload);
  };

  const onError = (error) => {
    console.log('웹소켓 연결 에러!');
    window.alert('웹소켓 연결 실패!');
  };

  //채팅
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(messageInputRef.current.value);
    console.log(userName);
    var messageInput = messageInputRef.current.value;

    const username = sessionStorage.getItem('username');

    var messageContent = messageInput;
    console.log(messageContent, client);

    if (messageContent && client) {
      console.log(userName, messageContent);
      console.log('유저네임', username);
      messageInputRef.current.value = '';
      var chatMessage = {
        roomLink: roomlink,
        author: username,
        content: messageInput,
        type: 'CHAT',
      };

      console.log(chatMessage);

      client.send(
        `/publish/sendMessage/${roomlink}`,
        {},
        JSON.stringify(chatMessage)
      );
      messageInput = '';
    }
  };

  //이벤트에 따라 받아오는 값 처리
  const onMessageReceived = (payload) => {
    console.log(payload.body);
    var message = JSON.parse(payload.body);
    console.log('호스트맞놔', hostState);

    if (message.type === 'CHAT') {
      setChatMessage(message);
    } else if (message.type === 'VIDEO') {
      // if (message.author === 'sys:host') {
      //   console.log(message.content);
      //   setHostState(true);
      //   setVideoState({ ...videoState, controls: true });
      // } else
      if (message.author === 'URL') {
        if (videoState.url !== message.content) {
          setVideoState({ ...videoState, url: message.content });
        }
      } else if (message.author === 'Control:play') {
        if (!hostState) {
          setVideoState({ ...videoState, playing: !videoState.playing });
        }
      } else if (message.author === 'Control:sync') {
        if (!hostState) {
          console.log(Number(message.content));
          setTime(Number(message.content));
        }
      }
    }
  };

  const entryRoomSocket = () => {
    connectRoomWebSocket();
  };

  useEffect(() => {
    if (isConnect) {
      entryRoomSocket();
    }
  }, [isConnect]);

  //
  var videoRef = useRef();
  const urlRef = useRef();

  const [hostState, setHostState] = useState(false);

  const [videoState, setVideoState] = useState({
    url: null,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: true,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    progressInterval: 1000,
    style: { pointerEvents: 'none' },
  });

  const setHost = () => {
    setHostState(true);
    setVideoState({ ...videoState, controls: true, style: {} });
  };

  useEffect(() => {
    console.log(hostState);
  }, [hostState]);

  const setTime = (time) => {
    if (Math.abs(videoRef.current.getCurrentTime() - time) > 0.25) {
      videoRef.current.seekTo(time);
    }
  };

  //영상공유
  const sendVideo = (type, msg) => {
    var videoContent = msg;

    console.log(videoContent);
    console.log(hostState);

    if (videoContent && client) {
      var chatMessage = {
        roomLink: roomlink,
        author: type,
        content: videoContent,
        type: 'VIDEO',
      };

      client.send(
        `/publish/sendMessage/${roomlink}`,
        {},
        JSON.stringify(chatMessage)
      );
    }
  };

  // const sync = () => {
  //   sendVideo('Control:sync', ref.current.getCurrentTime());
  // };

  return (
    <Container>
      {!isConnect ? (
        <>
          <InputUser ref={userRef}></InputUser>
          <Button onClick={entryRoomSocket}>들어가기</Button>
        </>
      ) : (
        <>
          <VideoWrap>
            <RoomInfoWrap>
              <InfoIcon onClick={clipboardCopy}>
                <RxCopy size={20} color="#0e72ed" />
              </InfoIcon>
              <RoomName>{window.location.href}</RoomName>
            </RoomInfoWrap>
            {/* <VideoShareForm /> */}
            <Wrap>
              <VideoPlayWrap>
                <ReactPlayer
                  ref={videoRef}
                  className="react-player"
                  url={videoState.url}
                  width="100%"
                  height="100%"
                  controls={videoState.controls}
                  muted={videoState.muted}
                  playing={videoState.playing}
                  progressInterval={videoState.progressInterval}
                  style={videoState.style}
                  onProgress={() => {
                    // e.preventDefault();
                    console.log(hostState);
                    if (hostState) {
                      sendVideo(
                        'Control:sync',
                        videoRef.current.getCurrentTime()
                      );
                    }
                  }}
                  onPause={(e) => {
                    e.preventDefault();
                    console.log(hostState);
                    if (hostState) {
                      sendVideo('Control:play', 'true');
                    }
                  }}
                  onPlay={(e) => {
                    e.preventDefault();
                    console.log('테스트', hostState);
                    if (hostState) {
                      sendVideo('Control:play', 'false');
                    }
                  }}
                />
              </VideoPlayWrap>
            </Wrap>
            <ToolBarWrap>
              <ShareVideoInput>
                <VideoIcon onClick={setHost}>
                  <MdVideoCall size={30} color="#0e72ed" />
                </VideoIcon>
                <VideoUrlInput
                  placeholder="영상 url을 입력하세요"
                  ref={urlRef}
                ></VideoUrlInput>
                <InputButton
                  onClick={() => sendVideo('URL', urlRef.current.value)}
                >
                  <MdOutlineInput size={25} color="grey" />
                </InputButton>
              </ShareVideoInput>
              <LeaveButton />
            </ToolBarWrap>
          </VideoWrap>
          <ChatWrap>
            <ChatRoomUserContainer
              messageInputRef={messageInputRef}
              sendMessage={sendMessage}
            />
          </ChatWrap>
        </>
      )}
    </Container>
  );
};

const InputUser = styled.input`
  width: 300px;
  font-size: 50px;
`;

const Button = styled.div`
  width: 400px;
  height: 300px;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
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
  cursor: pointer;
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
  margin-right: 200px;
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
  border-radius: 10px;
`;

const Wrap = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const VideoPlayWrap = styled.div`
  width: 90%;
  height: calc(100vh - 120px);
  background-color: white;
`;
export default VideoShareRoom;
