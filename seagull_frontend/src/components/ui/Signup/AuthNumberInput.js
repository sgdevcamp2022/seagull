import React from 'react';
import styled from 'styled-components';
import EmailAuthInput from './EmailAuthInput';

const AuthNumberInput = ({ showTimer }) => {
  return (
    <Container>
      <EmailAuthInput
        OnClickCallback={() => console.log('인증번호 확인 완료')}
        title="인증확인"
        placeholder="인증번호를 입력해주세요"
      />
      <TimeLeft>{showTimer}</TimeLeft>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const TimeLeft = styled.div`
  width: 62px;
  height: 23px;
  font-size: 12px;
  font-weight: bold;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12.5px;
  top: 12px;
  left: 250px;
  position: absolute;
`;

export default AuthNumberInput;
