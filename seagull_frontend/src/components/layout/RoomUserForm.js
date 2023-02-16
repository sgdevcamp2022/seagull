import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import RoomUserUnit from '../ui/VideoShareRoom/\bRoomUserUnit';
import InvitePopover from '../ui/VideoShareRoom/InvitePopover';

const RoomUserForm = ({ user, infoMe }) => {
  const [isPopperShown, setIsPopperShown] = useState(false);

  console.log('ddd', infoMe);

  const onOpenerClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPopperShown(!isPopperShown);
  };

  return (
    <Wrap>
      <>
        <InviteButton onClick={onOpenerClick}>초대</InviteButton>
        {isPopperShown && <InvitePopover onOpenerClick={onOpenerClick} />}
      </>
      <Title>참여자 ({user.length})</Title>
      <Content>
        {user &&
          user.map((name, idx) => <RoomUserUnit key={idx} username={name} />)}
      </Content>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
`;

const InviteButton = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
  border-radius: 10px;
  /* padding-left: 18px; */
  align-items: center;
  height: 35px;
  width: 75px;
  box-sizing: border-box;
  margin-left: 20px;
  margin-top: 20px;
  color: white;
  background-color: #0e72ed;
  cursor: pointer;
`;

const Title = styled.div`
  color: white;
  display: flex;
  padding-left: 22px;
  /* justify-content: flex-start; */
  align-items: center;
  height: 30px;
  width: 100%;
  margin: 10px 0px;
  /* background-color: aliceblue; */
  box-sizing: border-box;
  font-size: 13px;
  border-bottom: 1px solid #f4f4f4;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  padding: 5px 20px;
  box-sizing: border-box;
`;

export default RoomUserForm;
