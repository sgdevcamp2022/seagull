import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import webSocketAPI from '../../../apis/webSocketAPI';
import { useRef } from 'react';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const RoomMakeModal = ({ setModalOpen }) => {
  const testuserRef = useRef();
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  let stompClient = null;

  const navigate = useNavigate();

  const makeRoom = async () => {
    const username = testuserRef.current.value;
    console.log(username);

    await webSocketAPI
      .post(`/room/create/${username}`)
      .then((res) => {
        console.log(res);
        // navigate('/videoshare');
      })
      .catch((err) => {
        console.log('방만들기 에러', err);
        window.alert('방만들기에 실패하였습니다');
      });
  };

  return (
    <>
      <Container>
        <CloseBtn onClick={closeModal}>X</CloseBtn>
        <Title>참여하기</Title>

        <ContentWrap>
          <WrapInput>
            <RoomName>입장링크</RoomName>
            <InputRoomName ref={testuserRef}></InputRoomName>
          </WrapInput>
          <WrapInput>
            <RoomName>입장링크를 입력하세요.</RoomName>
          </WrapInput>
          <Wrap>
            <CancelBtn onClick={closeModal}>취소</CancelBtn>
            <RoomMakeBtn onClick={makeRoom}>만들기</RoomMakeBtn>
          </Wrap>
        </ContentWrap>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 500px;
  height: 250px;
  background-color: white;
  position: relative;
  box-sizing: border-box;
  margin: 20% auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  height: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid lightgray;
`;

const ContentWrap = styled.div`
  height: 50px;
`;

const WrapInput = styled.div`
  height: 50px;
  display: flex;
  /* margin-top: 10px; */
`;

const Wrap = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const RoomName = styled.div`
  margin: 20px auto auto 10px;
  font-size: 15px;
`;

const InputRoomName = styled.input`
  margin: 11px auto auto 0;
  width: 380px;
  height: 28px;
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: auto 10px;
  &:focus {
    outline: 0.5px solid #0e72ed;
  }
`;

const CancelBtn = styled.div`
  width: 100px;
  height: 34px;
  margin: auto 10px auto 70px;
  border-radius: 5px;
  font-size: 14px;
  background-color: transparent;
  border: 2px solid #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RoomMakeBtn = styled.div`
  width: 100px;
  height: 34px;
  margin: auto 45px auto 10px;
  border-radius: 5px;
  font-size: 14px;
  background-color: #0e72ed;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default RoomMakeModal;
