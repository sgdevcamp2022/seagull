import React from 'react';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import Popover from '../ui/public/Popover';

const Header = () => {
  const [isPopperShown, setIsPopperShown] = useState(false);

  const onOpenerClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPopperShown(!isPopperShown);
  };

  return (
    <NavBarWrap>
      <Wrap>
        <Logo href="/">LOGO</Logo>

        <AfterLoginBox>
          <ProfileImg isPopperShown={isPopperShown} onClick={onOpenerClick}>
            <img src={'/images/anonymousProfile.png'} alt="" />
          </ProfileImg>
          {isPopperShown && <Popover onOpenerClick={onOpenerClick} />}
        </AfterLoginBox>
      </Wrap>
    </NavBarWrap>
  );
};

const NavBarWrap = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-sizing: border-box;
  user-select: none;
  border-bottom: 0.5px solid slategray;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  width: 1280px;
`;

const Logo = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 44px;
  margin-right: 40px;
  text-decoration: none;
  color: black;
  overflow: hidden;
  font-size: large;
`;

const AfterLoginBox = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
  width: 84px;
`;

const ProfileImg = styled.div`
  ${({ isPopperShown }) => {
    return css`
      width: 48px;
      height: 48px;
      border-radius: 25px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;
      /* box-shadow: ${isPopperShown ? '0px 0px 5px #a2e9fa;' : ''};  */
      img {
        width: 100%;
        height: 100%;
      }
    `;
  }}
`;

export default Header;