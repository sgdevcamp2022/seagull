//packages
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import styled, { css } from 'styled-components';
import { RxCopy } from 'react-icons/rx';
import { MdVideoCall, MdOutlineInput } from 'react-icons/md';
import { BiArrowFromRight, BiArrowFromLeft } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useSetRecoilState } from 'recoil';
import { ChatMessageState } from '../../state/UserAtom';

//components
import ChatRoomUserContainer from '../layout/ChatRoomUserContainer';
import LeaveButton from '../ui/VideoShareRoom/LeaveButton';
import webSocketAPI from '../../apis/webSocketAPI';
import Swal from 'sweetalert2';
import VideoPlayer from '../ui/VideoShareRoom/VideoPlayer';

var isHost = false;

const VideoShareRoom = () => {
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem('username') ? true : false
  );
  const [client, setClient] = useState();

  const [user, setUser] = useState();
  const [hostName, setHostName] = useState();
  const navigate = useNavigate();

  const { roomlink } = useParams();
  const setChatMessage = useSetRecoilState(ChatMessageState);

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
    if (sessionStorage.getItem('host')) {
      isHost = true;
      setControls(true);
      setStyle({});
    }
  };

  const onConnected = () => {
    const username = sessionStorage.getItem('username');
    let userInfo = { roomLink: roomlink, userId: username };

    stompClient.send(
      `/publish/enterRoom/${roomlink}`,
      {},
      JSON.stringify(userInfo)
    );
    stompClient.subscribe(`/subscribe/room/${roomlink}`, message);
    stompClient.subscribe(`/subscribe/group/${roomlink}`, onMessageReceived);
  };

  const message = (payload) => {
    console.log(payload.body);

    if (payload.body === 'exit') {
      if (!isHost) {
        Swal.fire({
          title: '호스트에 의해 방이 종료 되었습니다!',
          confirmButtonColor: '#0e72ed',
        });
        navigate('/');
      }
      return stompClient.disconnect();
    }

    if (JSON.parse(payload.body).hostName) {
      setHostName(JSON.parse(payload.body).hostName);
    }

    if (JSON.parse(payload.body).url && !isHost) {
      handleTimer();
      setUrl(JSON.parse(payload.body).url);
    }

    setUser(JSON.parse(payload.body).users);
  };

  const onError = (error) => {
    console.log('웹소켓 연결 에러!');
    window.alert('웹소켓 연결 실패!');
  };

  //채팅
  const sendMessage = (e) => {
    e.preventDefault();
    var messageInput = messageInputRef.current.value;

    const username = sessionStorage.getItem('username');

    var messageContent = messageInput;

    if (messageContent && client) {
      messageInputRef.current.value = '';
      var chatMessage = {
        roomLink: roomlink,
        author: username,
        content: messageInput,
        type: 'CHAT',
      };

      client.send(
        `/publish/sendMessage/${roomlink}`,
        {},
        JSON.stringify(chatMessage)
      );
      messageInput = '';
    }
  };

  let PlAYTIME;
  let sec = 1;

  const playNumber = useRef(null);

  const handleTimer = () => {
    PlAYTIME = setInterval(function () {
      sec = sec - 1;
      if (sec < 0) {
        setPlaying(false);
        console.log('중ㅈㅣ');
        clearInterval(PlAYTIME);
      }
      console.log(sec + 1 + '초');
    }, 1000);
    playNumber.current = PlAYTIME;
  };

  //이벤트에 따라 받아오는 값 처리
  const onMessageReceived = (payload) => {
    console.log(payload.body);
    var message = JSON.parse(payload.body);

    if (message.type === 'CHAT') {
      setChatMessage(message);
    } else if (message.type === 'VIDEO') {
      if (message.author === 'URL') {
        if (url !== message.content) {
          setUrl(message.content);
        }
      } else if (message.author === 'Control:play') {
        if (!isHost) {
          setPlaying(!JSON.parse(message.content));
        }
      } else if (message.author === 'Control:sync') {
        if (!isHost) {
          setTime(Number(message.content));
          clearInterval(PlAYTIME);
        }
      }
    }
  };

  const entryRoomSocket = () => {
    // connectRoomWebSocket();
  };

  useEffect(() => {
    if (isLogin) {
      entryRoomSocket();
    }
  }, [isLogin]);

  //
  var videoRef = useRef();
  const urlRef = useRef();

  const [url, setUrl] = useState(null);
  const [controls, setControls] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [style, setStyle] = useState({ pointerEvents: 'none' });

  const setTime = (time) => {
    if (Math.abs(videoRef.current.getCurrentTime() - time) > 0.25) {
      videoRef.current.seekTo(time);
    }
  };

  //영상공유
  const sendVideo = (type, msg) => {
    var videoContent = msg;
    if (isHost) {
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
    } else {
      Swal.fire({
        title: '호스트 권한이 없습니다!',
        confirmButtonColor: '#0e72ed',
      });
    }
  };

  const handleLeaveRoom = () => {
    const username = sessionStorage.getItem('username');
    let userInfo = {
      roomLink: roomlink,
      userId: username,
    };

    client.send(`/publish/exit/${roomlink}`, {}, JSON.stringify(userInfo));

    Swal.fire({
      title: '메인페이지로 이동합니다',
      confirmButtonColor: '#0e72ed',
    });
    navigate('/');
    sessionStorage.removeItem('host');
    client.disconnect();
  };

  const sendUrl = async (url) => {
    if (isHost) {
      await webSocketAPI
        .post(`/room/video/${roomlink}`, { url: url })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log('url전송 에러', err);
        });
    }
  };

  const requestLogin = () => {
    Swal.fire({
      title: '로그인 후 이용가능한 서비스입니다!',
      confirmButtonColor: '#0e72ed',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const [openChatBox, setOpenChatBox] = useState(true);

  return (
    <Container>
      {!isLogin ? (
        requestLogin()
      ) : (
        <>
          <VideoWrap openChatBox={openChatBox}>
            <RoomInfoWrap>
              <InfoIcon onClick={clipboardCopy}>
                <RxCopy size={20} color=" #224c80" />
              </InfoIcon>
              <RoomName>{window.location.href}</RoomName>
              <ChatButton onClick={() => setOpenChatBox(!openChatBox)}>
                {openChatBox ? (
                  <BiArrowFromLeft color="lightgrey" size={25} />
                ) : (
                  <BiArrowFromRight color="lightgrey" size={25} />
                )}
              </ChatButton>
            </RoomInfoWrap>

            <VideoPlayer
              url={url}
              videoRef={videoRef}
              controls={controls}
              playing={playing}
              style={style}
              sendVideo={sendVideo}
              isHost={isHost}
            />

            <ToolBarWrap>
              <ToolBarContainer>
                <ShareVideoInput>
                  <VideoIcon>
                    <MdVideoCall size={30} color="grey" />
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
                    <MdOutlineInput size={25} />
                  </InputButton>
                </ShareVideoInput>
                <LeaveButton handleLeaveRoom={handleLeaveRoom} />
              </ToolBarContainer>
            </ToolBarWrap>
          </VideoWrap>
          <ChatWrap openChatBox={openChatBox}>
            <ChatRoomUserContainer
              messageInputRef={messageInputRef}
              sendMessage={sendMessage}
              user={user}
              hostName={hostName}
              openChatBox={openChatBox}
            />
          </ChatWrap>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
`;
const VideoWrap = styled.div`
  ${({ openChatBox }) => {
    return css`
      width: ${openChatBox ? 'calc(100vw - 300px)' : '100vw'};
      height: 100vh;
      background-color: #191919;
      overflow: hidden;
    `;
  }}
`;

const RoomInfoWrap = styled.div`
  height: 50px;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  font-size: 15px;
  display: flex;
  margin: auto;
  padding-left: 5%;
`;

const ChatWrap = styled.div`
  ${({ openChatBox }) => {
    return css`
      width: ${openChatBox ? '300px' : '0px'};
      height: 100%;
      box-shadow: -15px 0px 30px -30px gray;
      background-color: #262626;
    `;
  }}
`;

const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 15px;
  cursor: pointer;
`;

const RoomName = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  margin: 15px auto 0 4px;
  color: white;
`;

const ChatButton = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  width: 35px;
  height: 30px;
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
  width: 70%;
  min-width: 200px;
  max-width: 520px;
  height: 50%;
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
  svg {
    color: #224c80;
  }
  svg:hover {
    color: #0e72ed;
  }
`;

export default VideoShareRoom;
