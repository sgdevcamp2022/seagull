import React from 'react';
import styled, { css } from 'styled-components';
import { useState } from 'react';

import webSocketAPI from '../../apis/webSocketAPI';

import Header from '../layout/Header';
import RoomMakeModal from '../ui/RoomMake/RoomMakeModal';
import { useNavigate } from 'react-router-dom';

const RoomMake = () => {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  const navigate = useNavigate();

  //방만들기
  const makeRoom = async () => {
    const username = sessionStorage.getItem('username');
    console.log(username);

    await webSocketAPI
      .post(`/room/create/${username}`)
      .then((res) => {
        console.log(res);
        // navigate(`/videoshare/${res.data.roomLink}`);
      })
      .catch((err) => {
        console.log('방만들기 에러', err);
        window.alert('방만들기에 실패하였습니다');
      });
  };

  return (
    <Wrap>
      <Header />
      <RoomMakeBtn onClick={makeRoom}>방만들기</RoomMakeBtn>
      {/* <MakeRoomBtn onClick={showModal}>방만들기</MakeRoomBtn>
      <Container modalOpen={modalOpen}>
        {modalOpen && <RoomMakeModal setModalOpen={setModalOpen} />}
      </Container> */}
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
`;

const RoomMakeBtn = styled.div`
  margin: 30px 40px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: slategray;
  cursor: pointer;
`;

const Container = styled.div`
  ${({ modalOpen }) => {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${modalOpen ? 1 : -1};
      background: ${modalOpen ? 'rgba(0, 0, 0, 0.4)' : 'transparent'};
    `;
  }}
`;

const MakeRoomBtn = styled.div`
  cursor: pointer;
`;

export default RoomMake;
