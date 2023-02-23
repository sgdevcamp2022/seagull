import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import LeavePopover from './LeavePopover';

const LeaveButton = ({ handleLeaveRoom }) => {
  const [isPopperShown, setIsPopperShown] = useState(false);

  const onOpenerClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPopperShown(!isPopperShown);
  };

  return (
    <Wrap>
      {isPopperShown && (
        <LeavePopover
          onOpenerClick={onOpenerClick}
          handleLeaveRoom={handleLeaveRoom}
        />
      )}
      <LeaveBtn onClick={onOpenerClick}>Leave</LeaveBtn>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 40px;
  position: relative;
`;

const LeaveBtn = styled.div`
  width: 80px;
  height: 100%;
  color: white;
  background-color: #db5061;
  align-items: center;
  display: flex;
  justify-content: center;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover {
    background-color: red;
  }
`;

export default LeaveButton;
