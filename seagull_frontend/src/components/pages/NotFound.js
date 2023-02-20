import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <TextWrap>
        <Logo>
          <img src="/images/eGuBa_logo.png" alt="" />
        </Logo>
        <ErrorTitle>404 NOT FOUND</ErrorTitle>
        <ErrorContent>요청하신 페이지를 찾을 수 없습니다.</ErrorContent>
        <ErrorDetail>
          방문하시려는 페이지의 주소가 잘못 입력되었거나, <br />
          페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
          <br />
          <br />
          입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </ErrorDetail>
        <BackMainButton onClick={() => navigate('/')}>
          메인페이지로 돌아가기
        </BackMainButton>
      </TextWrap>
      <ImageWrap>
        <img src="/images/notfound.png" alt="" />
      </ImageWrap>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrap = styled.div`
  width: 430px;
  height: 360px;
`;

const ImageWrap = styled.div`
  width: 220px;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Logo = styled.div`
  width: 150px;
  height: 80px;
  margin-bottom: 12px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ErrorTitle = styled.div`
  margin-bottom: 3px;
  font-size: 25px;
  font-weight: bolder;
`;

const ErrorContent = styled.div`
  margin-bottom: 40px;
  font-size: 18px;
`;

const ErrorDetail = styled.div`
  font-size: 13px;
  margin-bottom: 25px;
`;

const BackMainButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 180px;
  height: 40px;
  font-size: 15px;
  background-color: lightgray;
  &:hover {
    background-color: gray;
    color: white;
    transition-duration: 0.2s;
  }
`;

export default NotFound;
