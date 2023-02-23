import React from 'react';
import styled from 'styled-components';

const EmailAuthInput = ({ inputRef, OnClickCallback, title, placeholder }) => {
  return (
    <>
      <Container>
        <InputForm type="text" placeholder={placeholder} ref={inputRef} />
        <ReceiveEmailButton onClick={OnClickCallback}>
          {title}
        </ReceiveEmailButton>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputForm = styled.input`
  width: 310px;
  height: 48px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #dedede;
  padding: 14px 17px 13px;
  margin-bottom: 20px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.1s ease;
  &:focus {
    border: 1px solid #326bf0;
    padding: 14px 17px 13px;
    box-shadow: 0px 0px 5px rgba(162, 233, 250, 0.5);
  }
  &::placeholder {
    color: gray;
  }
`;

const ReceiveEmailButton = styled.div`
  width: 100px;
  height: 48px;
  cursor: pointer;
  background-color: #0e72ed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 6px;
`;

export default EmailAuthInput;
