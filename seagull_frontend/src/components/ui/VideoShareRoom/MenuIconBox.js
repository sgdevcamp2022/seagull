import React from 'react';
import styled, { css } from 'styled-components';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';

const MenuIconBox = ({ isActive, menu, user }) => {
  return (
    <Wrap isActive={isActive}>
      <Icon>
        {menu === '채팅' ? (
          <BsFillChatDotsFill size={18} />
        ) : (
          <HiUsers size={20} />
        )}
      </Icon>
      <MenuName>
        {menu} {user}
      </MenuName>
    </Wrap>
  );
};

const Wrap = styled.div`
  ${({ isActive }) => {
    return css`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: ${isActive ? '2px solid black' : ''};
      color: ${isActive ? 'white' : 'grey'};
      padding: 0 10px;
      box-sizing: border-box;
    `;
  }}
`;

const Icon = styled.div`
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const MenuName = styled.div`
  /* width: calc(100% - 40px); */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;

export default MenuIconBox;
