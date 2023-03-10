import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { RxExit } from 'react-icons/rx';

const LeavePopover = ({ onOpenerClick, handleLeaveRoom }) => {
  const settingsWindowRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (!settingsWindowRef.current.contains(e.target)) {
        onOpenerClick(e);
      }
    };

    window.addEventListener('click', pageClickEvent, true);

    return () => {
      window.removeEventListener('click', pageClickEvent, true);
    };
  });

  return (
    <Wrapper ref={settingsWindowRef}>
      <LogoutBox>
        <RxExit color="white" />
        <Logout
          onClick={() => {
            handleLeaveRoom();
          }}
        >
          방에서 나가기
        </Logout>
      </LogoutBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  background-color: #262626;
  width: 150px;
  right: 0px;
  top: -50px;
  border-radius: 10px;
  z-index: 2;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const LogoutBox = styled.div`
  display: flex;
  height: 45px;
  padding: 14px;
  box-sizing: border-box;
`;

const Logout = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left: 5px;
  font-size: 12px;
`;

export default LeavePopover;
