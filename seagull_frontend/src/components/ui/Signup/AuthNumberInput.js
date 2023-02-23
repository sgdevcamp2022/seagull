import React from 'react';
import styled from 'styled-components';
import userAPI from '../../../apis/userAPI';
import EmailAuthInput from './EmailAuthInput';

import Swal from 'sweetalert2';

const AuthNumberInput = ({ emailAuthNumRef, showTimer, emailAddress }) => {
  const checkEmailAuth = async () => {
    const authNum = emailAuthNumRef.current.value;
    const email = emailAddress.current.value;
    if (authNum) {
      await userAPI
        .post(`auth/email_auth/verify_email_code/${authNum}`, { email: email })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: '인증되었습니다!',
            confirmButtonColor: '#0e72ed',
          });
        })
        .catch((err) => {
          console.log('인증번호 확인 에러', err);
          Swal.fire({
            title: '인증번호가 일치하지 않습니다!!',
            confirmButtonColor: '#0e72ed',
          });
        });
    } else {
      window.alert('인증번호를 입력해주세요!');
    }
  };
  return (
    <Container>
      <EmailAuthInput
        OnClickCallback={checkEmailAuth}
        title="인증확인"
        placeholder="인증번호를 입력해주세요"
        inputRef={emailAuthNumRef}
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
