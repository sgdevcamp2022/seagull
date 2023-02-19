import React from 'react';
import styled from 'styled-components';
import { useState, useRef } from 'react';

import Swal from 'sweetalert2';

import LoginSignupButton from '../ui/public/LoginSignupButton';
import LoginSignupInputForm from '../ui/public/LoginSignupInputForm';
import LoginSignupTitle from '../ui/public/LoginSignupTitle';
import PasswordInputForm from '../ui/public/PasswordInputForm';
import AuthNumberInput from '../ui/Signup/AuthNumberInput';
import EmailAuthInput from '../ui/Signup/EmailAuthInput';
import SignupInputTitle from '../ui/Signup/SignupInputTitle';
import userAPI from '../../apis/userAPI';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const receiveEmail = async (email) => {
    console.log(email);
    await userAPI
      .post('/auth/email_auth/sending_email', { email: email })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: '인증메일이 발송되었습니다',
          text: `인증메일이 오지 않을 경우, 스팸함 또는 스팸설정을 확인해주세요`,
          width: 420,
          confirmButtonColor: '#0e72ed',
        });
      })
      .catch((err) => {
        console.log('인증번호 전송 에러', err);
        window.alert('인증번호 전송 실패!');
      });
  };

  const completeSignUp = async (SignupData) => {
    await userAPI
      .post('auth/register', SignupData)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: '회원가입 성공하셨습니다!',
          confirmButtonColor: '#0e72ed',
        });
        navigate('/login');
      })
      .catch((err) => {
        console.log('회원가입 오류', err);
        window.alert('회원가입 실패!');
      });
  };

  const duplicateId = async () => {
    await userAPI
      .get(
        `/auth/id_duplicate_check?user_type=normal&user_id=${usernameRef.current.value}`
      )
      .then((res) => {
        console.log(res.data.duplicate);
        if (res.data.duplicate) {
          return Swal.fire({
            title: '이미 존재하는 아이디 입니다!',
            confirmButtonColor: '#0e72ed',
          });
        }
        Swal.fire({
          title: '사용 가능한 아이디 입니다!',
          confirmButtonColor: '#0e72ed',
        });
      })
      .catch((err) => {
        console.log('중복확인 오류', err);
        window.alert('중복확인 오류!');
      });
  };

  //timer
  let PlAYTIME;
  let timerAuth;
  let sec = 60;
  var time = 60000 * 3;

  const [alertSent, setAlertSent] = useState(false);
  const [alertcomment, setAlertcomment] = useState('');
  const [sentAuth, setSentAuth] = useState(false);
  const [authData, setAuthData] = useState();

  const playNumber = useRef(null);
  const timerNumber = useRef(null);

  const [showTimer, setShowTimer] = useState('');

  const TIMER = () => {
    PlAYTIME = setInterval(function () {
      time = time - 1000;
      let min = time / (60 * 1000); //초를 분으로 나눠준다.
      if (sec > 0) {
        //sec=60 에서 1씩 빼서 출력해준다.
        sec = sec - 1;
        setShowTimer(Math.floor(min) + '분' + sec + '초'); //실수로 계산되기 때문에 소숫점 아래를 버리고 출력해준다.
      }
      if (sec === 0) {
        // 0에서 -1을 하면 -59가 출력된다.
        // 그래서 0이 되면 바로 sec을 60으로 돌려주고 value에는 0을 출력하도록 해준다.
        sec = 60;
        setShowTimer(Math.floor(min) + '분' + '00초');
      }
    }, 1000); //1초마다
    playNumber.current = PlAYTIME;
  };

  const ReceiveEmail = () => {
    const email = emailRef.current.value;
    receiveEmail(email);

    TIMER();
    timerAuth = setTimeout(() => SentAuthOverTime(), time); //3분이 되면 타이머를 삭제한다.
    timerNumber.current = timerAuth;
  };

  const SentAuthOverTime = () => {
    console.log('종료', timerNumber.current, playNumber.current);
    clearTimeout(timerNumber.current);
    clearInterval(playNumber.current);
    setAlertcomment('인증 시간이 초과되었습니다.');
    setShowTimer('');
    setAlertSent(true);
    setSentAuth(false);
  };

  //user
  const usernameRef = useRef();
  const emailRef = useRef();
  const emailAuthNumRef = useRef();
  const nickNameRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

  const clickSubmit = () => {
    const SignupData = {
      user_id: usernameRef.current.value,
      password: passwordRef.current.value,
      password_check: passwordCheckRef.current.value,
      nickname: nickNameRef.current.value,
      email: emailRef.current.value,
    };

    if (SignupData.password !== SignupData.password_check) {
      return Swal.fire({
        title: '비밀번호가 일치하지 않습니다',
        confirmButtonColor: '#0e72ed',
      });
    }
    console.log(SignupData);
    completeSignUp(SignupData);
  };

  return (
    <SignupContainer>
      <LoginSignupTitle />
      <Wrap>
        <SignupWrap>
          <SignupInputTitle title="본인 확인 이메일" />
          <EmailAuthInput
            inputRef={emailRef}
            OnClickCallback={ReceiveEmail}
            title="인증번호 전송"
            placeholder="이메일을 입력해주세요"
          />
          <AuthNumberInput
            emailAuthNumRef={emailAuthNumRef}
            showTimer={showTimer}
            emailAddress={emailRef}
          />

          <SignupInputTitle title="아이디" />
          <EmailAuthInput
            inputRef={usernameRef}
            OnClickCallback={duplicateId}
            title="중복확인"
            placeholder="아이디를 입력해주세요."
          />

          <SignupInputTitle title="닉네임" />
          <LoginSignupInputForm
            inputRef={nickNameRef}
            text="닉네임을 입력해주세요."
          />

          <SignupInputTitle title="비밀번호" />
          <PasswordInputForm
            inputRef={passwordRef}
            text="비밀번호를 입력해주세요."
          />

          <SignupInputTitle title="비밀번호 확인" />
          <PasswordInputForm
            inputRef={passwordCheckRef}
            text="비밀번호를 다시 입력해주세요."
          />

          <LoginSignupButton clickSubmit={clickSubmit} text="가입하기" />
        </SignupWrap>
      </Wrap>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 500px;
  max-width: 500px;
  min-width: 500px;
  background-color: white;
  border: 1px solid #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const SignupWrap = styled.div`
  margin: 50px 150px;
`;

export default Signup;
