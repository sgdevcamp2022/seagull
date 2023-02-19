import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginSignupTitle from '../ui/public/LoginSignupTitle';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <LoginSignupTitle />
      <ErrorTitle>404 NOT FOUND</ErrorTitle>
      <ErrorContent>요청하신 URL을 찾을 수 없습니다.</ErrorContent>

      <BackMainButton onClick={() => navigate('/')}>
        메인페이지로 돌아가기
      </BackMainButton>
    </Container>
  );
};

const Container = styled.div`
  /* margin-top: 50px; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ErrorTitle = styled.div`
  margin-bottom: 10px;
  font-size: 60px;
  font-weight: bolder;
`;

const ErrorContent = styled.div`
  margin-bottom: 40px;
  font-size: 25px;
`;

const BackMainButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  font-size: 15px;
  background-color: lightgray;
  &:hover {
    background-color: gray;
    color: white;
    transition-duration: 0.2s;
  }
`;

export default NotFound;
