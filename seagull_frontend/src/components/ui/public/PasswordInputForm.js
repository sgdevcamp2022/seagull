import React from 'react';
import styled from 'styled-components';

const PasswordInputForm = ({ inputRef, text }) => {
  return (
    <InputForm ref={inputRef} type="password" placeholder={text}></InputForm>
  );
};

const InputForm = styled.input`
  width: 420px;
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

export default PasswordInputForm;
