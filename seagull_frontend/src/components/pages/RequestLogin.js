import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RequestLogin = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>로그인 후 이용해주세요</Title>
      <LoginBtn onClick={() => navigate('/')}>로그인 하러가기</LoginBtn>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.div``;

const LoginBtn = styled.div`
  width: 300px;
  height: 80px;
  background-color: aliceblue;
  cursor: pointer;
`;

export default RequestLogin;
