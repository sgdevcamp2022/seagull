import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ErrorTitle>404 NOT FOUND</ErrorTitle>
      <ErrorContent>요청하신 URL을 찾을 수 없습니다.</ErrorContent>

      <BackMainButton onClick={() => navigate('/')}>
        메인페이지로 돌아가기
      </BackMainButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ErrorTitle = styled.div`
  margin: 40px auto 10px;
  font-size: xx-large;
  font-weight: bolder;
`;

const ErrorContent = styled.div`
  margin-bottom: 40px;
`;

const BackMainButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 3px;
  width: 150px;
  height: 30px;
  background-color: lightgray;
  &:hover {
    background-color: gray;
    color: white;
    transition-duration: 0.2s;
  }
`;

export default NotFound;
