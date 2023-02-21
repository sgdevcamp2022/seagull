import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { FiLink } from 'react-icons/fi';

const InvitePopover = ({ onOpenerClick }) => {
  const settingsWindowRef = useRef(null);
  const navigate = useNavigate();

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

  const clipboardCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert('링크 복사 완료!');
  };

  return (
    <Wrapper ref={settingsWindowRef}>
      <ProfileBox>초대링크 복사</ProfileBox>
      <LogoutBox>
        <CopyWrap>
          <InviteUrl placeholder={window.location.href} disabled>
            {/* {window.location.href} */}
          </InviteUrl>
          <CopyBtn onClick={clipboardCopy}>
            <FiLink size={18} />
          </CopyBtn>
        </CopyWrap>
      </LogoutBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  background-color: grey;
  width: 260px;
  right: 20px;
  top: 38px;
  border-radius: 10px;
  z-index: 2;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const ProfileBox = styled.div`
  color: white;
  height: 40px;
  border-bottom: 0.5px solid #f0f0f0;
  padding: 15px;
  box-sizing: border-box;
  font-size: 15px;
  display: flex;
`;

const LogoutBox = styled.div`
  /* display: flex; */
  height: 55px;
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
`;

const CopyWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  border-radius: 5px;
`;

const InviteUrl = styled.input`
  padding-left: 10px;
  width: 210px;
  outline: none;
  border: none;
  background-color: transparent;
`;

const CopyBtn = styled.div`
  margin-left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logout = styled.div`
  border-radius: 5px;
  cursor: pointer;
  background-color: #f4f4f4;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #000000;
  /* margin-left: 5px; */
  font-size: 12px;
  border-top: #f4f4f4 solid 1.5px;
`;

export default InvitePopover;
