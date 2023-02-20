import React from 'react';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import { FaVideo } from 'react-icons/fa';
import { SiWechat } from 'react-icons/si';
import Swal from 'sweetalert2';

import webSocketAPI from '../../apis/webSocketAPI';

import Header from '../layout/Header';
import RoomMakeModal from '../ui/RoomMake/RoomMakeModal';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoginState } from '../../state/UserAtom';

const RoomMake = () => {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  const isLogin = useRecoilValue(LoginState);

  // 모달창 노출
  const showModal = () => {
    if (isLogin) {
      setModalOpen(true);
    } else {
      Swal.fire({
        title: '로그인 후 이용해주세요!',
        confirmButtonColor: '#0e72ed',
      });
      navigate('/login');
    }
  };

  const navigate = useNavigate();

  const username = sessionStorage.getItem('username');

  //방만들기
  const makeRoom = async () => {
    console.log(username);
    if (isLogin) {
      await webSocketAPI
        .post(`/room/create/${username}`)
        .then((res) => {
          console.log(res);
          navigate(`/videoshare/${res.data.roomLink}`);
          sessionStorage.setItem('host', username);
        })
        .catch((err) => {
          console.log('방만들기 에러', err);
          Swal.fire({
            title: '방만들기 오류',
            confirmButtonColor: '#0e72ed',
          });
        });
    } else {
      Swal.fire({
        title: '로그인 후 이용해주세요!',
        confirmButtonColor: '#0e72ed',
      });
      navigate('/login');
    }
  };

  return (
    <Wrap>
      <Header />
      <ContentWrap>
        <TitleWrap>
          <ColorWrap />
          <Title>영상 공유를 위한 플랫폼</Title>
          <FunctionWrap>
            <PlatformFunction>
              <IconWrap>
                <FaVideo size={21} color="#0D2140" />
              </IconWrap>
              <FuctionText>영상 공유</FuctionText>
            </PlatformFunction>

            <PlatformFunction>
              <IconWrap>
                <SiWechat size={21} color="#0D2140" />
              </IconWrap>
              <FuctionText> 실시간 채팅</FuctionText>
            </PlatformFunction>
          </FunctionWrap>
        </TitleWrap>
        <ImageWrap>
          <ProjectImageWrap>
            <ProjectImage>
              <img src={'/images/projectImage.png'} alt="" />
            </ProjectImage>
          </ProjectImageWrap>
          <RoomMakeWrap>
            <ProjectTitle>
              eGuBa는 영상을 다같이 볼 수 있는 플랫폼입니다
            </ProjectTitle>
            <ProjectExplain>
              관심있는 유튜브 영상을 친구들과 함께 보세요.
            </ProjectExplain>
            <ButtonWrap>
              <RoomMakeBtn onClick={makeRoom}>방만들기</RoomMakeBtn>
              <JoinBtn onClick={showModal}>참여하기</JoinBtn>
              <Container modalOpen={modalOpen}>
                {modalOpen && <RoomMakeModal setModalOpen={setModalOpen} />}
              </Container>
            </ButtonWrap>
          </RoomMakeWrap>
        </ImageWrap>
      </ContentWrap>
      {/* <MakeRoomBtn onClick={showModal}>방만들기</MakeRoomBtn> */}
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: rgba(113, 160, 236, 0.07);
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContentWrap = styled.div`
  /* margin-top: 50px; */
  height: calc(100vh - 85px);
  display: flex;
`;

const TitleWrap = styled.div`
  width: 270px;
  background-color: #01031f;
`;

const ColorWrap = styled.div`
  height: 50px;
  background-color: #0e72ed;
`;

const Title = styled.div`
  margin: 70px 20px 40px 20px;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const FunctionWrap = styled.div``;

const ImageWrap = styled.div`
  width: calc(100vw - 270px);
  /* background-color: white; */
  /* border: 1px solid gray; */
  display: flex;
`;

const ProjectImageWrap = styled.div`
  width: calc(100vw - 870px);
  height: 100%;
  /* background-color: aqua; */
`;

const ProjectImage = styled.div`
  margin: 150px 20px auto 40px;
  /* width: 500px; */
  height: 330px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  img {
    width: 90%;
    height: 90%;
  }
`;

const RoomMakeWrap = styled.div`
  width: 600px;
  padding: 50px;
  box-sizing: border-box;
`;

const ProjectTitle = styled.div`
  margin-top: 125px;
  font-size: 38px;
  /* font-weight: bold; */
`;

const ProjectExplain = styled.div`
  font-size: 23px;
  margin-top: 20px;
  color: grey;
`;

const ButtonWrap = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

const PlatformFunction = styled.div`
  height: 40px;
  /* background-color: white; */
  margin-bottom: 20px;
  margin-left: 30px;
  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background-color: #4f8fee;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FuctionText = styled.div`
  background-color: transparent;
  height: 40px;
  color: white;
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-left: 16px;
`;

const RoomMakeBtn = styled.div`
  margin: 30px 12px;
  width: 155px;
  height: 55px;
  border-radius: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0c5cff;

  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    transition-duration: 0.3s;
    background-color: #004ce4;
  }
`;

const JoinBtn = styled.div`
  margin: 30px 40px;
  width: 155px;
  height: 55px;
  border-radius: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #004ce4;
  font-weight: bold;
  font-size: 18px;
  background-color: transparent;
  border: 1px solid #004ce4;
  cursor: pointer;
  &:hover {
    transition-duration: 0.3s;
    background-color: #e8eeff;
  }
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
