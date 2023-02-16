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
import axios from 'axios';

//components
import ChatRoomUserContainer from '../layout/ChatRoomUserContainer';
import VideoShareForm from '../layout/VideoShareForm';
import LeaveButton from '../ui/VideoShareRoom/LeaveButton';
import webSocketAPI from '../../apis/webSocketAPI';

var isHost = false;

const VideoShareRoom = () => {
  const [isConnect, setIsConnect] = useState(
    sessionStorage.getItem('username') ? true : false
  );
  const [client, setClient] = useState();

  const [user, setUser] = useState();

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
    console.log(sessionStorage.getItem('host'));
    if (sessionStorage.getItem('host')) {
      isHost = true;
      setControls(true);
      setStyle({});
    }
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
    console.log('호스트?', isHost);
    console.log(stompClient);
    stompClient.subscribe(`/subscribe/group/${roomlink}`, onMessageReceived);
    console.log(client);
  };

  const message = (payload) => {
    console.log(payload.body);

    if (payload.body === 'exit') {
      console.log(stompClient);
      return stompClient.disconnect();
    }
    if (JSON.parse(payload.body).url) {
      setUrl(JSON.parse(payload.body).url);
    }

    console.log('참여자', JSON.parse(payload.body).users);
    console.log('참여자 수', JSON.parse(payload.body).users.length);
    console.log('url', JSON.parse(payload.body).url);

    setUser(JSON.parse(payload.body).users);
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
    console.log('호스트맞놔', isHost);

    if (message.type === 'CHAT') {
      setChatMessage(message);
    } else if (message.type === 'VIDEO') {
      // if (message.author === 'sys:host') {
      //   console.log(message.content);
      //   setHostState(true);
      //   setVideoState({ ...videoState, controls: true });
      // } else
      if (message.author === 'URL') {
        if (url !== message.content) {
          setUrl(message.content);
        }
      } else if (message.author === 'Control:play') {
        if (!isHost) {
          console.log(!JSON.parse(message.content));
          setPlaying(!JSON.parse(message.content));
          console.log(playing);
        }
      } else if (message.author === 'Control:sync') {
        if (!isHost) {
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

  const [url, setUrl] = useState(null);
  const [controls, setControls] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [style, setStyle] = useState({ pointerEvents: 'none' });

  // const setHost = () => {
  //   isHost = true;
  //   setControls(true);
  //   setStyle({});
  // };

  const setTime = (time) => {
    if (Math.abs(videoRef.current.getCurrentTime() - time) > 0.25) {
      videoRef.current.seekTo(time);
    }
  };

  //영상공유
  const sendVideo = (type, msg) => {
    var videoContent = msg;

    console.log(videoContent);
    console.log(isHost);

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

  const handleLeaveRoom = () => {
    console.log('방나가기');

    const username = sessionStorage.getItem('username');
    let userInfo = {
      roomLink: roomlink,
      userId: username,
    };

    client.send(`/publish/exit/${roomlink}`, {}, JSON.stringify(userInfo));
  };

  const setTestState = () => {
    setPlaying(!playing);
  };

  console.log('나', sessionStorage.getItem('username'));

  const sendUrl = async (url) => {
    await webSocketAPI
      .post(`/room/video/${roomlink}`, { url: url })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('url전송 에러', err);
      });
  };

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
                  key={url}
                  ref={videoRef}
                  className="react-player"
                  url={url}
                  width="100%"
                  height="100%"
                  controls={controls}
                  muted={true}
                  playing={playing}
                  progressInterval={1000}
                  style={style}
                  onProgress={() => {
                    if (isHost) {
                      sendVideo(
                        'Control:sync',
                        videoRef.current.getCurrentTime()
                      );
                    }
                  }}
                  onPause={() => {
                    console.log(isHost);
                    if (isHost) {
                      sendVideo('Control:play', 'true');
                    }
                  }}
                  onPlay={() => {
                    console.log('테스트', isHost);
                    // setPlaying(true);

                    if (isHost) {
                      console.log('나오나');
                      sendVideo('Control:play', 'false');
                    }
                  }}
                />
              </VideoPlayWrap>
            </Wrap>
            <ToolBarWrap>
              <ToolBarContainer>
                <ShareVideoInput>
                  <VideoIcon>
                    <MdVideoCall size={30} color="#0e72ed" />
                  </VideoIcon>
                  <VideoUrlInput
                    placeholder="영상 url을 입력하세요"
                    ref={urlRef}
                  ></VideoUrlInput>
                  <InputButton
                    onClick={(e) => {
                      sendUrl(urlRef.current.value);
                      sendVideo('URL', urlRef.current.value);
                      e.preventDefault();
                    }}
                  >
                    <MdOutlineInput size={25} color="grey" />
                  </InputButton>
                </ShareVideoInput>
                <LeaveButton handleLeaveRoom={handleLeaveRoom} />
              </ToolBarContainer>
            </ToolBarWrap>
          </VideoWrap>
          <ChatWrap>
            <ChatRoomUserContainer
              messageInputRef={messageInputRef}
              sendMessage={sendMessage}
              user={user}
              infoMe={sessionStorage.getItem('username')}
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
  background-color: #191919;
`;

const RoomInfoWrap = styled.div`
  height: 40px;
  width: 90%;
  align-items: center;
  box-sizing: border-box;
  font-size: 15px;
  display: flex;
  margin: auto;
`;

const ChatWrap = styled.div`
  width: calc(100vw - 75%);
  height: 100%;
  box-shadow: -15px 0px 30px -30px gray;
  background-color: #262626;
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
  color: white;
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
  height: 80px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const ToolBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100%;
`;

const ShareVideoInput = styled.div`
  width: 55%;
  min-width: 200px;
  height: 50%;
  /* margin-left: 0px; */
  background-color: #262626;
  display: flex;
  border-radius: 10px;
  position: relative;
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
  color: white;
`;

const InputButton = styled.div`
  width: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: absolute;
  height: 100%;
  right: 5px;
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
  background-color: black;
`;
export default VideoShareRoom;
