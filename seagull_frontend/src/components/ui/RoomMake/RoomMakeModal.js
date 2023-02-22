import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import { MdClear } from 'react-icons/md';

const RoomMakeModal = ({ setModalOpen }) => {
  const linkRef = useRef();
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();

  const enterRoom = () => {
    const inputLink = linkRef.current.value;
    const baseUrl = 'http://localhost:3000/';
    const requestUrl = inputLink.split(baseUrl)[1];
    if (!inputLink) {
      return alert('링크를 입력해주세요!');
    }
    navigate(`/${requestUrl}`);
    console.log(requestUrl);
  };

  return (
    <>
      <Container>
        <WrapInput>
          <Title>참여하기</Title>
          <CloseBtn onClick={closeModal}>
            <MdClear size={22} />
          </CloseBtn>
        </WrapInput>
        <ContentWrap>
          <RoomName>입장링크</RoomName>
          <InputRoomName ref={linkRef}></InputRoomName>
          <RequestRoomName>입장링크를 입력하세요.</RequestRoomName>
          <Wrap>
            <CancelBtn onClick={closeModal}>취소</CancelBtn>
            <RoomMakeBtn onClick={enterRoom}>입장하기</RoomMakeBtn>
          </Wrap>
        </ContentWrap>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 430px;
  height: 250px;
  background-color: white;
  position: relative;
  box-sizing: border-box;
  margin: 20% auto;
  padding: 10px 20px;
  background: #fff;
  border-radius: 10px;
`;

const CloseBtn = styled.div`
  margin-top: 14px;
  display: flex;
  height: 15px;
  align-items: center;
  /* position: absolute; */
  /* right: 10px; */
  /* top: 10px; */
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  /* font-weight: bold; */
  height: 45px;
  /* margin-bottom: 10px; */
`;

const ContentWrap = styled.div`
  height: 50px;
`;

const WrapInput = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  /* margin-top: 10px; */
`;

const RequestRoomName = styled.div`
  color: #0e72ed;
  font-size: 13px;
  margin-top: 7px;
`;

const Wrap = styled.div`
  height: 50px;
  width: 235px;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
`;

const RoomName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto auto 0;
  font-size: 14px;
  font-weight: bold;
  width: 80px;
  height: 25px;
  color: #0e72ed;
  border-bottom: 1.2px solid #0e72ed;
`;

const InputRoomName = styled.input`
  margin: 11px auto auto 0;
  width: 380px;
  height: 30px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: auto 10px;
  &:focus {
    outline: 1px solid #0e72ed;
  }
`;

const CancelBtn = styled.div`
  width: 110px;
  height: 37px;
  /* margin: auto 10px auto 70px; */
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: transparent;
  border: 2px solid #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RoomMakeBtn = styled.div`
  width: 110px;
  height: 37px;
  /* margin: auto 45px auto 10px; */
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
