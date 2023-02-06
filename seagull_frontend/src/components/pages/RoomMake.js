import React from 'react';
import styled, { css } from 'styled-components';
import { useState } from 'react';

import Header from '../layout/Header';
import RoomMakeModal from '../ui/RoomMake/RoomMakeModal';

const RoomMake = () => {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <Wrap>
      <Header />
      <MakeRoomBtn onClick={showModal}>방만들기</MakeRoomBtn>
      <Container modalOpen={modalOpen}>
        {modalOpen && <RoomMakeModal setModalOpen={setModalOpen} />}
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
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
